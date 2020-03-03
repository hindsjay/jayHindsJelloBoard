import React, { Component, Fragment } from 'react';
import Form from './Form.js';
import firebase from '../utils/firebase.js';


class Main extends Component {
  constructor() {
    super()

    this.editInput = React.createRef();

    this.state = {
      tasks: [],
      userInput: '',
      editingInput: '',
    }
  }


  componentDidMount() {
    const dbRef = firebase.database().ref();

    // event listener that fires anytime there is a change in the database
    dbRef.on('value', (response) => {
      const newState = [];
      const data = response.val();
      console.log(data);

      // for in loop to access each task item in our data object and push each task item to our new state array
      for (let key in data) {
        newState.push({key: key, value: data[key], editing: false});
      }

      // execute setState to initiate re-render which will update our page with updated task items
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
      alert(`Please enter text into the input field`);
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
      // if we're in editing mode then toggle the value to false so we're no longer stating we're in editing mode for that task
      // then 
      if (task.editing) {
        task.editing = !task.editing;
        task.value = this.state.editingInput;
        editingKey = task.key;
      }
    });

    // make copy of our tasks located in state to be used when updating state in setState
    const updatedTasksState = [...this.state.tasks];

    const dbRef = firebase.database().ref(editingKey);
    
    dbRef.set(this.state.editingInput);

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
                        <Fragment>
                          <p>{task.value}</p> 
                          <div className="editDeleteContainer">
                            <button type="button" onClick={ () => {this.editTask(task.key)} }>edit</button>
                            <button type="button" onClick={ () => {this.removeTask(task.key)} }>delete</button>
                          </div>
                        </Fragment>
                        :
                        <Fragment>
                          <input 
                            ref={this.editInput} 
                            defaultValue={this.state.editingInput}
                            onChange={this.editHandleChange}
                          >
                          </input>
                          <button className="saveButton editModeButton" type="button" onClick={this.saveTask}>Save</button>
                          <button className="moveButton editModeButton" type="button" onClick={this.moveTask}>Move</button> 
                        </Fragment>
                      }
                    </div>
                  )
                })
              }
              </div>
            </section>

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