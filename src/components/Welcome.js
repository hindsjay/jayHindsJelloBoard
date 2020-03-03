import React, { Component } from 'react';

// stateless component
const Welcome = (props) => {
  return (
    <header className="welcomeHeaderContainer">
      <div className="welcomeContentContainer">
        <h1 className="welcomeHeader">Title</h1>

        <p>Welcome to Title!</p>
        <p>A Trello like task board to keep you organized and focused on the most important tasks</p>

        <button type="button" onClick={ () => {props.enterButtonClicked()} }>Enter</button>
      </div>
    </header>
  )
}

export default Welcome;