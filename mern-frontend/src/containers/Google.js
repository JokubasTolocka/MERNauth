import React from 'react'
import GoogleLogin from 'react-google-login';
import axios from 'axios';

const Google = ({informParent = f => f}) => {
    const responseGoogle = (res) => {
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/google-login`,
            data: {idToken: res.tokenId}
        })
        .then(res => {
            informParent(res);
        })
        .catch(err => {

        })
    }
    
    return(
        <div>
            <GoogleLogin 
                clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
                render={renderProps => (
                    <button onClick={renderProps.onClick}
                    >Login</button>
                )}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    )
}

export default Google;
