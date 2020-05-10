import React from 'react';
import { ReactComponent as HeaderSvg } from '../assets/header-image.svg';


// props destructured
function Welcome({ enterButtonClicked }) {
  return (
    <header className="welcomeHeaderContainer">
      <h1 className="welcomeHeader">Jello</h1>

      <div className="welcomePageFlexContainer">
        <div className="welcomePageImageContainer">
          <HeaderSvg className="welcomePageImage" />
        </div>

        <div className="welcomeContentContainer">
          <p>Welcome to Jello!</p>
          <p>A Trello like task board!  Create, view, update, and delete items to keep you organized and focused on the most important tasks</p>
          <button type="button" onClick={ () => {enterButtonClicked()} }>Get Tasking!</button>
        </div>
      </div>
    </header>
  )
};

export default Welcome;