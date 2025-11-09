import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Programs from './components/sections/Programs';
import Impact from './components/sections/Impact';
import Photos from './components/sections/Photos';
import OngoingActivities from './components/sections/OngoingActivities';
import Contact from './components/sections/Contact';
import Analytics from './components/pages/Analytics';
import Gallery from './components/pages/Gallery';
import FounderModal from './components/ui/FounderModal';
import { useFounderModal } from './hooks/useFounderModal';
import './lib/i18n'; // Import i18n configuration

function App() {
  const { isModalOpen, closeModal } = useFounderModal();

  return (
    <Router>
      <div className="min-h-screen bg-light-bg">
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
        <Footer />
        <FounderModal isOpen={isModalOpen} onClose={closeModal} />
      </div>
    </Router>
  );
}

// Main page component with hash handling
function MainPage() {
  useEffect(() => {
    const handleHashNavigation = () => {
      const hash = window.location.hash;
      if (hash) {
        // Remove the # and scroll to the element
        const elementId = hash.substring(1);
        const element = document.getElementById(elementId);
        if (element) {
          // Add a small delay to ensure the page is fully loaded
          setTimeout(() => {
            element.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }, 100);
        }
      }
    };

    // Check for hash on component mount
    handleHashNavigation();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashNavigation);
    
    return () => {
      window.removeEventListener('hashchange', handleHashNavigation);
    };
  }, []);

  return (
    <main className="pt-24 md:pt-28">
      <Hero />
      <About />
      <Programs />
      <Impact />
      <Photos />
      <OngoingActivities />
      <Contact />
    </main>
  );
}

export default App
