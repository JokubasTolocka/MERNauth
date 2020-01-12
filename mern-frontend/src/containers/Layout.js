import React, {Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {isAuth, signout} from '../helpers/helpers';

const Layout = ({children, history}) => {
    const nav = () => (
        <div>
            <Link to='/'>Home</Link>
            {!isAuth() && (
                <Fragment>
                    <Link to='/signup'>Signup</Link>
                    <Link to='/signin'>Signin</Link>
                </Fragment>
            )}
            {isAuth() && isAuth().role === 'admin' && (
                <Link to='/admin'>{isAuth().name}</Link>
            )}
            {isAuth() && isAuth().role === 'subscriber' && (
                <Link to='/private'>{isAuth().name}</Link>
            )}
            {isAuth() && (
                <button onClick={() => {
                    signout(() => {
                        history.push('/')
                    })}}>Logout</button>
            )}
        </div>
    )
    return (
        <Fragment>
            {nav()}
            <div className='container'>
                {children}
            </div>
        </Fragment>
    )
}

export default withRouter(Layout);