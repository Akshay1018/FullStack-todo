import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import AlertContext from '../context/alert/AlertContext.js';
import AuthContext from '../context/auth/AuthContext.js';
import Loading from './Loading.js';

import Alert from './Alert.js';
function Login(props) {
    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;
    const { login, loading, error, isAuthenticated, clearErrors, user } = authContext
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    });
    useEffect(() => {
        if (user && isAuthenticated) {
            props.history.push('/todos')
        }
        if (error) {
            error.forEach(err => {
                setAlert(err.msg, '#840a0a');
            });
            clearErrors();
        }
    }, [error, isAuthenticated, setAlert, clearErrors,user,props.history])
    const onchange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }
    const onsubmit = (e) => {
        e.preventDefault();
        login(userData);
    }
    return (
        <div className="outerLogin">
          
            <div className="login">
            <h1><span className="headingTodo" >ToDo</span>App</h1>
                <h2>Login</h2>
                {loading && <Loading />}
                <Alert alert={alert} />
                <form onSubmit={onsubmit}>
                    <input type="text"
                        name='email'
                        placeholder="UserName"
                        onChange={onchange}
                        value={userData.email}
                    // onChange={(event) => setEmail(event.target.value)}
                    />
                    <input type="password"
                        name='password'
                        placeholder="Enter Password"
                        onChange={onchange}
                        value={userData.password}
                    // onChange={(event) => setPassword(event.target.value)}
                    />
                    <button className="loginButton">Login</button>
                </form>
                <div className="registerHere">
                    <p>Haven't Registered Yet?<Link to='/register'> Click here</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Login
