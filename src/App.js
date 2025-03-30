// src/App.js
import React, { useState, useEffect, useCallback } from 'react';
import SplashScreen from './SplashScreen';
import Header from './Header';
import CategorySlider from './CategorySlider';
import UserTypeSelector from './UserTypeSelector';
import SurveyForm from './SurveyForm';
import SuggestionsDisplay from './SuggestionsDisplay';
import BreakdownPage from './BreakdownPage';
import Footer from './Footer'; // Import Footer
import './App.css';

// --- Updated sliderData with Placeholder Image URLs ---
// Replace these with actual relevant image URLs from Unsplash, Pexels, etc.
// Ensure you have the rights to use any images you choose.
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

// --- Simulated API Call (Updated with Image Placeholders) ---
const fetchTrendSuggestions = async (userType, preferences) => {
  console.log("Simulating API Call for:", userType, "with preferences:", preferences);
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Add placeholder image URLs to simulated response
  return {
    "Actionable Content Ideas": [
      {
        id: 'idea_1', title: `Viral Editing Tricks for ${preferences?.videoStyle || 'Short-Form'}`,
        thumbnail: 'https://images.unsplash.com/photo-1579953100911-7c1c0a43a510?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=130&q=80', // Example
        brief_description: "Master the quick cuts, transitions, and text effects popular on TikTok/Reels/Shorts using accessible tools.",
        unique_selling_points: "Focuses on mobile-first editing, speed, and platform algorithm hacks. Great for beginners.",
        step_by_step_guide: ["Install CapCut/VN Editor", "Practice jump cuts & speed ramps", "Use trending audio effectively", "Create engaging text overlays", "Optimize export settings"],
        required_resources: ["Smartphone", "Free Mobile Editor", "Good Lighting"], trending_analysis: { views: '1M+', likes: '120k+', shares: '8k+' },
        creator_performance_insights: `Similar tutorials by ${preferences?.idealCreator || 'top creators'} emphasize clarity and speed.`,
        pro_tips: ["Hook in 3 secs!", "Use captions.", "Respond to comments."], motivational_quote: "Great edits start with simple cuts."
      },
      {
        id: 'idea_2', title: `Budget ${preferences?.niche || 'Gaming'} Setup Tour ($${preferences?.budget?.match(/\d+/g)?.[0] || '500'} Limit)`,
        thumbnail: 'https://images.unsplash.com/photo-1598057076890-700f05079565?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=130&q=80', // Example
        brief_description: "Showcase an impressive yet affordable setup focusing on value for money within a specific budget.",
        unique_selling_points: "Relatable for viewers with limited budgets, practical advice, potential for affiliate links.",
        step_by_step_guide: ["Define budget & core components", "Research best value parts/peripherals", "Show assembly/setup process", "Demonstrate performance", "Provide links & cost breakdown"],
        required_resources: ["Camera", "Microphone", "PC Components (or examples)", "Editing Software"], trending_analysis: { views: '800k+', likes: '45k+', shares: '3k+' },
        creator_performance_insights: `${preferences?.idealCreator || 'Creators'} often find success by being transparent about costs and performance trade-offs.`,
        pro_tips: ["Focus on price-to-performance.", "Show actual gameplay/usage.", "Offer upgrade paths."], motivational_quote: "Creativity thrives within constraints."
      },
       {
        id: 'idea_3', title: "Explaining [Complex Topic] with Analogies",
        thumbnail: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=130&q=80', // Example
        brief_description: "Break down a challenging concept from your niche (e.g., AI, Quantum Physics, Music Theory) using relatable analogies and simple visuals.",
        unique_selling_points: "High value content, establishes expertise, great for SEO, caters to curious audiences.",
        step_by_step_guide: ["Identify the core concept", "Brainstorm 3-5 strong analogies", "Script the explanation clearly", "Create simple supporting visuals (whiteboard/animation)", "Summarize key takeaways"],
        required_resources: ["Camera/Screen Recorder", "Microphone", "Whiteboard or Animation Tool", "Editing Software"], trending_analysis: { views: 'Varies Highly', likes: 'High Ratio', shares: 'Moderate' },
        creator_performance_insights: `Clarity and engaging analogies are key. ${preferences?.idealCreator || 'Experts'} use pauses and visual aids effectively.`,
        pro_tips: ["Test analogies on friends first.", "Keep it concise.", "Encourage questions in comments."], motivational_quote: "Simplicity is the ultimate sophistication."
      },
       {
        id: 'idea_4', title: "Travel Vlog: 24 Hours in [Nearby City/Area]",
        thumbnail: 'https://images.unsplash.com/photo-1503220718398-8ae1a1b7c67d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=130&q=80', // Example
        brief_description: "Showcase the highlights and hidden gems of a nearby location within a single day, focusing on experiences over luxury.",
        unique_selling_points: "Achievable travel content, highlights local culture, encourages exploration, works for various budgets.",
        step_by_step_guide: ["Research key spots & food", "Plan a rough itinerary", "Vlog activities throughout the day", "Capture establishing shots & B-roll", "Edit into a compelling narrative (morning/afternoon/night)"],
        required_resources: ["Camera (Smartphone OK)", "Microphone (Optional but recommended)", "Basic Editing"], trending_analysis: { views: '100k - 1M+', likes: '10k+', shares: '1k+' },
        creator_performance_insights: `High energy and showcasing unique local experiences resonate well. ${preferences?.idealCreator || 'Travel vloggers'} often use maps and upbeat music.`,
        pro_tips: ["Interact with locals.", "Show prices for budget transparency.", "End with a recommendation/summary."], motivational_quote: "Adventure is found just around the corner."
      },
       {
        id: 'idea_5', title: "Trying Viral Health/Fitness Trends (Myth vs. Fact)",
        thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=130&q=80', // Example
        brief_description: "Attempt a popular health or fitness trend seen online (e.g., specific diet, workout challenge) and discuss its validity or effectiveness.",
        unique_selling_points: "Taps into trending topics, offers informational value (debunking), relatable struggle/results.",
        step_by_step_guide: ["Identify a safe & relevant trend", "Research the claims/science behind it", "Document your attempt over a set period", "Share honest results & feelings", "Provide evidence-based conclusions"],
        required_resources: ["Camera", "Relevant props for the trend", "Basic Editing"], trending_analysis: { views: '300k - 1.5M+', likes: '30k+', shares: '4k+' },
        creator_performance_insights: `Honesty and providing factual context are crucial. ${preferences?.idealCreator || 'Fitness creators'} often include disclaimers.`,
        pro_tips: ["Consult professionals if needed.", "Be transparent about difficulties.", "Cite sources for claims."], motivational_quote: "Health is an investment, not an expense... usually."
      },
    ]
  };
};
// --- End Simulated API Call ---


