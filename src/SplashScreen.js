// src/components/SplashScreen.js
import React from 'react';

// This component now just provides the container and the animated logo
// The fade-out of the container and the logo animation are handled by CSS
function SplashScreen() {
  return (
    <div className="splash-screen">
      <div className="splash-logo">TrendSpark.ai</div>
    </div>
  );
}

export default SplashScreen;