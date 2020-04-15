import React from 'react';


// stateless component
// props destructured
function Welcome({ enterButtonClicked }) {
  return (
    <header className="welcomeHeaderContainer">
      <div className="welcomeContentContainer">
        <h1 className="welcomeHeader">Jello</h1>

        <p>Welcome to Jello!</p>
        <p>A Trello like task board!  Create, view, update, and delete items to keep you organized and focused on the most important tasks</p>

        <button type="button" onClick={ () => {enterButtonClicked()} }>Get Tasking!</button>
      </div>
    </header>
  )
};

export default Welcome;