import { SET_ALERT, SET_EDIT_TASK, SET_LOADING, SET_TASKLIST, ERROR_ALERTS, CLEAR_ERRORS, SET_CURR_PAGE, PAGINATE, PAGE_RANGE } from "../types";
// eslint-disable-next-line
export default (state, action) => {
    switch (action.type) {

        case PAGE_RANGE:
            return {
                ...state,
                pageTodo: action.payload
            }
        case PAGINATE:
            return {
                ...state,
                pages: action.payload
            }
        case SET_CURR_PAGE:
            return {
                ...state,
                currentPage: action.payload
            }
        case SET_TASKLIST:
            return {
                ...state,
                taskList: action.payload,
                loading: false
            }

        case SET_ALERT:
            return {
                ...state,
                alert: action.payload
            }
        case SET_EDIT_TASK:
            return {
                ...state,
                editTask: action.payload
            }
        case SET_LOADING:
            return {
                ...state,
                loading: true
            }
        case ERROR_ALERTS:
            return {
                ...state,
                error: action.payload.errors,
                loading: false
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return {
                state
            }
    }
}