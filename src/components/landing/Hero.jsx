import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, ShoppingCart } from 'lucide-react';
import Button from '../shared/Button';

const Hero = () => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-gradient-to-br from-primary to-accent text-white py-20 px-4">
      <div className="container mx-auto max-w-6xl text-center">
        <div className="text-6xl md:text-8xl mb-6 animate-bounce">🐟</div>
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
          Koven Kafe POS System
        </h1>
        <p className="text-xl md:text-2xl text-secondary mb-8">
          A Fishy Affair - Simple, Powerful, Multi-Branch Management
        </p>
        <p className="text-lg md:text-xl mb-12 max-w-3xl mx-auto opacity-90">
          Manage all your restaurant branches from one powerful dashboard. 
          Track sales in real-time, manage inventory, and grow your business with confidence.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            onClick={() => navigate('/dashboard')}
            className="bg-white text-primary hover:bg-cream"
          >
            <LayoutDashboard size={24} />
            <span>Owner Dashboard</span>
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate('/pos')}
            className="border-white text-white hover:bg-white hover:text-primary"
          >
            <ShoppingCart size={24} />
            <span>Cashier POS</span>
          </Button>
        </div>
        
        <div className="mt-12 text-sm opacity-75">
          <span className="bg-warning text-accent px-3 py-1 rounded-full font-semibold">
            ⚡ DEMO MODE
          </span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
