import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';
import authReducer from './AuthReducer';
import AuthToken from '../authToken'
import { REGISTER_FAIL, REGISTER_SUCCESS, SET_LOADING, CLEAR_ERRORS, LOGIN_FAIL, LOGIN_SUCCESS ,USER_LOADED,AUTH_ERR} from '../types.js';

function AuthState(props) {
    const initialState = {
        token: localStorage.getItem('token'),
        error: null,
        loading: false,
        isAuthenticated: false,
        user: null
    };
    const [state, dispatch] = useReducer(authReducer, initialState);

    const loadUser = async ()=>{
        if(localStorage.token){
            AuthToken(localStorage.token);
        }
        try {
            const res = await axios.get(`https://thshackathon.herokuapp.com/api/user/auth`);
            dispatch({
                type:USER_LOADED,
                payload:res.data
            })
        } catch (err) {
            dispatch({
                type:AUTH_ERR,
                payload:err.response.data
            })
        }
    }
    
    const userRegister = async (data) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        try {
            setLoading();
            const res = await axios.post("https://thshackathon.herokuapp.com/api/user/register",
                data,
                config)
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
            loadUser()
        } catch (err) {

            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data
            });

        }
    }
    const login = async (data) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            setLoading()
            const res = await axios.post(`https://thshackathon.herokuapp.com/api/user/login`,
                data,
                config);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
            loadUser()
        } catch (err) {
            dispatch({
                type: LOGIN_FAIL,
                payload: err.response.data
            })
        }
    }
    const setLoading = () => {
        dispatch({
            type: SET_LOADING
        })
    }
    const clearErrors = () => {
        dispatch({
            type: CLEAR_ERRORS
        })
    }
    useEffect(()=>{
        if(localStorage.token){
            loadUser();
        }
    },[loadUser])
    return (
        <AuthContext.Provider
            value={{
                error: state.error,
                loading: state.loading,
                isAuthenticated: state.isAuthenticated,
                token: state.token,
                user: state.user,
                userRegister,
                setLoading,
                clearErrors,
                loadUser,
                login
            }}
        >
            {props.children}

        </AuthContext.Provider>
    )
}

export default AuthState
