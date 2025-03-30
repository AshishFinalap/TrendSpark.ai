// src/components/Widget.js
import React from 'react';

function Widget({ title, thumbnail, description, style }) {
  // Use a placeholder if thumbnail is missing
  const imgSrc = thumbnail || 'https://via.placeholder.com/250x140.png/5e2d8a/f0e6ff?text=Trend';

  return (
    <div className="widget" style={style}>
      <img src={imgSrc} alt={title || 'Trending Topic'} className="widget-thumbnail" />
      <div className="widget-title">{title || 'Trending Topic'}</div>
      {description && (
        <div className="widget-description">
          {description}
        </div>
      )}
    </div>
  );
}

export default Widget;