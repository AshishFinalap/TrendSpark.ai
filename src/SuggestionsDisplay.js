// src/components/SuggestionsDisplay.js
import React from 'react';

function SuggestionsDisplay({ suggestions, onIdeaClick, onBack }) { // Added onIdeaClick
  if (!suggestions || !suggestions["Actionable Content Ideas"]) { // Check the correct key based on new API structure
    return <p>Loading suggestions or none available...</p>;
  }

  // Extract ideas - adjust key if needed based on actual API response
  const ideas = suggestions["Actionable Content Ideas"];
  // Convert object to array if necessary, assuming it's already an array based on prompt
  const ideasArray = Array.isArray(ideas) ? ideas : Object.values(ideas || {});

  return (
    <div className="recommendations-container">
      {/* Back button might go to survey OR previous step if applicable */}
      {/* <button onClick={onBack} className="back-button-page">⬅ Back to Survey</button> */}
      <h2>Top 5 Content Ideas For You</h2>

      <div className="recommendations-list">
        {ideasArray.slice(0, 5).map((idea, index) => ( // Limit to top 5
          <div
            key={idea.id || index} // Use idea.id if available
            className="recommendation-tile"
            style={{ '--rec-index': index }} // For staggered animation
            onClick={() => onIdeaClick(idea)} // Trigger navigation to breakdown
            role="button"
            tabIndex={0}
             onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onIdeaClick(idea)}
          >
            <img
              src={idea.thumbnail || 'https://via.placeholder.com/120x80.png/9b5de5/ffffff?text=Idea'}
              alt={idea.title || 'Content Idea'}
              className="rec-thumbnail"
            />
            <div className="rec-content">
              <h3 className="rec-title">{idea.title || 'Untitled Idea'}</h3>
              {/* Basic details can show here, hover can show more */}
               <p style={{fontSize: '0.9em', color: 'var(--text-secondary)', marginTop: '5px'}}>
                 {idea.brief_description?.substring(0, 100) + '...' || 'Click to see details...'}
               </p>
            </div>
            {/* Optional: Add hover details structure if needed */}
            {/* <div className="rec-hover-details">
                 <p>{idea.unique_selling_points || 'More info inside!'}</p>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SuggestionsDisplay;