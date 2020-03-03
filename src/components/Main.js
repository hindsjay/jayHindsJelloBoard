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
        newState.push({key: key, value: data[key], editing: false, list: 'initial'});
      }

      // execute setState to initiate re-render which will update our page with the task items that have been added to state
      this.setState({
        tasks: newState,
      })
    });
  }


  handleChange = (event) => {
    this.setState({
      userInput: event.target.value,
    })
  }


  editHandleChange = (event) => {
    this.setState({
      editingInput: event.target.value,
    })
  }


  handleClick = (event) => {
    // prevent default action on form submission
    event.preventDefault();
    // reference to database
    const dbRef = firebase.database().ref();
    // whatever value is in state for userInput on submission/button click, we want to add this to our database
    dbRef.push(this.state.userInput);
    // reset state of input so it's blank
    this.setState({
      userInput: '',
    })
  }


  removeTask = (task) => {
    // reference our database
    const dbRef = firebase.database().ref();
    // remove the task item of choice from database, which also results in the screen being updated due to the .on() method we initialized in the componentDidMount method
    dbRef.child(task).remove();
  }


  editTask = (taskKey) => {
    let inputValue;
    this.state.tasks.forEach((taskItem) => {
      if (taskItem.key === taskKey) {
        taskItem.editing = !taskItem.editing;
        inputValue = taskItem.value;
      }
    });

    const updatedTasksState = [...this.state.tasks];

    this.setState({
      tasks: updatedTasksState,
      editingInput: inputValue,
    })

    // this.editInput.current.focus();
  }


  saveTask = () => {
    let editingKey;
    console.log(this.state.tasks);
    this.state.tasks.forEach((task) => {
      if (task.editing) {
        task.editing = !task.editing;
        task.value = this.state.editingInput;
        editingKey = task.key;
      }
    });

    const updatedTasksState = [...this.state.tasks];

    const dbRef = firebase.database().ref(editingKey);
    
    dbRef.set(this.state.editingInput);

    this.setState({
      tasks: updatedTasksState,
      editingInput: '',
    })
  }


  // moveTask = () => {

  // }


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