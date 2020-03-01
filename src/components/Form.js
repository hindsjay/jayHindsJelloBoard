import React from 'react';


const Form = (props) => {
  return (
    <form>
      <label htmlFor="task-input" className="sr-only"></label>
      <input 
        type="text" 
        id="task-input" 
        className="task-input" 
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