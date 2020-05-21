import React, { Component, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';


class EditTask extends Component {
  constructor() {
    super()

    // create reference to input element
    this.inputElementReference = React.createRef();
  }


  // bring input element into focus when component mounts
  componentDidMount() {
    this.inputElementReference.current.focus();
  }


  render() {
    const {
      editInputValue, 
      editHandleChange, 
      saveTask, 
      inputVal, 
      userInputState, 
      saveButton, 
      addingTaskState, 
      toggleAddingClass, 
      moveTask,
      isMovePopUpShown,
      showMovePopUp,
      headerName,
      listHeaderTitles
    } = this.props;


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
                ref={this.inputElementReference}
              >
              </input>
            </Fragment> :
            <input 
              defaultValue={editInputValue}
              onChange={editHandleChange}
              ref={this.inputElementReference}
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
            <Fragment>
              <button className="saveButton editModeButton" type="submit" onClick={saveTask}>Save</button>
              <button className="moveButton editModeButton" type="button" onClick={showMovePopUp}>Move</button>
              { isMovePopUpShown && 
                <div className="popUpContainer">
                  <p>Update Status:</p>
                  <div className="moveButtonOptionsContainer">
                    { listHeaderTitles.filter((title) => title !== headerName)
                      .map((title, index) => {
                        return (
                        <button key={index} type="button" onClick={ (event) => moveTask(event) }>{title}</button>
                        )
                      })
                    }
                  </div>
                </div>
              }
            </Fragment>
          }
        </form>
      </Fragment>
    )
  }
}

export default EditTask;