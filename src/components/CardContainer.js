import React from 'react';
import Task from './Task';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';


function CardContainer(props) {

const {
  headerName, 
  tasksArray, 
  dbRefInfo, 
  toggleAddingTaskState, 
  addingTaskState, 
  inputVal, 
  userInputState, 
  handleClick,
  listHeaderTitles,
} = props;

  return (
    <section className="cardContainer">
    <h2>{headerName}</h2>
    { tasksArray.filter((task) => task.status === headerName)
      .map((task) => {
        return (
          <div key={task.key} className="taskItem">
            <Task 
              dbRefInfo={dbRefInfo}
              taskObject={task}
              headerName={headerName}
              listHeaderTitles={listHeaderTitles}
            />
          </div>
        )
      }) 
    }

    { addingTaskState ? 
      <div className="taskItem">
        <Task 
          toggleAddingClass={toggleAddingTaskState} 
          addingTaskState={addingTaskState}
          dbRefInfo={dbRefInfo}
          inputVal={inputVal} 
          userInputState={userInputState} 
          handleClick={handleClick}
        />
      </div> :
      headerName === 'Task List' &&
      <button className="addTaskButton" onClick={toggleAddingTaskState}>
        <FontAwesomeIcon icon={faPlusCircle} className="plusSignIcon" />
        Add new task item
      </button>
    }
    </section>
  )
}

export default CardContainer;