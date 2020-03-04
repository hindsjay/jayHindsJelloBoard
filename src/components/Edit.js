import React, { Fragment } from 'react';

const Edit = (props) => {
  return (
    <Fragment>
      <form>
        <input 
          defaultValue={props.editingInput}
          onChange={props.editHandleChange}
        >
        </input>
        <button className="saveButton editModeButton" type="submit" onClick={props.saveTask}>Save</button>
      </form>
    </Fragment>
  )
}

export default Edit;