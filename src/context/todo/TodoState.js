import React, { useEffect, useReducer } from 'react'
import axios from 'axios';

import ToDoContext from '../todo/TodoContext'
import ToDoReducer from '../todo/TodoReducer';
import { SET_TASKLIST, SET_EDIT_TASK, SET_LOADING, ERROR_ALERTS, CLEAR_ERRORS, SET_CURR_PAGE, PAGINATE, PAGE_RANGE } from '../types.js';

function ToDoState(props) {
    const initialState = {
        dummyarr: [],
        taskList: [],
        alert: null,
        editTask: "",
        loading: false,
        error: null,

        pageTodo: [],
        currentPage: 1,
        pages: 0

    }
    const [state, dispatch] = useReducer(ToDoReducer, initialState);
    const postsPerPage = 5;

  
    useEffect(() => {
        const calculatePages = (arr, perpage) => {
            let total = state.currentPage;

            let page = Math.ceil(arr.length / perpage);

            dispatch({
                type: PAGINATE,
                payload: page
            });
            if (total > page && page > 0) {
                dispatch({
                    type: SET_CURR_PAGE,
                    payload: page
                })
            }

        }
        calculatePages(state.taskList, postsPerPage);
    }, [state.taskList, state.currentPage])

    useEffect(() => {
        let pageRange = state.taskList.slice((state.currentPage - 1) * postsPerPage, state.currentPage * postsPerPage);
        dispatch({
            type: PAGE_RANGE,
            payload: pageRange
        })
    }, [state.taskList, state.currentPage])


    const setLoading = () => {
        dispatch({
            type: SET_LOADING
        })
    }


    const setTaskList = async () => {
        try {
            setLoading()
            const res = await axios.get('https://thshackathon.herokuapp.com/api/user/todo/get');
            dispatch({
                type: SET_TASKLIST,
                payload: res.data
            })
        } catch (err) {
            return handleAlert(err.response.data);
        }
    }


    const paginate = (pageNumber) => {
        dispatch({
            type: SET_CURR_PAGE,
            payload: pageNumber
        })
    }

    const clearErrors = () => {
        dispatch({
            type: CLEAR_ERRORS
        })
    }
    const setEditTask = (value) => {
        dispatch({
            type: SET_EDIT_TASK,
            payload: value
        })
    }

    const addTask = async (title) => {
        try {
            setLoading()
            await axios.post('https://thshackathon.herokuapp.com/api/user/todo/add', { title });
            setTaskList()
        } catch (err) {
            return handleAlert(err.response.data);
        }
    }
    const saveTask = async (id, title) => {

        try {
            setLoading()
            await axios.put(`https://thshackathon.herokuapp.com/api/user/todo/update/${id}`, { title });
            setTaskList()
        } catch (err) {
            return handleAlert(err.response.data);
        }
    }

    const deleteTask = async (id) => {
        try {
            setLoading()
            await axios.delete(`https://thshackathon.herokuapp.com/api/user/todo/delete/${id}`);
            setTaskList()
        } catch (err) {
            return handleAlert(err.response.data);
        }
    }

    const handleAlert = (err) => {
        dispatch({
            type: ERROR_ALERTS,
            payload: err
        })
    }

    return (
        <ToDoContext.Provider
            value={{

                taskList: state.taskList,
                alert: state.alert,
                editTask: state.editTask,
                loading: state.loading,
                error: state.error,

                currentPage: state.currentPage,
                pageTodo: state.pageTodo,
                pages: state.pages,
                paginate,

                setTaskList,
                clearErrors,
                deleteTask,
                saveTask,
                handleAlert,
                addTask,
                setEditTask,
                setLoading
            }}>
            {props.children}
        </ToDoContext.Provider>
    )
}
export default ToDoState;