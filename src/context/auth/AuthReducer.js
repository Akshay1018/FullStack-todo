import { CLEAR_ERRORS, REGISTER_FAIL, REGISTER_SUCCESS, SET_LOADING, LOGIN_FAIL, LOGIN_SUCCESS, AUTH_ERR, USER_LOADED } from '../types.js'
const reducer = (state, action) => {
    switch (action.type) {
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                isAuthenticated: true,
                loading: false

            }
        case REGISTER_FAIL:
        case LOGIN_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                error: action.payload.errors,
                loading: false
            }
        case SET_LOADING:
            return {
                ...state,
                loading: true
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload
            }
        case AUTH_ERR:
            localStorage.removeItem('token')
            return {
                ...state,
                isAuthenticated: false,
                error: action.payload.errors
            }
        default:
            return state;


    }
}
export default reducer