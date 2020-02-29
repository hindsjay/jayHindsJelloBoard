import React from 'react';


const Form = () => {
  return (
    <form>
      <label htmlFor="task-input" className="sr-only"></label>
      <input type="text" id="task-input" className="task-input" placeholder="Input Task Here..."></input>
      <button type="submit">Add Task</button>
    </form>
  )
};

export default Form;