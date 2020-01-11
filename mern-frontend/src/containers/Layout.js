import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';

const Layout = ({children}) => {
    const nav = () => (
        <div>
            <Link to='/'>Home</Link>
            <Link to='/signup'>Signup</Link>
            <Link to='/signin'>Signin</Link>
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

export default Layout;