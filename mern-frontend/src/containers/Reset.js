import React, {useState, useEffect} from 'react'
import jwt from 'jsonwebtoken';
import Layout from './Layout';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css';

const Reset = ({match}) => {
    const [values, setValues] = useState({
        name: '',
        token: '',
        newPassword: '',
        buttonText: 'Reset password'
    });

    useEffect(() => {
        let token = match.params.token;
        let {name} = jwt.decode(token);
        if(token) {
            setValues({...values, name, token});
        }
    }, [])

    const { name, newPassword, token, buttonText} = values;

    const handleChange = (event) => {
        setValues({...values, newPassword: event.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault();
        setValues({...values, buttonText: 'Reseting...'});
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/reset-password`,
            data: { newPassword, resetPasswordLink: token}
        })
        .then(res => {
            toast.success(res.data.message)
            setValues({...values, buttonText: 'Done'})
        })
        .catch(err => {
            setValues({...values, buttonText: 'Request'});
            toast.error(err.response.data.error);
        })
    }

    const resetPasswordForm = () => (
        <form>
            <div>
                <label htmlFor='password'>New Password</label>
                <input
                placeholder='Type new password'
                type='password'
                onChange={handleChange}
                value={newPassword}
                required
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
        <h1>Hey {name}, Type your new password.</h1>
        {resetPasswordForm()}
    </Layout>
    )
}

export default Reset;