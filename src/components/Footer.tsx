import { ExternalLink, Twitter, MessageCircle, Github } from 'lucide-react';
import circusLogo from '@/assets/circus-logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-blue-400' },
    { name: 'Telegram', icon: MessageCircle, href: '#', color: 'hover:text-blue-500' },
    { name: 'Discord', icon: ExternalLink, href: '#', color: 'hover:text-purple-400' },
    { name: 'GitHub', icon: Github, href: '#', color: 'hover:text-gray-400' },
  ];

  const quickLinks = [
    { name: 'The Show', href: '#show' },
    { name: 'Ringmasters', href: '#ringmasters' },
    { name: 'Silent Partners', href: '#partners' },
    { name: 'The Audience', href: '#audience' },
    { name: '$40PCT Token', href: '#token' },
  ];

  const legalLinks = [
    { name: 'Disclaimer', href: '#disclaimer' },
    { name: 'Terms of Use', href: '#terms' },
    { name: 'Privacy Policy', href: '#privacy' },
    { name: 'Sources & References', href: '#sources' },
  ];

  return (
    <footer className="bg-gradient-to-t from-black to-red-950 border-t-4 border-yellow-400 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Brand Section */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <img src={circusLogo} alt="The Great Indian Circus" className="w-12 h-12 rounded-full border-2 border-yellow-400" />
                <div>
                  <h3 className="text-xl circus-title text-yellow-400">
                    The Great Indian Circus
                  </h3>
                  <p className="text-yellow-200 text-sm italic">
                    Where Democracy Meets Drama
                  </p>
                </div>
              </div>
              
              <p className="text-yellow-200 mb-6 leading-relaxed">
                A satirical platform dedicated to documenting and entertaining audiences with 
                the ongoing performance of Indian democracy. Every scandal is a sideshow, 
                every promise is a magic trick, and every citizen gets a front-row seat.
              </p>

              <div className="bg-gradient-to-r from-red-900/50 to-red-800/50 border border-yellow-400/50 rounded-lg p-4">
                <p className="text-yellow-200 text-sm">
                  <strong>Data Sources:</strong> All information presented is sourced from public records, 
                  official government documents, Supreme Court judgments, CAG reports, and verified media sources.
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold text-yellow-400 mb-4 uppercase tracking-wide">
                Navigate the Circus
              </h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-yellow-200 hover:text-yellow-400 transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social & Legal */}
            <div>
              <h4 className="text-lg font-bold text-yellow-400 mb-4 uppercase tracking-wide">
                Connect & Legal
              </h4>
              
              {/* Social Links */}
              <div className="flex space-x-4 mb-6">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      className={`text-yellow-200 ${social.color} transition-colors duration-300`}
                      aria-label={social.name}
                    >
                      <IconComponent className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>

              {/* Legal Links */}
              <ul className="space-y-2">
                {legalLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-yellow-200 hover:text-yellow-400 transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Token Info Banner */}
          <div className="bg-gradient-to-r from-yellow-400/20 to-red-600/20 border-2 border-yellow-400 rounded-lg p-6 mb-8 text-center">
            <h4 className="text-xl circus-title text-yellow-400 mb-2">
              $40PCT Token Information
            </h4>
            <p className="text-yellow-200 mb-4">
              Contract Address: <code className="bg-black/50 px-2 py-1 rounded text-sm">40PCT_TOKEN_CONTRACT_ADDRESS</code>
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-red-400 font-bold">Network:</span>
                <span className="text-yellow-200 ml-2">Solana</span>
              </div>
              <div>
                <span className="text-red-400 font-bold">Total Supply:</span>
                <span className="text-yellow-200 ml-2">1T Tokens</span>
              </div>
              <div>
                <span className="text-red-400 font-bold">Launch:</span>
                <span className="text-yellow-200 ml-2">pump.fun</span>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-yellow-400/30 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-yellow-200 text-sm mb-4 md:mb-0">
                © {currentYear} The Great Indian Circus. All rights reserved under satirical license.
              </div>
              
              <div className="flex items-center space-x-4 text-sm">
                <span className="text-gray-400">Made with</span>
                <span className="text-red-400">🎪</span>
                <span className="text-gray-400">and</span>
                <span className="text-yellow-400">₹40PCT</span>
                <span className="text-gray-400">in India</span>
              </div>
            </div>
          </div>

          {/* Final Disclaimer */}
          <div className="mt-8 bg-gray-900/50 border border-gray-600 rounded-lg p-4 text-center">
            <p className="text-gray-300 text-xs leading-relaxed">
              <strong>Important Notice:</strong> This is a satirical platform for entertainment and educational purposes. 
              All content is based on publicly available information and presented with comedic intent. 
              $40PCT is a meme token with no intrinsic value. Cryptocurrency investments carry significant risk. 
              Please conduct your own research and consult financial advisors before making investment decisions. 
              The Great Indian Circus does not provide financial, legal, or investment advice.
            </p>
          </div>
        </div>
      </div>
      
      {/* Decorative Bottom Border */}
      <div className="h-2 bg-gradient-to-r from-yellow-400 via-red-600 via-yellow-400 via-red-600 to-yellow-400 mt-8" />
    </footer>
  );
};

export default Footer;