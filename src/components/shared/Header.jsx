import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, LayoutDashboard, ShoppingCart } from 'lucide-react';

const Header = ({ userName, userRole }) => {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="text-2xl">🐟</div>
            <div>
              <div className="font-display font-bold text-primary text-lg">Koven Kafe</div>
              <div className="text-xs text-secondary">A Fishy Affair</div>
            </div>
          </Link>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                isActive('/') ? 'bg-primary text-white' : 'text-accent hover:bg-primary/10'
              }`}
            >
              <Home size={18} />
              <span>Home</span>
            </Link>
            <Link
              to="/dashboard"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                isActive('/dashboard') ? 'bg-primary text-white' : 'text-accent hover:bg-primary/10'
              }`}
            >
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/pos"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                isActive('/pos') ? 'bg-primary text-white' : 'text-accent hover:bg-primary/10'
              }`}
            >
              <ShoppingCart size={18} />
              <span>POS</span>
            </Link>
          </nav>
          
          {/* User Info */}
          {userName && (
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <div className="font-semibold text-accent">{userName}</div>
                <div className="text-xs text-gray-600">{userRole}</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                {userName.charAt(0)}
              </div>
            </div>
          )}
        </div>
        
        {/* Mobile Navigation */}
        <nav className="md:hidden flex items-center justify-around py-2 border-t">
          <Link
            to="/"
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
              isActive('/') ? 'text-primary' : 'text-gray-600'
            }`}
          >
            <Home size={20} />
            <span className="text-xs">Home</span>
          </Link>
          <Link
            to="/dashboard"
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
              isActive('/dashboard') ? 'text-primary' : 'text-gray-600'
            }`}
          >
            <LayoutDashboard size={20} />
            <span className="text-xs">Dashboard</span>
          </Link>
          <Link
            to="/pos"
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
              isActive('/pos') ? 'text-primary' : 'text-gray-600'
            }`}
          >
            <ShoppingCart size={20} />
            <span className="text-xs">POS</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
