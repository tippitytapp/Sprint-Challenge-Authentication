
import React from 'react';
import Jokes from './jokes'
import {Route, Redirect} from 'react-router-dom'

const PrivateRoute = ({component: Component, ...rest}) => {

    if(localStorage.getItem('token')){
        return <Route component={Jokes} />
    } else {
        return <Redirect to="/login" />
    }
}

export default PrivateRoute;