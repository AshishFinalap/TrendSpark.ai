

import React from 'react';
import PropTypes from 'prop-types';
import styles from './ProfileCard.module.css'; // CSS Module import karenge

function ProfileCard({ name, age, location }) {
  // Inline style for dynamic elements
  const inlineStyle = {
    border: '2px solid #333',
    padding: '10px',
    margin: '10px',
    backgroundColor: age > 30 ? '#f0f0f0' : '#dff0d8',  // Conditional color change
  };

  return (
    <div style={inlineStyle} className={styles.profileCard}>
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p>Location: {location}</p>
    </div>
  );
}

// Prop-types validation for props
ProfileCard.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired, // Age ko number hone ka validation
  location: PropTypes.string.isRequired,
};

export default ProfileCard;
