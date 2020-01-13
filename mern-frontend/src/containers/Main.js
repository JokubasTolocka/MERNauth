import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import App from '../App';
import Activate from './Activate';
import Private from './Private';
import PrivateRoute from './PrivateMain';
import Forgot from './Forgot';
import Reset from './Reset';
import Landing from './Landing';


const Routes = (props) => {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path='/' render={props => <Landing
                {...props}/>}/>
                <Route exact path='/auth/password/forgot' component={Forgot}/>
                <Route exact path='/auth/password/reset/:token' component={Reset}/>
                <Route exact path='/auth/activate/:token' component={Activate}/>
                <PrivateRoute exact path='/profile' component={Private}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;