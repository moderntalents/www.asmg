import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import AffiliatedMembers from './components/AffiliatedMembers';
import LearnMore from './components/LearnMore';
import SportsCategories from './components/SportsCategories';
import Events from './components/Events';
import Gallery from './components/Gallery';
import LiveGate from './components/LiveGate';
import Contact from './components/Contact';
import Footer from './components/Footer';
import MemberStream from './components/MemberStream';

const MEMBER_PATH = '/asmg-member-stream-2026';

function usePath() {
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);
  return path;
}

export function navigate(to: string) {
  window.history.pushState({}, '', to);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

function App() {
  const path = usePath();

  if (path === MEMBER_PATH) {
    return <MemberStream />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <About />
      <SportsCategories />
      <Events />
      <Gallery />
      <LiveGate />
      <Contact />
      <AffiliatedMembers />
      <LearnMore />
      <Footer />
    </div>
  );
}

export default App;
