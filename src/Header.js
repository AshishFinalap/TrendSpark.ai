// --- START OF FILE src/Header.js ---

import React from 'react';

// Accept isScrolled and the new onLogoClick prop
function Header({ isScrolled, onLogoClick }) {

  // Handle keyboard activation (Enter/Space)
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      onLogoClick();
    }
  };

  return (
    // Conditionally add 'scrolled' class based on the prop
    <header className={`app-header ${isScrolled ? 'scrolled' : ''}`}>
      {/* Wrap the logo text in a clickable div */}
      <div
        className="header-logo" // Keep existing class for styling
        onClick={onLogoClick} // Call the passed function on click
        role="button" // Accessibility: Indicate it acts like a button
        tabIndex={0} // Accessibility: Make it focusable
        onKeyDown={handleKeyDown} // Accessibility: Handle keyboard activation
        aria-label="Go to homepage" // Accessibility: Describe action
      >
        TrendSpark.ai
      </div>
      {/* Placeholder for future Search, Profile, Notifications */}
      {/* <div className="header-actions"> ... </div> */}
    </header>
  );
}

export default Header;

// --- END OF FILE src/Header.js ---
