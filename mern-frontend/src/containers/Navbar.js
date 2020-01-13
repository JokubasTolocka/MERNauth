import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {isAuth, signout} from '../helpers/helpers';

class Navbar extends Component{
    render(){
    return(
        <div>
            <Link to='/'>Home</Link>
            {!isAuth() && (
                <div>
                    <Link to='/signup'>Signup</Link>
                    <Link to='/signin'>Signin</Link>
                </div>
            )}
            {isAuth() && (
                <Link to='/profile'>{isAuth().name}</Link>
            )}
            {isAuth() && (
                <button onClick={() => {
                    signout(() => {
                        this.props.history.push('/')
                    })}}>Logout</button>
            )}
        </div>
    )
    }
}

export default Navbar;