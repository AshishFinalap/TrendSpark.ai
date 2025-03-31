// src/App.js
import React, { useState, useEffect, useCallback } from 'react';
// Assuming imports point to the correct Components subfolder
import SplashScreen from './Components/SplashScreen';
import Header from './Components/Header'; // <<< Make sure this path is correct
import CategorySlider from './Components/CategorySlider';
import UserTypeSelector from './Components/UserTypeSelector';
import SurveyForm from './Components/SurveyForm';
import SuggestionsDisplay from './Components/SuggestionsDisplay';
import BreakdownPage from './Components/BreakdownPage';
import Footer from './Components/Footer';
import './App.css';

// --- Updated sliderData (Assuming this is correct) ---
const sliderData = {
    gaming: [
      { id: 'g1', title: 'Next-Gen RPG Mechanics Deep Dive', thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=280&q=80', description: 'Analyzing innovative gameplay loops in upcoming RPGs.' },
      { id: 'g2', title: 'Building the Ultimate Budget PC', thumbnail: 'https://images.unsplash.com/photo-1604304999108-b444d1ae3fc6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=280&q=80', description: 'A step-by-step guide to assembling a powerful yet affordable gaming rig.' },
      { id: 'g3', title: 'Esports Pro Player Analysis', thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=280&q=80', description: 'Breaking down the strategies and techniques of top competitive players.' },
      { id: 'g4', title: 'Hidden Indie Gems You Missed', thumbnail: 'https://images.unsplash.com/photo-1580327374131-06c4d40274e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=280&q=80', description: 'Showcasing under-the-radar indie titles worth playing.' },
    ],
    music: [
       { id: 'm1', title: 'Deconstructing Viral Song Structures', thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=280&q=80', description: 'Analyzing the musical elements that make songs go viral on platforms like TikTok.' },
       { id: 'm2', title: 'AI Music Generation Challenge', thumbnail: 'https://images.unsplash.com/photo-1619983081563-436f63e0229f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=280&q=80', description: 'Can AI create a hit song? Testing different platforms and results.' },
       { id: 'm3', title: 'Live Looping Performance Setup', thumbnail: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=280&q=80', description: 'Guide to gear and techniques for creating compelling live looping performances.' },
    ],
     technology: [
        { id: 't1', title: 'The Future of Wearable Tech', thumbnail: 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=280&q=80', description: 'Exploring upcoming trends and innovations in smartwatches, glasses, and more.' },
        { id: 't2', title: 'Custom Mechanical Keyboard Builds', thumbnail: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=280&q=80', description: 'A satisfying look at building a unique mechanical keyboard from scratch.' },
        { id: 't3', title: 'Comparing Cloud Gaming Services', thumbnail: 'https://images.unsplash.com/photo-1585181804706-7e1c1939ff70?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=280&q=80', description: 'Testing latency, library, and performance of major cloud gaming platforms.' },
    ],
   // Add other categories with relevant image URLs...
};

// --- Simulated API Call (Assuming this is correct) ---
const fetchTrendSuggestions = async (userType, preferences) => {
  console.log("Simulating API Call for:", userType, "with preferences:", preferences);
  await new Promise(resolve => setTimeout(resolve, 1500));
  // Example response structure
  return {
    "Actionable Content Ideas": [
        // ... (Example API response items) ...
      {
        id: 'idea_1', title: `Viral Editing Tricks for ${preferences?.videoStyle || 'Short-Form'}`,
        thumbnail: 'https://images.unsplash.com/photo-1579953100911-7c1c0a43a510?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=130&q=80',
        brief_description: "Master the quick cuts, transitions, and text effects popular on TikTok/Reels/Shorts using accessible tools.",
        unique_selling_points: "Focuses on mobile-first editing, speed, and platform algorithm hacks. Great for beginners.",
        step_by_step_guide: ["Install CapCut/VN Editor", "Practice jump cuts & speed ramps", "Use trending audio effectively", "Create engaging text overlays", "Optimize export settings"],
        required_resources: ["Smartphone", "Free Mobile Editor", "Good Lighting"], trending_analysis: { views: '1M+', likes: '120k+', shares: '8k+' },
        creator_performance_insights: `Similar tutorials by ${preferences?.idealCreator || 'top creators'} emphasize clarity and speed.`,
        pro_tips: ["Hook in 3 secs!", "Use captions.", "Respond to comments."], motivational_quote: "Great edits start with simple cuts."
      },
      // ... more ideas
    ]
  };
};
// --- End Simulated API Call ---


function App() {
  // --- State variables (Assuming these are correct) ---
  const [showSplash, setShowSplash] = useState(true);
  const [currentView, setCurrentView] = useState('splash');
  const [nextView, setNextView] = useState('home');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionType, setTransitionType] = useState('fade-in');
  const [userType, setUserType] = useState(null);
  const [surveyAnswers, setSurveyAnswers] = useState(null);
  const [suggestions, setSuggestions] = useState(null);
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);

  // --- useEffect hooks (Assuming these are correct) ---
  useEffect(() => { // Splash Timer
    const timer = setTimeout(() => {
      setShowSplash(false);
      if (currentView === 'splash') {
           setCurrentView('home');
      }
    }, 3500);
    return () => clearTimeout(timer);
  }, [currentView]);

  useEffect(() => { // Header Scroll Listener
    const handleScroll = () => {
      setIsHeaderScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { // Fetch Suggestions Effect
    // Using existing hook logic
    if (currentView === 'loading' && userType && surveyAnswers) { // Added userType check
       setIsLoading(true); setError(null); setSuggestions(null);
      const getSuggestions = async () => {
        try {
          const data = await fetchTrendSuggestions(userType, surveyAnswers);
          setSuggestions(data);
          handleTransition('results'); // Use transition handler
        } catch (err) {
          console.error("Error fetching suggestions:", err);
          setError(err.message || "Failed");
          handleTransition('error'); // Use transition handler
        } finally {
          setIsLoading(false);
        }
      };
      getSuggestions();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentView, userType, surveyAnswers]); // Added handleTransition to deps if defined outside, but it's better defined with useCallback below

  // --- Navigation Handlers (Using existing logic) ---
  const handleTransition = useCallback((targetView, fadeType = 'fade-out') => {
      setTransitionType(fadeType); setNextView(targetView);
      setIsTransitioning(true); setCurrentView('transitioning');
      const transitionDuration = 350;
      setTimeout(() => {
          setCurrentView(targetView); setIsTransitioning(false);
          window.scrollTo(0, 0);
      }, transitionDuration);
  }, []); // Empty dependency array

  const handleUserTypeSelect = useCallback((type) => { setUserType(type); handleTransition('survey'); }, [handleTransition]);
  const handleSurveySubmit = useCallback((answers) => { setSurveyAnswers(answers); handleTransition('loading'); }, [handleTransition]);
  const handleIdeaClick = useCallback((idea) => { setSelectedIdea(idea); handleTransition('breakdown'); }, [handleTransition]);
  const handleBackToResults = useCallback(() => { setSelectedIdea(null); handleTransition('results'); }, [handleTransition]);
  const handleBackToSurvey = useCallback(() => { handleTransition('survey'); }, [handleTransition]);

  // This is the function we want to pass for the logo click
  const handleBackToHome = useCallback(() => {
      // Reset relevant state when going home
      setUserType(null);
      setSurveyAnswers(null);
      setSuggestions(null);
      setSelectedIdea(null);
      // Optionally reset hover state if it exists (it's not in this provided code)
      // setHoveredCategory(null);
      handleTransition('home'); // Navigate to home
  }, [handleTransition]);

  // --- Render Logic (Using existing logic) ---
  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return (
          <>
            {/* Ensure correct mapping and component usage */}
            {Object.entries(sliderData).map(([key, items]) => (
                <CategorySlider key={key} title={key.charAt(0).toUpperCase() + key.slice(1)} items={items} />
            ))}
            <UserTypeSelector onSelect={handleUserTypeSelect} />
          </>
        );
      case 'survey':
         // Pass userType if your SurveyForm needs it
        return <SurveyForm userType={userType} onSubmit={handleSurveySubmit} onBack={handleBackToHome} />;
      case 'loading':
         return ( <div className="status-container"><div className="loading-spinner"></div><p>Generating your personalized ideas...</p></div> );
      case 'results':
        return suggestions ? <SuggestionsDisplay suggestions={suggestions} onIdeaClick={handleIdeaClick} onBack={handleBackToSurvey} /> : (<div className="status-container"><div className="loading-spinner"></div><p>Loading results...</p></div>);
      case 'breakdown':
        return selectedIdea ? <BreakdownPage idea={selectedIdea} onBack={handleBackToResults} /> : (<div className="status-container"><p>Error: Idea not found.</p><button onClick={handleBackToResults}>Back</button></div>); // Added simple back button
       case 'error':
        return ( <div className="status-container"><p className="error-message">⚠️ Error: {error || 'Unknown Error'}</p><button onClick={handleBackToSurvey} className='survey-button'>Try Survey Again</button> <button onClick={handleBackToHome} className='back-button'>Back Home</button> </div> ); // Added Back Home button
      case 'splash':
      case 'transitioning': // Don't render main content during transition
           default: return null;
    }
  };

  return (
    <>
      {showSplash && <SplashScreen />}
      {/* Ensure the overlay class exists in App.css if used */}
      {/* <div className={`fade-transition-overlay ${isTransitioning ? transitionType : ''}`} /> */}

      <div className="App">
        {/* Pass handleBackToHome to Header as onLogoClick prop */}
        <Header
          isScrolled={isHeaderScrolled}
          onLogoClick={handleBackToHome} // <<< MODIFICATION HERE
        />

        {/* Conditional Rendering Logic based on your original code */}
        { currentView === 'home' ? (
             <main className="app-main-content"> {/* Wrap home view content */}
               {Object.entries(sliderData).map(([key, items]) => (
                  <CategorySlider key={key} title={key.charAt(0).toUpperCase() + key.slice(1)} items={items} />
                ))}
               <UserTypeSelector onSelect={handleUserTypeSelect} />
             </main>
         ) : (
             <main className="app-main-content"> {/* Wrap other views content */}
                 {renderCurrentView()}
             </main>
         )}

        {/* Render other views logic needs refinement - renderCurrentView handles this */}
        {/* Remove the duplicate rendering logic below if renderCurrentView handles all cases */}
        {/* {currentView !== 'home' && (
             <main className="app-main-content">
                {renderCurrentView()}
             </main>
        )} */}

        <Footer /> {/* Ensure Footer is rendered */}
      </div>
    </>
  );
}

export default App;
