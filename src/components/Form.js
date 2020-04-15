import React from 'react';


// stateless component
// props destructured
function Form({ inputVal, userInputState, handleClick }) {
  return (
    <form className="mainForm">
      <label htmlFor="taskInput" className="srOnly"></label>
      <input 
        type="text" 
        id="taskInput" 
        className="taskInput" 
        placeholder="Input Task Here..."
        onChange={ (event) => {inputVal(event)} }
        value={userInputState}
      >
      </input>
      <button type="submit" onClick={ (event) => {handleClick(event)} }>Add Task</button>
    </form>
  )
};

export default Form;