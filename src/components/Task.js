import React, { Component, Fragment } from 'react';
import EditTask from './EditTask.js';
import TaskItem from './TaskItem';


class Task extends Component {
  constructor() {
    super();

    this.state = {
      editing: false,
      editingInputValue: '',
      isMovePopUpShown: false,
    };
  }
  
  // fires each time a user inputs a value into the input field when editing a task
  editHandleChange = (event) => {
    this.setState({
      editingInputValue: event.target.value,
    })
  }

  removeTask = (referenceToDb, task) => {
    referenceToDb.ref().child(task).remove();
  }

  // function to edit task item - fires when edit button is clicked
  editTask = (taskValue) => {
    this.setState({
      editing: !this.state.editing,
      editingInputValue: taskValue,
    })
  }

  // save task function - fires when save button is clicked in "editing" mode
  saveTask = (referenceToDb, taskObject) => {
    const { key, status } = taskObject;
    // reference to our database but reference to the specific task item we want to update the value of
    const taskItemInDb = referenceToDb.ref(key);

    // updating the task value in our database to the value that's in our editingInput state
    taskItemInDb.set({
      taskItemDescription: this.state.editingInputValue,
      taskStatus: status,
    });

    this.setState({
      editing: !this.state.editing,
      editingInputValue: '',
    })
  } 

    // function to move task to chosen status column
    moveTask = (event, referenceToDb, taskObject) => {
      const buttonClicked = event.target;
      const { key, value } = taskObject;
      const taskItemInDb = referenceToDb.ref(key);
  
      taskItemInDb.set({
        taskItemDescription: value,
        taskStatus: buttonClicked.innerHTML,
      });
    }
  
    // show move pop-up function - fires when option in move button is clicked to show options for 
    // moving a card
    showMovePopUp = () => {
      this.setState({
        isMovePopUpShown: !this.state.isMovePopUpShown,
      })
    }

  
  render() {
    const { 
      taskObject,
      dbRefInfo, 
      toggleAddingClass, 
      addingTaskState, 
      inputVal, 
      userInputState, 
      handleClick,
      headerName, 
      listHeaderTitles,
    } = this.props;

    return (
      <Fragment>
        { addingTaskState ? 
          <EditTask 
            addingTaskState={addingTaskState} 
            toggleAddingClass={toggleAddingClass} 
            userInputState={userInputState}
            inputVal={inputVal}
            saveButton={handleClick}
          /> 
          :
          this.state.editing ? 
          <EditTask 
            editInputValue={this.state.editingInputValue}
            editHandleChange={this.editHandleChange}
            saveTask={ () => {this.saveTask(dbRefInfo, taskObject)} }
            showMovePopUp={this.showMovePopUp}
            moveTask={ (event) => {this.moveTask(event, dbRefInfo, taskObject)} }
            isMovePopUpShown={this.state.isMovePopUpShown}
            headerName={headerName}
            listHeaderTitles={listHeaderTitles}
          /> :
          <TaskItem
            taskValue={taskObject.value}
            editTask={ () => {this.editTask(taskObject.value)} }
            removeTask={ () => {this.removeTask(dbRefInfo, taskObject.key)} }
          /> 
        }
      </Fragment>
    )
  }
}

export default Task;