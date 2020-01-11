import React, {useState, useEffect} from 'react'
import {Link, Redirect} from 'react-router-dom';
import Layout from './Layout';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css';

const Activate = ({match}) => {
    const [values, setValues] = useState({
        name: '',
        token: '',
        show: true
    });

    useEffect(() => {
        let token = match.params.token
        let {name} = jwt.decode(token);
        if(token) {
            setValues({...values, name, token});
        }
    }, [])

    const {name, token, show} = values;

    const handleSubmit = e => {
        e.preventDefault();
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/account-activation`,
            data: {token}
        })
        .then(res => {
            console.log('activation success');
            setValues({...values, show: false});
            toast.success(res.data.message);
        })
        .catch(err => {
            console.log('activation error', err.response.data.error);
            toast.error(err.response.data.error);
        })
    }
    const activationLink = () => (
        <div>
            <h1>Hey {name}, Ready to activate your account?</h1>
            <button onClick={handleSubmit}>Activate account</button>
        </div>
    )

    return(
    <Layout>
        <ToastContainer/>
        {activationLink()}
    </Layout>
    )
}

export default Activate;