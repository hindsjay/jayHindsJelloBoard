import React from 'react';

// stateless component
// *** special note - the menu button isn't functional at this time.  Included it because I wanted to include some functionality but this was a stretch goal and I just concentrated on getting the MVP completed.
const Header = () => {
  return (
    <header className="mainAppHeader">
      <h1>Title</h1>
      <div className="subHeader wrapper">
        <p>Jay Hinds</p>
        <button>Menu</button>
      </div>
    </header>
  )
}

export default Header;