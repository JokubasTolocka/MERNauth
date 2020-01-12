import React from 'react'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import axios from 'axios';

const Facebook = ({informParent = f => f}) => {
    const responseFacebook = (res) => {
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/facebook-login`,
            data: {userID: res.userID, accessToken: res.accessToken}
        })
        .then(res => {
            informParent(res);
        })
        .catch(err => {
        })
    }
    
    return(
        <div>
            <FacebookLogin
                appId={`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
                autoLoad={false}
                callback={responseFacebook} 
                render={renderProps => (
                    <button onClick={renderProps.onClick}
                    >Facebook Login</button>
                )}
                />
        </div>
    )
}

export default Facebook;
