import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useScrollPosition } from '@/hooks/use-scroll-position';
import { cn } from '@/lib/utils';
import circusLogo from '@/assets/circus-logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScrollPosition();
  const [isPressed, setIsPressed] = useState<string | null>(null);

  const navItems = [
    { name: 'The Show', href: '#show' },
    { name: 'Ringmasters', href: '#ringmasters' },
    { name: 'Silent Partners', href: '#partners' },
    { name: 'The Audience', href: '#audience' },
    { name: '$40PCT Token', href: '#token' },
  ];

  const handleButtonPress = (buttonId: string) => {
    setIsPressed(buttonId);
    setTimeout(() => setIsPressed(null), 150);
  };

  const isScrolled = scrollY > 100;
  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-out shadow-lg",
      isScrolled 
        ? "bg-gradient-to-r from-red-900/95 via-red-800/95 to-red-900/95 backdrop-blur-md border-b-2 border-yellow-400/80 h-14" 
        : "bg-gradient-to-r from-red-900 via-red-800 to-red-900 border-b-4 border-yellow-400 h-16"
    )}>
      <div className="container mx-auto px-4">
        <div className={cn(
          "flex items-center justify-between transition-all duration-300",
          isScrolled ? "h-14" : "h-16"
        )}>
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src={circusLogo} 
              alt="The Great Indian Circus" 
              className={cn(
                "rounded-full border-2 border-yellow-400 transition-all duration-300",
                isScrolled ? "w-8 h-8" : "w-10 h-10"
              )} 
            />
            <div className={cn(
              "text-yellow-400 font-bold uppercase tracking-wide transition-all duration-300",
              isScrolled ? "text-base" : "text-lg"
            )}>
              The Great Indian Circus
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="nav-link text-yellow-300 hover:text-yellow-400 transition-colors duration-300 font-medium uppercase tracking-wide text-sm"
              >
                {item.name}
              </a>
            ))}
            <Button 
              variant="ticket" 
              size="sm"
              className={cn(
                "transition-all duration-150",
                isPressed === 'buy-tickets' && "animate-button-press"
              )}
              onClick={() => handleButtonPress('buy-tickets')}
            >
              Buy Tickets
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-yellow-400 hover:text-yellow-300 transition-all duration-300 hover:scale-110"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={cn(
          "md:hidden border-t border-yellow-400/30 transition-all duration-300 ease-out overflow-hidden",
          isMenuOpen ? "max-h-96 py-4 opacity-100" : "max-h-0 py-0 opacity-0"
        )}>
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-yellow-300 hover:text-yellow-400 transition-all duration-300 font-medium uppercase tracking-wide text-sm py-2 hover:translate-x-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-2">
                <Button 
                  variant="ticket" 
                  size="sm" 
                  className={cn(
                    "w-full transition-all duration-150",
                    isPressed === 'mobile-buy-tickets' && "animate-button-press"
                  )}
                  onClick={() => {
                    handleButtonPress('mobile-buy-tickets');
                    setIsMenuOpen(false);
                  }}
                >
                  Buy Tickets
                </Button>
              </div>
            </nav>
        </div>
      </div>

      {/* Decorative Border */}
      <div className={cn(
        "bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 animate-pulse transition-all duration-300",
        isScrolled ? "h-0.5" : "h-1"
      )} />
    </header>
  );
};

export default Header;