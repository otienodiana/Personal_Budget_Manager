// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      
      <ul>
      <li><Link to="/">HOME</Link></li>
        <li><Link to="/add-expense">MANAGEEXPENSES</Link></li>
        
        <li><Link to="/expense-summary">SUMMARY</Link></li>
        <li><Link to="/budget-alert">YOURALERTS</Link></li>
        <li><Link to="/set-budget">YOURLIMITS</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
