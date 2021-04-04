import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {authService} from '../service/authService'

const redirect = (toReturn) => {
    authService.logout();
    return toReturn;
}

const PrivateRoute = ({ component: Component, role, ...rest }) => (
    <Route {...rest} render={props => (
    
        authService.isLoggedIn() && (role === authService.getRole())
            ? <Component {...props} />
            : redirect(<Redirect to={{ pathname: '/login', state: { from: props.location } }} />)
    )} />
)

export default PrivateRoute;