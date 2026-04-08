import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { FiShoppingCart, FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/seasonal', label: 'Seasonal' },
  { to: '/exotic', label: 'Exotic' },
  { to: '/boxes', label: 'Boxes' },
  { to: '/about', label: 'About' },
];

export default function Navbar() {
  const { totalItems, setIsOpen } = useCart();
  const { dark, toggle } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-[var(--card-bg)] backdrop-blur-xl border-b border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-2xl font-extrabold text-fl-green dark:text-fl-orange">
            🍊 <span>FreshLux</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(l => (
              <Link
                key={l.to}
                to={l.to}
                className={`px-3 py-1.5 rounded-lg font-medium text-sm transition-colors ${
                  pathname === l.to
                    ? 'bg-fl-green text-white dark:bg-fl-orange'
                    : 'text-[var(--text-secondary)] hover:text-fl-green hover:bg-fl-green/10 dark:hover:text-fl-orange dark:hover:bg-fl-orange/10'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition text-xl"
              aria-label="Toggle dark mode"
            >
              {dark ? <FiSun className="text-yellow-400" /> : <FiMoon className="text-gray-600" />}
            </button>
            <button
              onClick={() => setIsOpen(true)}
              className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              aria-label="Open cart"
            >
              <FiShoppingCart className="text-2xl text-[var(--text-primary)]" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-fl-orange text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              onClick={() => setMenuOpen(o => !o)}
              className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              aria-label="Toggle menu"
            >
              {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-3 flex flex-col gap-1">
            {navLinks.map(l => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setMenuOpen(false)}
                className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                  pathname === l.to
                    ? 'bg-fl-green text-white'
                    : 'text-[var(--text-secondary)] hover:bg-fl-green/10'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
