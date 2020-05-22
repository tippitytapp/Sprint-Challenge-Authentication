import React from 'react';
import {Route, Link, useHistory} from "react-router-dom";
import './App.css';
import Login from "./components/Login";
import Register from "./components/Register";
import Jokes from "./components/jokes";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const {push} = useHistory()
  const LogOut = e => {
    e.preventDefault();
    localStorage.removeItem('token')
    push('/')
  }

  return (
    <div className="App">
      <h1> Dad Jokes</h1>
      <Link to="/register"><button>Register</button></Link>
      <Link to="/login"><button>Login</button></Link>
      <button onClick={LogOut}>Logout</button>
      <Route exact path="/register"><Register /></Route>
      <Route exact path="/login"><Login /></Route>
      <PrivateRoute path='/jokes' component={Jokes} />
    </div>
  );
}

export default App;
