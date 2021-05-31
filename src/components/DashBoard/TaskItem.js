import React, { useContext, useState } from 'react';
import ToDoContext from '../../context/todo/TodoContext';

function TaskItem({task}) {
    const toDoContext = useContext(ToDoContext);
    const {deleteTask, saveTask, setEditTask,editTask} = toDoContext;
    const [isEdit, setIsEdit] = useState(false);
    
    const onDelete = () => {
        deleteTask(task._id);
       

    }

    const onEdit = () => {
        setIsEdit(true);
    }

    const onSave = () => {
        saveTask(task._id,editTask);
        setIsEdit(false);
        
    }

    const onChange = (event) =>{
        setEditTask(event.target.value);
    }
    

    if (isEdit) {
        return (
            <div id="btn-div" style={isEdit? { backgroundColor: "#102648", borderBottom: "1px #264b84 dotted" }: null}>
                <div className="doc" id={task.id}>
                    <input type="text" onChange={onChange} defaultValue={task.title} />
                    <button className="editButton" onClick={onSave}>💾</button>
                    <button className="delButton" onClick={onDelete}>🗑</button>
                </div>
            </div>
        )
    } else {
        return (
            <div id="btn-div" style={isEdit? { backgroundColor: "#102648", borderBottom: "1px #264b84 dotted" }: null}>
                <div className="doc" id={task.id}>
                    <p>{task.title}</p>
                    <button className="editButton" onClick={onEdit}>✂</button>
                    <button className="delButton" onClick={onDelete}>🗑</button>
                </div>
            </div>
        )
    }
}

export default TaskItem;
