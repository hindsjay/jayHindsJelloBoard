import React, { Component } from 'react';
import Form from './Form.js';
import firebase from '../utils/firebase.js';
import Task from './Task.js';
import Edit from './Edit.js';


class Main extends Component {
  constructor() {
    super()

    this.state = {
      tasks: [],
      userInput: '',
      editingInput: '',
    }
  }


  // componentDidMount lifecycle method which executes once component mounts
  // this allows us to sync the items in our database to our app (and therefore our UI) - items in our database will show up in our UI
  componentDidMount() {
    const dbRef = firebase.database().ref();

    // event listener that fires anytime there is a change in the database
    dbRef.on('value', (response) => {
      const newState = [];
      const data = response.val();

      // for in loop to access each task item in our data object and push each task item to our new state array
      for (let key in data) {
        newState.push({key: key, value: data[key], editing: false});
      }

      // execute setState to initiate re-render which will update our page with task items in database (current and new ones (if there are any new ones) )
      this.setState({
        tasks: newState,
      })
    });
  }


  // fires each time a user inputs a value into main input when adding a task
  // used to keep track of the values entered
  handleChange = (event) => {
    this.setState({
      userInput: event.target.value,
    })
  }

  // fires each time a user inputs a value into the input field when editing a task
  // like above used to keep track of values entered
  editHandleChange = (event) => {
    this.setState({
      editingInput: event.target.value,
    })
  }


  // when the add task button is clicked this will add item to the database and also update the screen due to the .on method we have that fires each time the database is changed
  handleClick = (event) => {
    // prevent default action on form submission
    event.preventDefault();

    // error handling if input field is blank
    if (this.state.userInput) {
      // reference to database
      const dbRef = firebase.database().ref();
      // whatever value is in state for userInput on submission/button click, we want to add this to our database
      dbRef.push(this.state.userInput);
      // reset state of input so it's blank
      this.setState({
        userInput: '',
      })
    } else {
      alert(`input cannot be left blank - please enter a task`);
    }
  }


  // function to remove item
  removeTask = (task) => {
    // reference our database
    const dbRef = firebase.database().ref();
    // remove the task item of choice from database, which also results in the screen being updated due to the .on() method we initialized in the componentDidMount method
    dbRef.child(task).remove();
  }


  // function to edit task item - fires when edit button is clicked
  editTask = (taskKey) => {
    let inputValue;
    this.state.tasks.forEach((taskItem) => {
      if (taskItem.key === taskKey) {
        taskItem.editing = !taskItem.editing;
        inputValue = taskItem.value;
      }
    });

    // make copy of our tasks located in state to be used when updating state in setState
    const updatedTasksState = [...this.state.tasks];

    this.setState({
      tasks: updatedTasksState,
      editingInput: inputValue,
    })
  }


  // save task function - fires when save button is clicked in "editing" mode
  saveTask = () => {
    let editingKey;

    // loop through each item in tasks array located in state
    this.state.tasks.forEach((task) => {
      if (task.editing) {
        task.editing = !task.editing;
        task.value = this.state.editingInput;
        editingKey = task.key;
      }
    });

    // make copy of our tasks located in state to be used when updating state in setState
    const updatedTasksState = [...this.state.tasks];
    // reference to our database but reference to the specific task item we want to update the value of
    const dbRef = firebase.database().ref(editingKey);
    // updating the task value in our database to the value that's in our editingInput state
    dbRef.set(this.state.editingInput);
    // update state and initiate re-render
    this.setState({
      tasks: updatedTasksState,
      editingInput: '',
    })
  } 


  render() {
    return(
      <main>
        <div className="wrapper">
          <div className="scrollWrapper">
            <section className="cardContainer">
              <h2>Task List</h2>
              <div className="taskItemContainer">
              {
                this.state.tasks.map((task) => {
                  return (
                    <div key={task.key} className="taskItem">
                    { task.editing === false ? 
                      <Task 
                        taskValue={task.value}
                        editTask={ () => {this.editTask(task.key)} }
                        removeTask={ () => {this.removeTask(task.key)} }
                      />
                      :
                      <Edit
                        editingInput={this.state.editingInput}
                        editHandleChange={this.editHandleChange}
                        saveTask={this.saveTask}
                      />
                    }
                    </div>
                  )
                })
              }
              </div>
            </section>

            {/* One of my stretch goals was to include the functionality to move each task to a different column - I decided to stick to the MVP for this project and will work on this feature afterwards */}
            <section className="cardContainer">
              <h2>In Progress</h2>
            </section>

            <section className="cardContainer">
              <h2>Done</h2>
            </section>
          </div>
        </div>

        <Form 
          inputVal={this.handleChange} 
          userInputState={this.state.userInput} 
          handleClick={this.handleClick}
        />
      </main>
    )
  }
}

export default Main;