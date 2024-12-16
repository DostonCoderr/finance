import React from 'react';

const Sidebar = ({ openSidebarToggle, toggleSidebar }) => {
  return (
    <div className={`sidebar ${openSidebarToggle ? '' : 'hide'}`}>
      <div className="sidebar-header">
        <div className="close-icon" onClick={toggleSidebar}>
          ✖
        </div>
      </div>
      <ul>
        <li>
          <a href="/">
            <i className="fas fa-home"></i> 
            Home
          </a>
        </li>
        <li>
          <a href="/transaction">
            <i className="fas fa-list-alt"></i>
            Tranzaksiyalar
          </a>
        </li>
        <li>
          <a href="/convert">
            <i className="fas fa-exchange-alt"></i> 
            Valyuta konvertori
          </a>
        </li>
        <li>
          <a href="/transactionform">
            <i className="fas fa-plus-circle"></i> 
            Tranzaksiya qo'shish
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
