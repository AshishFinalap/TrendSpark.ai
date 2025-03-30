// src/components/UserTypeSelector.js
import React from 'react';

// Replaces ChoiceScreen with the new split design
function UserTypeSelector({ onSelect }) { // Renamed prop for clarity
  return (
    <div className="user-type-selector">
      <div
        className="user-type-option beginner"
        onClick={() => onSelect('beginner')}
        role="button" // Accessibility
        tabIndex={0} // Accessibility
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelect('beginner')} // Accessibility
      >
        Beginner
      </div>
      <div
        className="user-type-option experienced"
        onClick={() => onSelect('experienced')}
        role="button"
        tabIndex={0}
         onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelect('experienced')}
      >
        Experienced
      </div>
    </div>
  );
}

export default UserTypeSelector;