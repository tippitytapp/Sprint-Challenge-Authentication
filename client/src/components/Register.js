import React, {useState} from 'react';
import axios from 'axios';
import {useHistory} from "react-router-dom";

function Register(){
    const [user, setUser] = useState({})
    const {push} = useHistory()

    const submitRegister = e => {
        e.preventDefault();
        axios
            .post('http://localhost:5378/api/auth/register', user)
            .then(res => {
                console.log(res)
                push('/login')

            })
    }

    const inputChange = e => {
        setUser({
            ...user, [e.target.name]: e.target.value
        }) 
    }
    return(
        <div className="login-form">

            <h2>Register</h2>
            <form onSubmit={submitRegister}>
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
                <button>Register</button>
            </form>
        </div>
    )
}

export default Register;