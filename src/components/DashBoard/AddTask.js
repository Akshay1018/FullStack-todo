import React, { useContext, useEffect, useState } from 'react';
import Alert from '../Alert.js';
import ToDoContext from '../../context/todo/TodoContext';
import AlertContext from '../../context/alert/AlertContext';


function AddTask() {
    const toDoContext = useContext(ToDoContext);
    const alertContext = useContext(AlertContext);
    const {setAlert} = alertContext;
    const [task, setTask] = useState("");
    const { addTask ,setTaskList,error,clearErrors} = toDoContext;

    useEffect(()=>{
        if(error){
            error.forEach(err=>{
                setAlert(err.msg,'#840a0a');
            });
            clearErrors()
        }
    },[setAlert,clearErrors,error])
    const onChange = (event) => {
        setTask(event.target.value);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        addTask(task);
        setTaskList()
        setTask("");
    }

    return (
        <div>
      
            <Alert alert = {alert} />
            <div className="todoInput">
                <form onSubmit={onSubmit}>
                    <input type="text"
                        name="task"
                        value={task}
                        placeholder="To do Item..."
                        required className="input"
                        onChange={onChange}
                    /><button className="addButton"><b>+</b></button>
                </form>
            </div>
        </div>
    )
}

export default AddTask;