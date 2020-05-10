import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';


// props destructured
function EditTask({ editInputValue, editHandleChange, saveTask, inputVal, userInputState, saveButton, addingTaskState, toggleAddingClass }) {
  return (
    <Fragment>
      <form className="taskForm">
        { addingTaskState ?
          <Fragment>
            <label htmlFor="taskInput" className="srOnly"></label>
            <input 
              type="text" 
              id="taskInput" 
              className="taskInput"
              onChange={ (event) => {inputVal(event)} }
              value={userInputState}
            >
            </input>
          </Fragment> :
          <input 
            defaultValue={editInputValue}
            onChange={editHandleChange}
          >
          </input>
        }

        { addingTaskState ? 
          <div className="addTaskButtonContainer">
            <button className="saveButton editModeButton" type="submit" onClick={saveButton}>Save</button>
            <button onClick={toggleAddingClass} className="closeButton">
              <FontAwesomeIcon icon={faWindowClose} className="closeIcon" /> 
            </button>
          </div>
          :
          <button className="saveButton editModeButton" type="submit" onClick={saveTask}>Save</button>
        }
      </form>
    </Fragment>
  )
}

export default EditTask;