// src/components/CategorySlider.js
import React, { useRef } from 'react';
import Widget from './Widget';

function CategorySlider({ title, items = [] }) {
  const sliderRef = useRef(null);
  // Adjust scroll amount based on new widget width (250) + gap (25)
  const scrollAmount = 250 + 25;

  const slide = (direction) => {
    if (sliderRef.current) {
      if (direction === 'left') {
        sliderRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  // Add edge scroll logic here if desired (complex JS)
  // useEffect(() => { /* Edge scroll listener setup/cleanup */ }, []);

  return (
    <div>
      <div className="category">{title}</div>
      <div className="slider-controls">
        <button onClick={() => slide('left')} aria-label={`Scroll ${title} left`}>⬅</button>
        <button onClick={() => slide('right')} aria-label={`Scroll ${title} right`}>➡</button>
      </div>
      <div className="slider" ref={sliderRef}>
        {items.map((item, index) => (
          // Pass all relevant props to Widget
          <Widget
            key={`${title}-${item.id || index}`} // Use item.id if available
            title={item.title}
            thumbnail={item.thumbnail}
            description={item.description}
            style={{ '--widget-index': index }} // For staggered animation
          />
        ))}
      </div>
    </div>
  );
}

export default CategorySlider;