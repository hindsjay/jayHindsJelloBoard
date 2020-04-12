import React, { Component, Fragment } from 'react';
import Edit from './Edit.js';


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


  // function to remove item
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

    // update state and initiate re-render
    this.setState({
      editing: !this.state.editing,
      editingInputValue: '',
    })
  } 


  render() {
    return (
      <Fragment>
        { this.state.editing ? 
          <Edit 
            editInputValue={this.state.editingInputValue}
            editHandleChange={this.editHandleChange}
            saveTask={ () => {this.saveTask(this.props.dbRefInfo, this.props.taskKey)} }
          /> :
          <Fragment>
            <p>{this.props.taskValue}</p> 
            <div className="editDeleteContainer">
              <button 
                type="button" 
                onClick={ () => {this.editTask(this.props.taskValue)} }>edit</button>
              
              <button 
                type="button" 
                onClick={ () => {this.removeTask(this.props.dbRefInfo, this.props.taskKey)} }
              >
                delete
              </button>
            </div>
          </Fragment> }
      </Fragment>
    )
  }
}

export default Task;