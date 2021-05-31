import React from 'react'
import AddTasks from './DashBoard/AddTask.js';
import Tasks from './DashBoard/Tasks';
import Pagination from './DashBoard/Pagination.js'
function UserDashboard() {
    const onclick = () => {
        if (localStorage.token) {
            localStorage.removeItem('token');
            window.location.href = '/';
        }
    }
    
    return (
        <div>
            <header>
                <div className="logodiv">
                    <h1><span className="headingTodo">ToDo</span>App</h1>
                </div>
                <div className="rightdiv">
                   
                    <button className='logOutButton' onClick={onclick}>Log_out</button>
                </div>
            </header>
            <AddTasks />
           
            <Tasks />
            <Pagination/>

        </div>
    )
}

export default UserDashboard
