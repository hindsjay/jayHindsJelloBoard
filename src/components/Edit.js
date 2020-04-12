import React, { Fragment } from 'react';


// stateless component
// props destructured
function Edit({ editInputValue, editHandleChange, saveTask }) {
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

export default Edit;