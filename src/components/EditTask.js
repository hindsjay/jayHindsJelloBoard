import React, { Fragment } from 'react';


// stateless component when task item is in editing mode
// props destructured
function EditTask({ editInputValue, editHandleChange, saveTask }) {
  return (
    <Fragment>
      <form>
        <input 
          defaultValue={editInputValue}
          onChange={editHandleChange}
        >
        </input>
        <button className="saveButton editModeButton" type="submit" onClick={saveTask}>Save</button>
      </form>
    </Fragment>
  )
}

export default EditTask;