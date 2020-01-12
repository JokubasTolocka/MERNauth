import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import App from '../App';
import Signup from './Signup';
import Signin from './Signin';
import Activate from './Activate';
import Private from './Private';
import PrivateRoute from './PrivateMain';
import AdminRoute from './AdminRoute';
import Admin from './Admin';
import Forgot from './Forgot';


const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={App}/>
                <Route exact path='/signup' component={Signup}/>
                <Route exact path='/auth/password/forgot' component={Forgot}/>
                <Route exact path='/signin' component={Signin}/>
                <Route exact path='/auth/activate/:token' component={Activate}/>
                <PrivateRoute exact path='/private' component={Private}/>
                <AdminRoute exact path='/admin' component={Admin}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;