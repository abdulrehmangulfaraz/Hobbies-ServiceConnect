// src/components/Header.tsx

import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, User, LayoutDashboard } from 'lucide-react'; // Import LayoutDashboard icon

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-20 h-20 flex items-center justify-center">
              <img src="/logo.svg" alt="ServiceConnect Logo" />
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-[#ff00c8] transition-colors">
              Home
            </Link>
            <Link to="/services" className="text-gray-700 hover:text-[#ff00c8] transition-colors">
              Services
            </Link>
            <Link to="/faq" className="text-gray-700 hover:text-[#ff00c8] transition-colors">
              FAQ
            </Link>

            {/* CHANGE: Add a conditional Dashboard link to the main nav */}
            {user && (
              <Link to="/dashboard" className="text-gray-700 hover:text-[#ff00c8] transition-colors flex items-center">
                 <LayoutDashboard className="h-4 w-4 mr-2" />
                Dashboard
              </Link>
            )}
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="hidden sm:flex items-center space-x-2">
                    <User className="h-5 w-5 text-gray-600" />
                    <span className="font-medium">{user.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-[#ff00c8] ">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;