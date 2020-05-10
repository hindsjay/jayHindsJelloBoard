import React, { Component, Fragment } from 'react';
import EditTask from './EditTask.js';
import TaskItem from './TaskItem';


class Task extends Component {
  constructor() {
    super();

    this.state = {
      editing: false,
      editingInputValue: '',
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
  saveTask = (referenceToDb, task) => {
    // reference to our database but reference to the specific task item we want to update the value of
    const taskItemInDb = referenceToDb.ref(task);
    // updating the task value in our database to the value that's in our editingInput state
    taskItemInDb.set(this.state.editingInputValue);

    this.setState({
      editing: !this.state.editing,
      editingInputValue: '',
    })
  } 

  
  render() {
    const { 
      taskValue, 
      taskKey, 
      dbRefInfo, 
      toggleAddingClass, 
      addingTaskState, 
      inputVal, 
      userInputState, 
      handleClick 
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
            saveTask={ () => {this.saveTask(dbRefInfo, taskKey)} }
          /> :
          <TaskItem
            taskValue={taskValue}
            editTask={ () => {this.editTask(taskValue)} }
            removeTask={ () => {this.removeTask(dbRefInfo, taskKey)} }
          /> 
        }
      </Fragment>
    )
  }
}

export default Task;