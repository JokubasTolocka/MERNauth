import React from 'react'
import GoogleLogin from 'react-google-login';
import axios from 'axios';

const Google = () => {
    const responseGoogle = (res) => {
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/google-login`,
            data: {idToken: responseGoogle.tokenId}
        })
        .then(res => {

        })
        .catch(err => {
            
        })
    }
    
    return(
        <div>
            <GoogleLogin 
                clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
                render={renderProps => (
                    <button onClick={renderProps.click}
                            disabled={renderProps.disabled}
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
