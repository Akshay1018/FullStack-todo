import React, { useState, useContext, useEffect } from 'react'
import Alert from './Alert.js'
import { Link } from 'react-router-dom';
import AuthContext from '../context/auth/AuthContext';
import AlertContext from '../context/alert/AlertContext';
import Loading from './Loading';

function Register(props) {
    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);
    const { userRegister, loading, isAuthenticated, error, clearErrors } = authContext;
    const { setAlert } = alertContext;
    useEffect(() => {
        if (isAuthenticated) {
            return props.history.push('/');
        }
        if (error) {
            error.forEach(err => {
                setAlert(err.msg, '#840a0a');
            })
            clearErrors()
        }
    }, [error, isAuthenticated, setAlert]);
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmpassword: ''
    });
    const onchange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }
    const onsubmit = (e) => {
        e.preventDefault();
        if (checkPassword()) {
            return userRegister(user);
        }
        return setAlert("Password mismatch!Enter correct password","#840a0a");
        

    }
    const checkPassword = () => {
        if (user.password === user.confirmpassword) {
            return true;
        }
    }
    return (
        <div className="outerLogin">
            <div className='register'>
                <h1><span className="headingTodo">ToDo</span>App</h1>
                <h2>Register</h2>
                {loading && <Loading />}
                <Alert alert={alert} />
                <form onSubmit={onsubmit}>
                    <input type='text' name='name'
                        placeholder='First name'
                        onChange={onchange}

                        value={user.name}
                    />
                    <input type='email' name='email'
                        placeholder='Enter your email'
                        onChange={onchange}

                        value={user.email}
                    />
                    <input type='password' name='password'
                        placeholder='Password'
                        onChange={onchange}

                        value={user.password}
                    />
                    <input type='password' name='confirmpassword'
                        placeholder='Confirm Password'
                        onChange={onchange}

                        value={user.confirmpassword}
                    />
                    <button className='loginButton'>Register</button>
                </form>
                <br /> <br /> <Link to='/'>Click here to Login </Link> <br />

            </div>
        </div>
    )
}

export default Register
