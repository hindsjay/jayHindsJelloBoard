import React, { Component } from 'react';
import Form from './Form.js';
import firebase from '../utils/firebase.js';


class Main extends Component {
  constructor() {
    super()

    this.state = {
      tasks: [],
      userInput: '',
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
        newState.push({key: key, value: data[key]});
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


  render() {
    return(
      <main>
        <div className="wrapper">
          <div className="scroll-wrapper">
            <section className="card-container">
              <h2>Task List</h2>
              <div className="task-item-container">
              {
                this.state.tasks.map((task) => {
                  return (
                    <div key={task.key} className="task-item">
                      <p>{task.value}</p>
                      <div className="edit-delete-container">
                        <button type="button">edit</button>
                        <button type="button" onClick={ () => {this.removeTask(task.key)} }>delete</button>
                      </div>
                    </div>
                  )
                })
              }
              </div>
            </section>

            <section className="card-container">
              <h2>In Progress</h2>
            </section>

            <section className="card-container">
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