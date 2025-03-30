// src/components/BeginnerHelp.js
import React, { useState } from 'react';

// Placeholder function for calling the backend API later
const fetchTrendSuggestions = async (preferences) => {
  console.log("Simulating API Call with preferences:", preferences);
  // In a real app, this would be:
  // const response = await fetch('/api/beginner-suggestions', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(preferences)
  // });
  // const data = await response.json();
  // return data;

  // Simulate receiving data after a delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  return {
    trendingTheme: "Short-form video challenges & AI Tools Discussion",
    engagementLevel: "High engagement on relatable content and quick tutorials.",
    newVsEstablished: "Mix, but many new creators finding success with authentic short-form content.",
    actionableIdeas: [
      { title: "My Honest First Try with AI Video Tool [Tool Name]", description: "Document your first experience using a popular AI video editing tool. Show struggles and successes. Target Audience: Other beginners curious about AI.", thumbnail: "Confused face + AI logo + 'First Try?' text overlay." },
      { title: "Reacting to [Popular TikTok Trend/Challenge]", description: "Participate authentically in a current TikTok trend relevant to your niche. Add your unique spin. Target Audience: Younger viewers, platform natives.", thumbnail: "Dynamic shot of you doing the trend + Trend Hashtag overlay." },
      { title: "3 Beginner Mistakes I Made Starting on [Platform]", description: "Share actionable tips based on your early mistakes. Build trust and relatability. Target Audience: Aspiring creators on the same platform.", thumbnail: "Split screen: 'Mistake' graphic vs 'Solution' graphic + Your face." }
    ]
  };
};

function BeginnerHelp({ onClose }) {
  const [preferences, setPreferences] = useState({
    platform: 'YouTube',
    niche: '',
    interest: 'General',
    style: ''
  });
  const [suggestions, setSuggestions] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPreferences(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuggestions(null); // Clear previous suggestions
    try {
      const data = await fetchTrendSuggestions(preferences);
      setSuggestions(data);
    } catch (err) {
      console.error("Error fetching suggestions:", err);
      setError("Failed to fetch suggestions. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="beginner-help-container">
      <button onClick={onClose} className="back-button">⬅ Back</button>
      <h2>Beginner Content Assistant</h2>
      <p>Tell us a bit about your content goals to get tailored trend ideas.</p>

      {!suggestions && !isLoading && (
        <form onSubmit={handleSubmit} className="beginner-form">
          <div className="form-group">
            <label htmlFor="platform">Main Platform:</label>
            <select id="platform" name="platform" value={preferences.platform} onChange={handleChange}>
              <option value="YouTube">YouTube</option>
              <option value="TikTok">TikTok</option>
              <option value="Instagram">Instagram Reels</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="niche">Primary Niche/Topic:</label>
            <input
              type="text"
              id="niche"
              name="niche"
              value={preferences.niche}
              onChange={handleChange}
              placeholder="e.g., Gaming, Cooking, Tech Reviews, Fitness"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="interest">Trend Interest:</label>
            <select id="interest" name="interest" value={preferences.interest} onChange={handleChange}>
              <option value="General">General / Broad Trends</option>
              <option value="Gaming">Gaming Trends</option>
              <option value="Music">Music Trends</option>
              <option value="Tech">Tech Trends</option>
              <option value="Lifestyle">Lifestyle & Vlogging</option>
              {/* Add more based on your analysis capabilities */}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="style">Desired Content Style:</label>
            <textarea
              id="style"
              name="style"
              value={preferences.style}
              onChange={handleChange}
              placeholder="e.g., Informative tutorials, comedic skits, personal vlogs, quick tips"
              rows="3"
            />
          </div>

          <button type="submit" className="generate-button" disabled={isLoading}>
            {isLoading ? 'Analyzing Trends...' : 'Generate Content Ideas'}
          </button>
        </form>
      )}

      {isLoading && <div className="loading-indicator">Loading...</div>}
      {error && <div className="error-message">{error}</div>}

      {suggestions && (
        <div className="suggestions-results">
          <h3>Trend Analysis & Content Ideas:</h3>
          <div className="suggestion-section">
            <strong>Trending Theme:</strong>
            <p>{suggestions.trendingTheme}</p>
          </div>
          <div className="suggestion-section">
            <strong>Engagement Level:</strong>
            <p>{suggestions.engagementLevel}</p>
          </div>
          <div className="suggestion-section">
            <strong>New vs. Established Creators:</strong>
            <p>{suggestions.newVsEstablished}</p>
          </div>
          <div className="suggestion-section">
            <strong>Actionable Content Ideas for Beginners:</strong>
            {suggestions.actionableIdeas.map((idea, index) => (
              <div key={index} className="idea-card">
                <h4>Idea {index + 1}: {idea.title}</h4>
                <p><strong>Description Template:</strong> {idea.description}</p>
                <p><strong>Thumbnail Concept:</strong> {idea.thumbnail}</p>
              </div>
            ))}
          </div>
           <button onClick={() => setSuggestions(null)} className="back-button refine-button">
             Refine Preferences & Regenerate
           </button>
        </div>
      )}
    </div>
  );
}

export default BeginnerHelp;