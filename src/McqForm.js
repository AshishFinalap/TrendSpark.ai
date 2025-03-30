// src/components/McqForm.js
import React, { useState } from 'react';

// Define questions based on user type
const questions = {
  beginner: [
    {
      id: 'platform',
      text: 'Which platform are you primarily focusing on?',
      options: ['YouTube', 'TikTok', 'Instagram Reels', 'Not Sure Yet'],
    },
    {
      id: 'niche',
      text: 'What is your main content topic or niche?',
      options: ['Gaming', 'Lifestyle/Vlog', 'Education/Tutorials', 'Comedy/Entertainment', 'Tech', 'Other'],
    },
    {
      id: 'goal',
      text: 'What kind of trend ideas are you looking for?',
      options: ['Easy to start, low effort', 'Popular & likely to get views', 'Something unique/less common', 'Ideas related to my specific niche'],
    },
  ],
  advanced: [
    {
      id: 'platform',
      text: 'Which platform are you optimizing trends for?',
      options: ['YouTube (Long & Short)', 'TikTok', 'Instagram (Reels/Stories)', 'LinkedIn', 'Twitter/X'],
    },
    {
      id: 'niche',
      text: 'What is your established niche?',
      options: ['Gaming (Strategy/Reviews)', 'Tech (Deep Dives/News)', 'Finance/Business', 'Fitness/Wellness', 'Creative Arts', 'Science/Education'],
    },
    {
      id: 'style',
      text: 'What is your preferred content style or format?',
      options: ['Data-driven Analysis', 'High-production Narrative', 'Experimental/Avant-garde', 'Community-focused/Interactive', 'Tutorials/Masterclasses'],
    },
    {
      id: 'audience',
      text: 'Describe your target audience:',
      options: ['General Audience', 'Niche Enthusiasts', 'Industry Professionals', 'Young Adults (18-25)', 'Mature Audience (35+)'],
    },
  ],
};

function McqForm({ userType = 'beginner', onSubmit, onBack }) {
  const currentQuestions = questions[userType];
  const initialAnswers = currentQuestions.reduce((acc, q) => {
    acc[q.id] = ''; // Initialize answers as empty strings
    return acc;
  }, {});

  const [answers, setAnswers] = useState(initialAnswers);

  const handleChange = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentQuestions.every(q => answers[q.id])) {
      onSubmit(answers);
    } else {
      alert('Please answer all questions.'); // Simple validation feedback
    }
  };

  const allAnswered = currentQuestions.every(q => answers[q.id]);

  return (
    <div className="mcq-form-container">
      <button onClick={onBack} className="back-button">⬅ Back</button>
      <h2>Tell Us About You ({userType.charAt(0).toUpperCase() + userType.slice(1)})</h2>
      <p className="form-description">Help us tailor the trend suggestions to your needs.</p>

      <form onSubmit={handleSubmit}>
        {currentQuestions.map((q) => (
          // Use fieldset and legend for semantics and styling
          <fieldset key={q.id} className="mcq-question">
            <legend>{q.text}</legend> {/* Question text becomes legend */}
            <div className="mcq-options">
              {q.options.map((option) => (
                <label key={option} className="option">
                  <input
                    type="radio"
                    name={q.id}
                    value={option}
                    checked={answers[q.id] === option}
                    onChange={() => handleChange(q.id, option)}
                  />
                   {/* Wrap text in span for custom radio styling */}
                   <span className="option-text">{option}</span>
                </label>
              ))}
            </div>
          </fieldset>
        ))}

        <button type="submit" className="mcq-submit-button" disabled={!allAnswered}>
          Generate Trend Ideas ✨
        </button>
      </form>
    </div>
  );
}

export default McqForm;