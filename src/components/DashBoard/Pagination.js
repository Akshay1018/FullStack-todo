import React, { useContext } from 'react';
import ToDoContext from '../../context/todo/TodoContext';
function Pagination() {
    const todoContext = useContext(ToDoContext);
    const { paginate, pages, currentPage } = todoContext;
  
    return (
        <nav>
            <div className='pagination' >
                {[...Array(pages)].map((_, index) => (
                    <div key={index} >
                        <button onClick={() => paginate(index + 1)} className={`${currentPage === index + 1 ? 'active' : ''}`}  >
                            {index + 1}
                        </button>
                    </div>
                ))}
            </div>
        </nav>

    )
}

export default Pagination
