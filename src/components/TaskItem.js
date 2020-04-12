import React, { Fragment } from 'react';


// stateless component - component to render task item not in editing mode 
// props destructured
function TaskItem({ taskValue, editTask, removeTask }) {
  return (
    <Fragment>
      <p>{taskValue}</p> 
      <div className="editDeleteContainer">
        <button 
          type="button" 
          onClick={editTask}>edit</button>
        
        <button 
          type="button" 
          onClick={removeTask}
        >
          delete
        </button>
      </div>
    </Fragment>
  )
}

export default TaskItem;