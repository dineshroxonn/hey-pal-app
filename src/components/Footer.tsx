import { ExternalLink, Twitter, MessageCircle, Github, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import circusLogo from '@/assets/circus-logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-blue-400' },
    { name: 'Telegram', icon: MessageCircle, href: '#', color: 'hover:text-blue-500' },
    { name: 'GitHub', icon: Github, href: '#', color: 'hover:text-gray-400' },
  ];

  const quickLinks = [
    { name: 'The Show', href: '/#show', internal: true },
    { name: 'Ringmasters', href: '/#ringmasters', internal: true },
    { name: 'Silent Partners', href: '/#partners', internal: true },
    { name: 'The Audience', href: '/#audience', internal: true },
    { name: 'Report Corruption', href: '/report', internal: false },
    { name: 'Sources & Methodology', href: '/sources', internal: false },
  ];

  return (
    <footer className="bg-gradient-to-t from-black to-red-950 border-t-4 border-yellow-400 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <img src={circusLogo} alt="The Great Indian Circus" className="w-12 h-12 rounded-full border-2 border-yellow-400" />
                <div>
                  <h3 className="text-xl circus-title text-yellow-400">The Great Indian Circus</h3>
                  <p className="text-yellow-200 text-sm italic">Satire with receipts.</p>
                </div>
              </div>
              <p className="text-yellow-200 mb-6 leading-relaxed">
                Every scandal is a sideshow. Every promise is a magic trick. Every citizen gets a front-row seat — and a microphone.
                Spot a new act in your city? Pin it on the <Link to="/report" className="underline text-yellow-400">live map</Link>.
              </p>
              <div className="bg-gradient-to-r from-red-900/50 to-red-800/50 border border-yellow-400/50 rounded-lg p-4">
                <p className="text-yellow-200 text-sm">
                  <strong>Data Sources:</strong> ADR, MyNeta, ECI, PRS India, CAG, Supreme Court records, RTI disclosures.
                  Full methodology: <Link to="/sources" className="underline">/sources</Link>.
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold text-yellow-400 mb-4 uppercase tracking-wide">Navigate</h4>
              <ul className="space-y-2 mb-6">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    {link.internal ? (
                      <a href={link.href} className="text-yellow-200 hover:text-yellow-400 transition-colors text-sm">
                        {link.name}
                      </a>
                    ) : (
                      <Link to={link.href} className="text-yellow-200 hover:text-yellow-400 transition-colors text-sm">
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a key={social.name} href={social.href} className={`text-yellow-200 ${social.color} transition-colors`} aria-label={social.name}>
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="border-t border-yellow-400/30 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-3">
              <div className="text-yellow-200 text-sm">
                © {currentYear} The Great Indian Circus. Satirical license.
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span>Made with 🎪 in India</span>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-gray-900/50 border border-gray-600 rounded-lg p-4 text-center">
            <p className="text-gray-300 text-xs leading-relaxed">
              <strong>Important Notice:</strong> Content is satirical commentary based on publicly available information.
              Numbers shown are illustrative until live data sources are wired in. Crowdsourced reports are submitted anonymously by visitors and may be unverified.
              Do not treat as legal evidence. Defamatory or personally accusatory submissions will be removed.
            </p>
          </div>
        </div>
      </div>
      <div className="h-2 bg-gradient-to-r from-yellow-400 via-red-600 to-yellow-400 mt-8" />
    </footer>
  );
};

export default Footer;