function App() {
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

  // Splash screen timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      if (currentView === 'splash') {
           setCurrentView('home');
      }
    }, 3500);
    return () => clearTimeout(timer);
  }, [currentView]);

  // Header Scroll Listener
  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  // Fetch suggestions effect
  useEffect(() => {
    if (currentView === 'loading' && surveyAnswers) {
       setIsLoading(true); setError(null); setSuggestions(null);
      const getSuggestions = async () => {
        try {
          const data = await fetchTrendSuggestions(userType, surveyAnswers);
          setSuggestions(data); handleTransition('results');
        } catch (err) {
          console.error("Error fetching suggestions:", err); setError(err.message || "Failed"); handleTransition('error');
        } finally { setIsLoading(false); }
      };
      getSuggestions();
    }
  }, [currentView, userType, surveyAnswers]);

  // --- Navigation Handlers with Transitions ---
  const handleTransition = useCallback((targetView, fadeType = 'fade-out') => {
      setTransitionType(fadeType); setNextView(targetView);
      setIsTransitioning(true); setCurrentView('transitioning');
      const transitionDuration = 350;
      setTimeout(() => {
          setCurrentView(targetView); setIsTransitioning(false);
          window.scrollTo(0, 0);
      }, transitionDuration);
  }, []);

  const handleUserTypeSelect = useCallback((type) => { setUserType(type); handleTransition('survey'); }, [handleTransition]);
  const handleSurveySubmit = useCallback((answers) => { setSurveyAnswers(answers); handleTransition('loading'); }, [handleTransition]);
  const handleIdeaClick = useCallback((idea) => { setSelectedIdea(idea); handleTransition('breakdown'); }, [handleTransition]);
  const handleBackToResults = useCallback(() => { setSelectedIdea(null); handleTransition('results'); }, [handleTransition]);
  const handleBackToSurvey = useCallback(() => { handleTransition('survey'); }, [handleTransition]);
  const handleBackToHome = useCallback(() => { handleTransition('home'); }, [handleTransition]);

  // --- Render Logic ---
  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return (
          <>
            {Object.entries(sliderData).map(([key, items]) => (
                <CategorySlider key={key} title={key.charAt(0).toUpperCase() + key.slice(1)} items={items} />
            ))}
            <UserTypeSelector onSelect={handleUserTypeSelect} />
          </>
        );
      case 'survey':
        return <SurveyForm onSubmit={handleSurveySubmit} onBack={handleBackToHome} />;
      case 'loading':
         return ( <div className="status-container"><div className="loading-spinner"></div><p>Generating your personalized ideas...</p></div> );
      case 'results':
        return suggestions ? <SuggestionsDisplay suggestions={suggestions} onIdeaClick={handleIdeaClick} onBack={handleBackToSurvey} /> : (<div className="status-container"><div className="loading-spinner"></div><p>Loading results...</p></div>);
      case 'breakdown':
        return selectedIdea ? <BreakdownPage idea={selectedIdea} onBack={handleBackToResults} /> : (<div className="status-container"><p>Error: Idea not found.</p><button onClick={handleBackToResults}>Back</button></div>);
       case 'error':
        return ( <div className="status-container"><p className="error-message">⚠️ Error: {error}</p><button onClick={handleBackToSurvey} className='survey-button'>Try Survey Again</button></div> );
      case 'splash': default: return null;
    }
  };

  return (
    <>
      {showSplash && <SplashScreen />}
      <div className={`fade-transition-overlay ${isTransitioning ? transitionType : ''}`} />

      <div className="App">
        <Header isScrolled={isHeaderScrolled} />

         {/* Render Sliders and Selector only on home view */}
         { currentView === 'home' && (
             <>
               {Object.entries(sliderData).map(([key, items]) => (
                  <CategorySlider key={key} title={key.charAt(0).toUpperCase() + key.slice(1)} items={items} />
                ))}
               <UserTypeSelector onSelect={handleUserTypeSelect} />
             </>
         )}

        {/* Render other views */}
        {currentView !== 'home' && renderCurrentView()}

        <Footer /> {/* Add Footer */}
      </div>
    </>
  );
}

export default App;