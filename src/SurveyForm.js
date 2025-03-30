// src/components/SurveyForm.js
import React, { useState, useEffect } from 'react';

// Keep surveyQuestions definition as in the previous version

const surveyQuestions = [
  { id: 'category', text: 'Select your primary video category:', type: 'radio', options: ['Gaming', 'Music', 'Vlogging', 'Educational', 'Technology', 'Lifestyle & Travel', 'Health & Fitness', 'Other'], },
  { id: 'idealCreator', text: 'Who is your ideal content creator (e.g., MrBeast, Marques Brownlee)?', type: 'text', },
  { id: 'budget', text: 'What is your approximate budget for creating one video?', type: 'dropdown', options: ['Select Budget...', '$0 - $50 (Low)', '$50 - $200 (Medium)', '$200+ (High)', 'Flexible'], },
  { id: 'resources', text: 'What resources do you have available?', type: 'checkbox', options: ['DSLR/Mirrorless Camera', 'Smartphone Camera', 'Webcam', 'Dedicated Microphone', 'Basic Lighting', 'Advanced Lighting', 'Editing Software (Free)', 'Editing Software (Paid)', 'Green Screen'], },
  { id: 'videoStyle', text: 'What is your preferred video style?', type: 'radio', options: ['Short-Form (e.g., TikTok/Shorts)', 'Long-Form (e.g., 10+ min YouTube)', 'Cinematic / High Production', 'Tutorial / Screen Recording', 'Talking Head / Informative', 'Vlog / Day-in-the-life'], },
];


function SurveyForm({ onSubmit, onBack }) { // onBack now goes to previous step (home)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isCompleting, setIsCompleting] = useState(false);
  // State to manage exit animation for previous question
  const [exitingQuestionIndex, setExitingQuestionIndex] = useState(-1);

  const currentQuestion = surveyQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === surveyQuestions.length - 1;

  // Pre-populate/Initialize answer state for current question
  useEffect(() => {
    const q = surveyQuestions[currentQuestionIndex];
    if (q) { // Ensure question exists
        if (q.type === 'checkbox' && !answers[q.id]) {
          setAnswers(prev => ({ ...prev, [q.id]: [] }));
        }
        if (q.type === 'dropdown' && !answers[q.id]) {
          setAnswers(prev => ({ ...prev, [q.id]: '' }));
        }
    }
  }, [currentQuestionIndex, answers]); // Rerun when index changes

  const handleInputChange = (e) => { /* Keep this function as before */
      const { name, value, type, checked } = e.target;
      if (type === 'checkbox') {
          setAnswers(prev => {
              const currentValues = prev[name] || [];
              if (checked) { return { ...prev, [name]: [...currentValues, value] }; }
              else { return { ...prev, [name]: currentValues.filter(item => item !== value) }; }
          });
      } else { setAnswers(prev => ({ ...prev, [name]: value })); }
  };

  const handleNext = () => {
    if (!isLastQuestion) {
      setExitingQuestionIndex(currentQuestionIndex); // Trigger exit animation
      setTimeout(() => {
          setCurrentQuestionIndex(prev => prev + 1);
          setExitingQuestionIndex(-1); // Clear exiting state after transition
      }, 300); // Match CSS transition duration
    } else {
      // Submit Logic
      setIsCompleting(true);
      onSubmit(answers);
    }
  };

  const handleBack = () => {
      if (currentQuestionIndex > 0) {
          setExitingQuestionIndex(currentQuestionIndex); // Trigger exit animation
           setTimeout(() => {
               setCurrentQuestionIndex(prev => prev - 1);
               setExitingQuestionIndex(-1);
           }, 300); // Match CSS transition duration
      } else {
          onBack(); // Use the prop to go back from the first question (e.g., to home)
      }
  };

   const isCurrentQuestionAnswered = () => { /* Keep this function as before */
        const q = surveyQuestions[currentQuestionIndex];
        if (!q) return false; // Handle potential edge case
        const answer = answers[q.id];
        if (q.type === 'checkbox') return answer?.length > 0;
        if (q.type === 'dropdown') return answer && answer !== q.options[0];
        return !!answer?.trim(); // Check if text/radio has a non-empty value
   };

  return (
    <div className="survey-form-container">
      {/* Removed absolute positioned back button */}
      <h2>Personalize Your Ideas</h2>
      <p className="form-description">Answer a few questions to get tailored suggestions. Progress: {currentQuestionIndex + 1} / {surveyQuestions.length}</p>

      <form onSubmit={(e) => e.preventDefault()}>
        {/* Wrapper to manage question transitions */}
        <div className="survey-questions-wrapper">
            {surveyQuestions.map((q, index) => (
              <div
                key={q.id}
                className={`survey-question ${index === currentQuestionIndex ? 'active' : ''} ${index === exitingQuestionIndex ? 'exiting' : ''}`}
              >
                <fieldset> {/* Use fieldset for grouping */}
                    <legend className="question-label">{q.text}</legend> {/* Label is now legend */}

                    <div className="survey-input-group">
                      {q.type === 'text' && ( <input type="text" id={q.id} name={q.id} value={answers[q.id] || ''} onChange={handleInputChange} placeholder="Type your answer..." /> )}
                      {q.type === 'dropdown' && ( <select id={q.id} name={q.id} value={answers[q.id] || ''} onChange={handleInputChange}>{q.options.map(opt => <option key={opt} value={opt} disabled={opt === q.options[0]}>{opt}</option>)} </select> )}
                      {(q.type === 'radio' || q.type === 'checkbox') && (
                        <div className="survey-options"> {q.options.map(opt => ( <label key={opt} className="option"> <input type={q.type} id={`${q.id}-${opt.replace(/\s+/g, '-')}`} name={q.id} value={opt} checked={q.type === 'checkbox' ? answers[q.id]?.includes(opt) : answers[q.id] === opt } onChange={handleInputChange}/> <span className="option-text">{opt}</span> </label> ))} </div>
                      )}
                    </div>
                </fieldset>
              </div>
            ))}
        </div>

        <div className="survey-navigation">
            <button
               type="button"
               onClick={handleBack}
               className="survey-back-button"
               // Disable back button on the first question, OR use onBack prop
               disabled={currentQuestionIndex === 0 && !onBack}
            >
              {/* Show generic Back unless it goes fully back */}
              {currentQuestionIndex === 0 && onBack ? 'Back to Home' : '⬅ Back'}
            </button>

           <button
             type="button"
             onClick={handleNext}
             className="survey-button" // Main action button style
             disabled={!isCurrentQuestionAnswered() || isCompleting}
           >
              {isCompleting ? 'Generating...' : (isLastQuestion ? 'Generate Ideas ✨' : 'Next Question ➡')}
           </button>
        </div>
      </form>
    </div>
  );
}

export default SurveyForm;