import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

export default function NavBar() {
  const navigate = useNavigate();
  const { logout, token, user } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [avatarDropdownOpen, setAvatarDropdownOpen] = useState(false);

  const links = [
    { name: 'Home', onClick: () => navigate('/Home') },
    { name: 'Requests', onClick: () => navigate('/requests') },
    { name: 'My Connections', onClick: () => navigate('/connections') },
    { name: 'Messages', onClick: () => navigate('/inbox') },
    { name: 'Settings', onClick: () => navigate('/settings') },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">DevMeet</h2>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-6 items-center">
          {links.map((link) => (
            <li
              key={link.name}
              onClick={link.onClick}
              className="cursor-pointer text-gray-700 font-medium hover:underline transition-all"
            >
              {link.name}
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {token ? (
            <div className="relative">
              <button
                onClick={() => setAvatarDropdownOpen(!avatarDropdownOpen)}
                className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center focus:outline-none hover:scale-[1.03] transition-transform cursor-pointer"
              >
                {user.profile_image ? (
                  <img
                    src={`http://localhost:3000${user.profile_image}`}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-blue-600 font-bold text-lg">
                    {user.name?.charAt(0).toUpperCase() || 'U'}
                  </span>
                )}
              </button>

              {avatarDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
                  <button
                    onClick={() => {
                      setAvatarDropdownOpen(false);
                      navigate('/profilepage');
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-800"
                  >
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="hidden md:inline-block bg-black text-white px-4 py-2 rounded-full hover:bg-gray-900"
            >
              Login
            </button>
          )}

          {/* Hamburger for mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-800 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          {links.map((link) => (
            <div
              key={link.name}
              onClick={() => {
                setMenuOpen(false);
                link.onClick();
              }}
              className="cursor-pointer block text-gray-700 hover:text-blue-600"
            >
              {link.name}
            </div>
          ))}
          {token && (
            <div className="pt-2">
              <button
                onClick={handleLogout}
                className=" w-full text-left text-red-600 mt-2 hover:underline "
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}