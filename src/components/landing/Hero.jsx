import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, ShoppingCart } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();
  
  return (
    <div className="relative bg-accent py-24 px-4 overflow-hidden">
      {/* Solid dark background for maximum contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent via-accent to-primary"></div>

      <div className="container mx-auto max-w-6xl text-center relative z-10">
        <div className="bg-white rounded-3xl p-6 inline-block mb-8 shadow-2xl">
          <img
            src="https://i.postimg.cc/dtnKLL4X/kklogo.png"
            alt="Koven Kafe Logo"
            className="h-32 md:h-40 w-auto object-contain"
          />
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 text-white">
          Koven Kafe POS System
        </h1>
        <p className="text-xl md:text-3xl text-white font-semibold mb-8">
          A Fishy Affair - Simple, Powerful, Multi-Branch Management
        </p>
        <p className="text-base md:text-xl mb-12 max-w-3xl mx-auto text-white/90 leading-relaxed">
          Manage all your restaurant branches from one powerful dashboard.
          Track sales in real-time, manage inventory, and grow your business with confidence.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-white text-accent hover:bg-cream hover:shadow-2xl hover:scale-105 font-bold px-8 py-4 text-lg rounded-xl shadow-lg flex items-center gap-3 transition-all active:scale-95"
          >
            <LayoutDashboard size={26} />
            <span>Owner Dashboard</span>
          </button>
          <button
            onClick={() => navigate('/pos')}
            className="bg-accent text-white hover:bg-accent/90 hover:shadow-2xl hover:scale-105 font-bold px-8 py-4 text-lg rounded-xl shadow-lg flex items-center gap-3 transition-all active:scale-95"
          >
            <ShoppingCart size={26} />
            <span>Cashier POS</span>
          </button>
        </div>

        <div className="mt-12">
          <span className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full font-bold border border-white/30 text-sm">
            DEMO MODE
          </span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
