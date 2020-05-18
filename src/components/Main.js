import React, { Component } from 'react';
import firebase from '../utils/firebase.js';
import CardContainer from './CardContainer.js';


class Main extends Component {
  constructor() {
    super()

    this.state = {
      tasks: [],
      userInput: '',
      isAddingTask: false,
      listHeaderTitles: ['Task List', 'In Progress', 'Done'],
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
        newState.push({
          key: key, 
          value: data[key].taskItemDescription, 
          status: data[key].taskStatus
        });
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
      // also adding in default task status when task card is created so card would go into correct column
      const taskItemObject = {
        taskItemDescription: this.state.userInput,
        taskStatus: 'Task List',
      }
      dbRef.push(taskItemObject);
      // reset state of input so it's blank
      this.setState({
        userInput: '',
        isAddingTask: !this.state.isAddingTask,
      })
    } else {
      alert(`input cannot be left blank - please enter a task`);
    }
  }

  toggleAddingTaskState = () => {
    this.setState({
      isAddingTask: !this.state.isAddingTask,
      userInput: '',
    })
  }


  render() {
    return (
      <main>
        <div className="wrapper">
          <div className="scrollWrapper">
            { this.state.listHeaderTitles.filter((title) => title === 'Task List')
              .map((title) => {
                return (
                  <CardContainer 
                    key={title}
                    headerName={title}
                    tasksArray={this.state.tasks}
                    dbRefInfo={firebase.database()}
                    toggleAddingTaskState={this.toggleAddingTaskState}
                    addingTaskState={this.state.isAddingTask}
                    inputVal={this.handleChange}
                    userInputState={this.state.userInput}
                    handleClick={this.handleClick}
                    listHeaderTitles={this.state.listHeaderTitles}
                  />
                )
              })
            }

            { this.state.listHeaderTitles.filter((title) => title !== 'Task List')
              .map((title) => {
                return (
                  <CardContainer 
                    key={title}
                    headerName={title}
                    tasksArray={this.state.tasks}
                    dbRefInfo={firebase.database()}
                    inputVal={this.handleChange}
                    userInputState={this.state.userInput}
                    handleClick={this.handleClick}
                    listHeaderTitles={this.state.listHeaderTitles}
                  />
                )
              })
            }
          </div>  {/*  .scrollWrapper end  */}
        </div>  {/*  .wrapper end  */}
      </main>
    )
  }
}

export default Main;