/*
// src/components/Header.js
import React from 'react';

// Accept isScrolled prop
function Header({ isScrolled }) {
  return (
    // Conditionally add 'scrolled' class based on the prop
    <header className={`app-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-logo">TrendSpark.ai</div>
      // { Placeholder for future Search, Profile, Notifications }
      // { <div className="header-actions"> ... </div> }
    </header>
  );
}

export default Header;
*/

import React from 'react';
import { Link } from 'react-router-dom';

function Header({ isScrolled }) {
  return (
    <header className={`app-header ${isScrolled ? 'scrolled' : ''}`}>
      <Link 
        to="/" 
        style={{ textDecoration: 'none', color: 'inherit' }} 
        className="header-logo"
      >
        TrendSpark.ai
      </Link>
    </header>
  );
}

export default Header;
