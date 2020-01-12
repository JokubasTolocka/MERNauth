import React, {useState, useEffect} from 'react'
import {Link, Redirect} from 'react-router-dom';
import Layout from './Layout';
import axios from 'axios';
import {authenticate, isAuth, getCookie, signout, updateUser} from '../helpers/helpers';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css';

const Admin = ({history}) => {
    const [values, setValues] = useState({
        role: '',
        name: '',
        email: '',
        password: '',
        buttonText: 'Submit'
    });

    const token = getCookie('token');

    useEffect(() => {
        loadProfile()
    }, []);

    const loadProfile = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            const {role, name, email} = res.data;
            setValues({...values, role, name, email});
        })
        .catch(err => {
            if(err.response.status === 401){
                signout(() => {
                    history.push('/');
                });
            }
        })
    }
    const {role, name, password, email, buttonText} = values;

    const handleChange = (name) => (event) => {
        setValues({...values, [name]: event.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault();
        setValues({...values, buttonText: 'Submitting...'});
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/admin/update`,
            data: { name, password},
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
                //save the response (user, token) localStorage/cookie
                updateUser(res, () => {
                    setValues({...values, buttonText: 'Submitted'});
                    toast.success(`Profile updated successfully`);
                })
        })
        .catch(err => {
            setValues({...values, buttonText: 'Submit'});
            toast.error(err.response.data.error);
        })
    }

    const updateForm = () => (
        <form>
            <div>
                <label htmlFor='role'>Role</label>
                <input
                type='text'
                defaultValue={role}
                />
            </div>
            <div>
                <label htmlFor='name'>Name</label>
                <input
                type='text'
                onChange={handleChange('name')}
                value={name}
                />
            </div>
            <div>
                <label htmlFor='email'>Email</label>
                <input 
                    defaultValue={email} 
                    type="email"
                    disabled />
            </div>
            <div>
                <label htmlFor='password'>Password</label>
                <input
                type='password'
                onChange={handleChange('password')}
                value={password}
                disabled
                />
            </div>
            <div>
                <button onClick={handleSubmit}>{buttonText}</button>
            </div>
        </form>
    )
    console.log(isAuth())
    return(
    <Layout>
        <ToastContainer/>
        <h1>Admin Update</h1>
        {updateForm()}
    </Layout>
    )
}

export default Admin;