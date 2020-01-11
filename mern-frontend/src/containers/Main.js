import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import App from '../App';
import Signup from './Signup';
import Signin from './Signin';
import Activate from './Activate';


const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={App}/>
                <Route exact path='/signup' component={Signup}/>
                <Route exact path='/signin' component={Signin}/>
                <Route exact path='/auth/activate/:token' component={Activate}/>

            </Switch>
        </BrowserRouter>
    )
}

export default Routes;