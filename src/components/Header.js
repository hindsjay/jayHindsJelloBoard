import React from 'react';

// stateless component
const Header = () => {
  return (
    <header>
      <h1>Title</h1>
      <div className="sub-header wrapper">
        <p>Jay Hinds</p>
        <button>Menu</button>
      </div>
    </header>
  )
}

export default Header;