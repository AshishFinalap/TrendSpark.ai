// src/components/BreakdownPage.js
import React, { useEffect } from 'react';

function BreakdownPage({ idea, onBack }) {

   // Scroll to top when component mounts
   useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!idea) {
    return (
        <div className="breakdown-page">
            <p>No idea selected. Please go back.</p>
            <button onClick={onBack} className="back-button-page">⬅ Back to Recommendations</button>
        </div>
    );
  }

  // Use placeholder data if specific fields are missing
  const placeholder = "Details coming soon...";
  const placeholderList = ["Tip 1 coming soon", "Tip 2 coming soon", "Tip 3 coming soon"];
  const placeholderAnalysis = { views: 'N/A', likes: 'N/A', shares: 'N/A' };
  const placeholderQuote = "The secret of getting ahead is getting started. – Mark Twain";


  return (
    <div className="breakdown-page">
      <button onClick={onBack} className="back-button-page" style={{marginBottom: '20px'}}>⬅ Back to Recommendations</button>

      <div className="breakdown-header">
        <h2 className="breakdown-title">{idea.title || 'Content Idea'}</h2>
         <img
            src={idea.thumbnail || 'https://via.placeholder.com/600x300.png/9b5de5/ffffff?text=Idea+Details'}
            alt={idea.title || 'Content Idea'}
            className="breakdown-thumbnail"
          />
      </div>

      <div className="breakdown-section">
        <h3>📝 Brief Description</h3>
        <p>{idea.brief_description || placeholder}</p>
      </div>

      <div className="breakdown-section">
        <h3>✨ Unique Selling Points (USP)</h3>
        <p>{idea.unique_selling_points || placeholder}</p>
      </div>

      <div className="breakdown-section">
        <h3>📋 Step-by-Step Guide</h3>
        <ul>
          {(idea.step_by_step_guide || placeholderList).map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ul>
      </div>

      <div className="breakdown-section">
        <h3>🛠️ Required Resources & Setup</h3>
        <ul>
          {(idea.required_resources || placeholderList).map((resource, index) => (
            <li key={index}>{resource}</li>
          ))}
        </ul>
      </div>

      <div className="breakdown-section">
        <h3>📊 Trending Analysis (Example)</h3>
        <p>Related videos are currently getting around:</p>
        <ul>
            <li>Views: {idea.trending_analysis?.views || placeholderAnalysis.views}</li>
            <li>Likes: {idea.trending_analysis?.likes || placeholderAnalysis.likes} (Approx. Ratio)</li>
            <li>Shares: {idea.trending_analysis?.shares || placeholderAnalysis.shares} (Estimated)</li>
        </ul>
         <p><small>Note: Data is illustrative. Real-time analysis varies.</small></p>
      </div>

       <div className="breakdown-section">
        <h3>⭐ Performance Insights (Your Fav Creator)</h3>
        <p>{idea.creator_performance_insights || `Insights related to your favorite creator's similar content will appear here.`}</p>
      </div>

      <div className="breakdown-section">
        <h3>💡 Pro Tips for Engagement</h3>
         <ul>
          {(idea.pro_tips || placeholderList).map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      </div>

      <div className="breakdown-quote">
        <p>"{idea.motivational_quote || placeholderQuote}"</p>
      </div>

       <button onClick={onBack} className="back-button-page" style={{display: 'block', margin: '40px auto 0 auto'}}>⬅ Back to Recommendations</button>

    </div>
  );
}

export default BreakdownPage;