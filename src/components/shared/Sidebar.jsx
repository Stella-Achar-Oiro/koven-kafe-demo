import { Link, useLocation } from 'react-router-dom';
import { Home, LayoutDashboard, ShoppingCart, X } from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/pos', icon: ShoppingCart, label: 'POS' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-white/80 backdrop-blur-xl
          border-r border-primary/10 shadow-2xl z-50 transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-primary/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3" onClick={onClose}>
              <img
                src="https://i.postimg.cc/dtnKLL4X/kklogo.png"
                alt="Koven Kafe"
                className="h-12 w-auto object-contain"
              />
            </Link>
            <button
              onClick={onClose}
              className="lg:hidden text-accent hover:text-primary transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          <p className="text-xs text-secondary mt-2 font-medium">A Fishy Affair</p>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navItems.map(({ path, icon: Icon, label }) => (
            <Link
              key={path}
              to={path}
              onClick={onClose}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl
                transition-all duration-200 group
                ${isActive(path)
                  ? 'bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg shadow-primary/30'
                  : 'text-accent hover:bg-primary/10 hover:text-primary'
                }
              `}
            >
              <Icon size={20} className={isActive(path) ? '' : 'group-hover:scale-110 transition-transform'} />
              <span className="font-semibold">{label}</span>
            </Link>
          ))}
        </nav>

        {/* User Info Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-primary/10 bg-cream/50">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-highlight text-white flex items-center justify-center font-bold text-sm">
              {location.pathname === '/pos' ? 'JD' : 'AW'}
            </div>
            <div className="flex-1">
              <div className="font-semibold text-accent text-sm">
                {location.pathname === '/pos' ? 'Jane Doe' : 'Dr. Amakove Wala'}
              </div>
              <div className="text-xs text-secondary">
                {location.pathname === '/pos' ? 'Cashier' : 'Owner'}
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
