import React from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import './styles.css';
import Login from './components/Login.js';
import Register from './components/Register.js';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import ToDoState from './context/todo/TodoState'
import PrivateRoute from './components/PrivateRoute';
import UserDashboard from './components/UserDashboard'
function App() {
    return (
        <AuthState>
            <AlertState>
                <Router>
                    <>
                        <Switch>
                            <Route exact path='/' component={Login} />
                            <Route exact path='/register' component={Register} />
                            <ToDoState>
                                <PrivateRoute exact path='/todos' component={UserDashboard} />
                            </ToDoState>

                            <Route component={
                                () => (
                                    <h1>Not Found.
                                Go Back <Link to='/'>Home Page</Link>
                                    </h1>
                                )
                            } />


                        </Switch>
                    </>
                </Router>
            </AlertState>
        </AuthState>
    )
}

export default App
