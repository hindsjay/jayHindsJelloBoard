import React, { Component } from 'react';
import Form from './Form.js';
import firebase from '../utils/firebase.js';
import Task from './Task.js';


class Main extends Component {
  constructor() {
    super()

    this.state = {
      tasks: [],
      userInput: '',
    }
  }

  // componentDidMount lifecycle method which executes once component mounts
  // this allows us to sync the items in our database to our app (and therefore our UI)
  componentDidMount() {
    const dbRef = firebase.database().ref();

    // event listener that fires anytime there is a change in the database
    dbRef.on('value', (response) => {
      const newState = [];
      const data = response.val();

      // for in loop to access each task item in our data object and push each task item to our new state array
      for (let key in data) {
        newState.push({key: key, value: data[key]});
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

  render() {
    return(
      <main>
        <div className="wrapper">
          <div className="scrollWrapper">
            <section className="cardContainer">
              <h2>Task List</h2>
              { this.state.tasks.map((task) => {
                return (
                  <div key={task.key} className="taskItem">
                    <Task 
                      dbRefInfo={firebase.database()}
                      taskValue={task.value}
                      taskKey={task.key}
                    />
                  </div>
                )
              }) }
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