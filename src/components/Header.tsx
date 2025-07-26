import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import circusLogo from '@/assets/circus-logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'The Show', href: '#show' },
    { name: 'Ringmasters', href: '#ringmasters' },
    { name: 'Silent Partners', href: '#partners' },
    { name: 'The Audience', href: '#audience' },
    { name: '$40PCT Token', href: '#token' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-red-900 via-red-800 to-red-900 border-b-4 border-yellow-400 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img src={circusLogo} alt="The Great Indian Circus" className="w-10 h-10 rounded-full border-2 border-yellow-400" />
            <div className="text-yellow-400 font-bold text-lg uppercase tracking-wide">
              The Great Indian Circus
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-yellow-300 hover:text-yellow-400 transition-colors duration-300 font-medium uppercase tracking-wide text-sm"
              >
                {item.name}
              </a>
            ))}
            <Button variant="ticket" size="sm">
              Buy Tickets
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-yellow-400 hover:text-yellow-300 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-yellow-400/30">
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-yellow-300 hover:text-yellow-400 transition-colors duration-300 font-medium uppercase tracking-wide text-sm py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-2">
                <Button variant="ticket" size="sm" className="w-full">
                  Buy Tickets
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>

      {/* Decorative Border */}
      <div className="h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 animate-pulse" />
    </header>
  );
};

export default Header;