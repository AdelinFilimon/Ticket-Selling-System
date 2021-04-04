import React from 'react';
import {Redirect} from 'react-router-dom'
import {authService} from '../../service/authService'

const Homepage = () => {

    if (!authService.isLoggedIn())
        return (
            <div className = 'home'>            
            </div>
        )
    if (authService.getRole() === 'administrator') {
        console.log(window.location.href);
        return <Redirect to="/administrator"/>
    }
    else if (authService.getRole() === 'cashier') 
        return <Redirect to="/cashier"/>
}

export default Homepage;