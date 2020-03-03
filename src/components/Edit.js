import React, { Fragment } from 'react';
// import MovePopup from './MovePopup.js';

const Task = (props) => {
  return (
    <Fragment>
      <form>
        <input 
          defaultValue={props.editingInput}
          onChange={props.editHandleChange}
          required
        >
        </input>
        <button className="saveButton editModeButton" type="submit" onClick={props.saveTask}>Save</button>
        <button className="moveButton editModeButton" type="button" onClick={props.showPopup}>Move</button>
      </form>
      {
        props.popupVisible ? 
          <MovePopup 
            moveToInProgress={props.moveToInProgress}
            moveToDone={props.moveToDone}
          /> : null
      }
    </Fragment>
  )
}

export default Task;