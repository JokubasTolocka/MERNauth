import React, {useState} from 'react'
import {Link, Redirect} from 'react-router-dom';
import Layout from './Layout';
import axios from 'axios';
import {authenticate, isAuth} from '../helpers/helpers';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css';
import Google from './Google';
import Facebook from './Facebook';

const Signin = ({history}) => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        buttonText: 'Submit'
    });
    const { email, password, buttonText} = values;

    const handleChange = (name) => (event) => {
        setValues({...values, [name]: event.target.value})
    }

    const informParent = res => {
        authenticate(res, () => {
            // toast.success(`Hey ${res.data.user.name}, Welcome back!`);
            isAuth() && isAuth().role === 'admin' ? history.push('/admin') : history.push('/private')
        });
    }

    const handleSubmit = e => {
        e.preventDefault();
        setValues({...values, buttonText: 'Submitting...'});
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/signin`,
            data: { email, password}
        })
        .then(res => {
            console.log('signin success');
            authenticate(res, () => {
                //save the response (user, token) localStorage/cookie
                setValues({...values, email: '', password:'', buttonText: 'Submitted'});
                // toast.success(`Hey ${res.data.user.name}, Welcome back!`);
                isAuth() && isAuth().role === 'admin' ? history.push('/admin') : history.push('/private')
            })
        })
        .catch(err => {
            console.log('SIGNIN ERROR', err.response.data);
            setValues({...values, buttonText: 'Submit'});
            toast.error(err.response.data.error);
        })
    }

    const signinForm = () => (
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
        <Google informParent={informParent}/>
        <Facebook informParent={informParent}/>
        <h1>Signin</h1>
        {isAuth() ? <Redirect to='/'/> : null}
        {signinForm()}
        <Link to='/auth/password/forgot'>Forgot password</Link>
    </Layout>
    )
}

export default Signin;