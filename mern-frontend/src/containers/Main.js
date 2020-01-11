import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import App from '../App';
import Signup from './Signup';


const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={App}/>
                <Route exact path='/signup' component={Signup}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;