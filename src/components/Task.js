import React, { Fragment } from 'react';

// stateless component
const Task = (props) => {
  return (
    <Fragment>
      <p>{props.taskValue}</p> 
      <div className="editDeleteContainer">
        <button type="button" onClick={props.editTask}>edit</button>
        <button type="button" onClick={props.removeTask}>delete</button>
      </div>
    </Fragment>
  )
}

export default Task;