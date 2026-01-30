import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingCart, BarChart3, CreditCard, Settings, LogOut } from 'lucide-react';

const POSSidebar = () => {
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: ShoppingCart, label: 'Menu Order', path: '/pos', active: true },
    { icon: BarChart3, label: 'Analytics', path: '/dashboard' },
    { icon: CreditCard, label: 'Manage Payment', path: '/pos' },
  ];

  return (
    <div className="w-60 bg-accent text-white flex flex-col h-screen hidden lg:flex">
      {/* Logo Section */}
      <div className="p-6 border-b border-white/10">
        <img
          src="https://i.postimg.cc/dtnKLL4X/kklogo.png"
          alt="Koven Kafe"
          className="h-14 w-auto mb-2 brightness-0 invert"
        />
        <p className="text-sm text-cream/80">A Fishy Affair</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.active || location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-all ${
                isActive
                  ? 'bg-primary text-white shadow-lg'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span className="font-semibold">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center font-bold text-sm">
            JD
          </div>
          <div>
            <p className="font-semibold text-sm">Jane Doe</p>
            <p className="text-xs text-white/60">Cashier</p>
          </div>
        </div>
        <Link
          to="/"
          className="flex items-center gap-2 text-sm text-white/70 hover:text-white w-full py-2"
        >
          <Settings size={18} />
          <span>Settings</span>
        </Link>
        <Link
          to="/"
          className="flex items-center gap-2 text-sm text-white/70 hover:text-white w-full py-2 mt-1"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default POSSidebar;
