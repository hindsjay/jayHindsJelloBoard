import React from 'react';

// stateless component
const Form = (props) => {
  return (
    <form className="mainForm">
      <label htmlFor="taskInput" className="srOnly"></label>
      <input 
        type="text" 
        id="taskInput" 
        className="taskInput" 
        placeholder="Input Task Here..."
        onChange={ (event) => {props.inputVal(event)} }
        value={props.userInputState}
      >
      </input>
      <button type="submit" onClick={ (event) => {props.handleClick(event)} }>Add Task</button>
    </form>
  )
};

export default Form;