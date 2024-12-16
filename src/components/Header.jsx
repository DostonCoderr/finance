import React from 'react';

const Header = ({ toggleSidebar }) => {
  return (
    <header>
      <div className="menu-icon" onClick={toggleSidebar}>
        ☰ 
      </div>
      <div>
        <h1>Dashboard</h1>
      </div>
    </header>
  );
};

export default Header;
