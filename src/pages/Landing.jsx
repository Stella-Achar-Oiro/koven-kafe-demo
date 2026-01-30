import React from 'react';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';

const Landing = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <footer className="bg-accent text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <p className="text-secondary mb-2">© 2026 Koven Kafe POS System</p>
          <p className="text-sm opacity-75">Built by Evarest Technologies Ltd</p>
          <p className="text-xs mt-4 opacity-50">Demo Mode - Sample Data Only</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
