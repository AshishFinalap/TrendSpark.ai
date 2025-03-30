// src/components/SplitScreen.js
import React from 'react';

// Accept onBeginnerClick and onExperiencedClick (optional for future) as props
function SplitScreen({ onBeginnerClick, onExperiencedClick }) {
  return (
    <div className="split-container">
      {/* Add onClick handler */}
      <div
        className="section left"
        onClick={onBeginnerClick} // Use the passed handler
      >
        Beginner
      </div>
      <div
        className="section right"
        // onClick={onExperiencedClick} // Add handler if needed for Experienced path
        // Title attribute can provide hover text if hover effect is removed
        title="Content suggestions for Experienced creators (coming soon)"
      >
        Experienced
      </div>
    </div>
  );
}

export default SplitScreen;