import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Layout from './components/Layout';
import Hero from './components/Hero';
import FeaturedPlayer from './components/FeaturedPlayer';
import PlayerGrid from './components/PlayerGrid';
import AboutRankings from './components/AboutRankings';
import StatsVisualization from './components/StatsVisualization';
import PlayerComparison from './components/PlayerComparison';

function App() {
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  return (
    <Layout activeFilter={activeFilter} onFilterChange={setActiveFilter}>
      <Hero />
      <div className="container py-16 -mt-20 relative z-20">
        {/* Featured Player Section */}
        <div className="mb-24">
          <FeaturedPlayer filter={activeFilter} />
        </div>

        {/* Player Grid Section */}
        <div className="mb-24">
          <PlayerGrid filter={activeFilter} />
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#ffd700]/30 to-transparent my-16"></div>

        {/* Stats Visualization Section */}
        <div className="mb-24">
          <StatsVisualization />
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#ff6b35]/30 to-transparent my-16"></div>

        {/* Player Comparison Section */}
        <div className="mb-24">
          <PlayerComparison />
        </div>

        {/* Final Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#e94560]/30 to-transparent my-16"></div>

        {/* About Rankings Section */}
        <div>
          <AboutRankings />
        </div>
      </div>
    </Layout>
  );
}

export default App;
