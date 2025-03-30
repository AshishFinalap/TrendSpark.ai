// src/components/Footer.js
import React from 'react';

// Simple Footer Component
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-footer">
      {/* Optional small logo placeholder */}
      {/* <span className="footer-logo"></span> */}
      © {currentYear} TrendSpark.ai - All Rights Reserved.
    </footer>
  );
}

export default Footer;