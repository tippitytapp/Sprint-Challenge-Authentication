import React, {useState, useEffect} from 'react';
import axios from 'axios';

function Register(){
    const [user, setUser] = useState({})

    const submitLogin = e => {
        e.preventDefault();
        axios
            .post('http://localhost:5378/api/auth/register', user)
            .then(res => {
                console.log(res)
            })
    }

    const inputChange = e => {
        setUser({
            ...user, [e.target.name]: e.target.value
        }) 
    }
    return(
        <div className="login-form">
            <form onSubmit={submitLogin}>
                <label htmlFor="username">Username:</label> <br />
                <input 
                    type="text" 
                    id="username" 
                    name="username" 
                    placeholder="username"
                    value={user.username}
                    onChange={inputChange} 
                    /> <br />
                <label htmlFor="password">Password:</label> <br />
                <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    placeholder="password" 
                    value = {user.password}
                    onChange={inputChange} 
                    /> <br />
                <button>Login</button>
            </form>
        </div>
    )
}

export default Register;