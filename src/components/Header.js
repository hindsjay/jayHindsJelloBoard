import React from 'react';

// stateless component
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