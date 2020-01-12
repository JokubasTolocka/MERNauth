import React, {useState} from 'react'
import Layout from './Layout';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css';

const Forgot = ({history}) => {
    const [values, setValues] = useState({
        email: '',
        buttonText: 'Request'
    });
    const { email, buttonText} = values;

    const handleChange = (name) => (event) => {
        setValues({...values, [name]: event.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault();
        setValues({...values, buttonText: 'Submitting...'});
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/forgot-password`,
            data: { email}
        })
        .then(res => {
            toast.success(res.data.message)
            setValues({...values, buttonText: 'Requested'})
        })
        .catch(err => {
            setValues({...values, buttonText: 'Request'});
            toast.error(err.response.data.error);
        })
    }

    const passwordForgotForm = () => (
        <form>
            <div>
                <label htmlFor='email'>Email</label>
                <input
                type='email'
                onChange={handleChange('email')}
                value={email}
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
        <h1>Forgot Password</h1>
        {passwordForgotForm()}
    </Layout>
    )
}

export default Forgot;