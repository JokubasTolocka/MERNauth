import React, {useState} from 'react'
import {Link, Redirect} from 'react-router-dom';
import Layout from './Layout';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css';

const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        buttonText: 'Submit'
    });
    const {name, email, password, buttonText} = values;

    const handleChange = (name) => (event) => {
        setValues({...values, [name]: event.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault();
        setValues({...values, buttonText: 'Submitting...'});
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/signup`,
            data: {name, email, password}
        })
        .then(res => {
            console.log('signup success');
            setValues({...values, name: '', email: '', password:'', buttonText: 'Submitted'});
            toast.success(res.data.message);
        })
        .catch(err => {
            console.log('SIGNUP ERROR', err.response.data);
            setValues({...values, buttonText: 'Submit'});
            toast.error(err.response.data.error);
        })
    }

    const signupForm = () => (
        <form>
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
                type='email'
                onChange={handleChange('email')}
                value={email}
                />
            </div>
            <div>
                <label htmlFor='password'>Password</label>
                <input
                type='password'
                onChange={handleChange('password')}
                value={password}
                />
            </div>
            <div>
                <button onClick={handleSubmit}>{buttonText}</button>
            </div>
        </form>
    )

    return(
    <Layout>
        <ToastContainer/>
        <h1>Signup</h1>
        {signupForm()}
    </Layout>
    )
}

export default Signup;