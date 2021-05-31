import React, { useContext, useEffect } from 'react';
import TaskItem from './TaskItem.js';
import ToDoContext from '../../context/todo/TodoContext';
import Loading from '../Loading.js';

function Tasks() {
    const toDoContext = useContext(ToDoContext);
    const { pageTodo, setTaskList, loading } = toDoContext;
    useEffect(()=>{
        setTaskList();
        
        // eslint-disable-next-line
    },[]);
    if (loading) {
        return <Loading />
    }   
    return (
        <div className="tasklist">
            {
                pageTodo.map((item) => (
                    <TaskItem key={item.id}
                        task={item} />
                ))
            }
        </div>
    )

}

export default Tasks;
