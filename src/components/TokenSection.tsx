import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Coins, TrendingUp, Users, Zap, ExternalLink, Copy, CheckCircle } from 'lucide-react';

const TokenSection = () => {
  const [copied, setCopied] = useState(false);
  
  const contractAddress = "40PCT_TOKEN_CONTRACT_ADDRESS";

  const handleCopy = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tokenomics = [
    {
      title: 'Total Supply',
      value: '1,000,000,000,000',
      description: 'One trillion tokens for 1.4 billion citizens',
      icon: Coins
    },
    {
      title: 'Fair Launch',
      value: '100%',
      description: 'No presale, no team allocation, pure democracy',
      icon: Users
    },
    {
      title: 'Transaction Tax',
      value: '1%',
      description: 'Split between burns and circus operations',
      icon: TrendingUp
    },
    {
      title: 'Scandal Burns',
      value: 'Daily',
      description: 'Tokens burned based on real corruption news',
      icon: Zap
    }
  ];

  const burnEvents = [
    {
      date: '2024-01-15',
      event: 'Electoral Bond Reveal',
      amount: '₹15L Cr equivalent burn',
      tokens: '15,000,000,000 $40PCT'
    },
    {
      date: '2024-02-03',
      event: 'Coal Scam Update',
      amount: '₹1.86L Cr equivalent burn',
      tokens: '1,860,000,000 $40PCT'
    },
    {
      date: '2024-02-20',
      event: 'Liquor Policy Drama',
      amount: '₹8,000 Cr equivalent burn',
      tokens: '800,000,000 $40PCT'
    }
  ];

  return (
    <section id="token" className="py-20 bg-gradient-to-b from-red-950 to-black relative">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl circus-title text-yellow-400 mb-6">
              Your Ticket to the Show
            </h2>
            <div className="text-6xl md:text-7xl circus-title text-red-500 mb-6">
              $40PCT TOKEN
            </div>
            <p className="text-xl text-yellow-200 max-w-4xl mx-auto leading-relaxed">
              The official currency of The Great Indian Circus. Every token represents a front-row seat 
              to democracy in action, with deflationary mechanics tied to real-world corruption events.
            </p>
          </div>

          {/* Token Contract */}
          <div className="bg-gradient-to-r from-yellow-400/20 to-red-600/20 border-2 border-yellow-400 rounded-lg p-6 mb-12 text-center">
            <h3 className="text-2xl circus-title text-yellow-400 mb-4">
              Contract Address (Solana)
            </h3>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <code className="bg-black/50 px-4 py-2 rounded font-mono text-yellow-200 text-sm md:text-base">
                {contractAddress}
              </code>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="flex items-center gap-2"
              >
                {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </div>
          </div>

          {/* Tokenomics */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {tokenomics.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="bg-gradient-to-b from-yellow-400/10 to-red-600/10 border-2 border-yellow-400/50 rounded-lg p-6 text-center hover:scale-105 transition-transform duration-300">
                  <IconComponent className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-yellow-400 mb-2">{item.title}</h3>
                  <div className="text-2xl font-bold text-red-400 mb-2">{item.value}</div>
                  <p className="text-yellow-200 text-sm">{item.description}</p>
                </div>
              );
            })}
          </div>

          {/* The Scandal Burn Mechanism */}
          <div className="bg-gradient-to-r from-red-900/40 to-red-800/40 border-2 border-yellow-400/50 rounded-lg p-8 mb-16">
            <h3 className="text-3xl circus-title text-yellow-400 mb-6 text-center">
              The Scandal Burn Mechanism
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-2xl font-bold text-yellow-400 mb-4">How It Works</h4>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <span className="text-red-400 font-bold mr-3">1.</span>
                    <p className="text-yellow-200">Major corruption news breaks in mainstream media</p>
                  </div>
                  <div className="flex items-start">
                    <span className="text-red-400 font-bold mr-3">2.</span>
                    <p className="text-yellow-200">Our team verifies the story and calculates the scam amount</p>
                  </div>
                  <div className="flex items-start">
                    <span className="text-red-400 font-bold mr-3">3.</span>
                    <p className="text-yellow-200">Equivalent $40PCT tokens are burned from the treasury</p>
                  </div>
                  <div className="flex items-start">
                    <span className="text-red-400 font-bold mr-3">4.</span>
                    <p className="text-yellow-200">Community is notified and burn is recorded on-chain</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-2xl font-bold text-yellow-400 mb-4">Recent Burns</h4>
                <div className="space-y-4">
                  {burnEvents.map((burn, index) => (
                    <div key={index} className="bg-black/30 border border-yellow-400/30 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-yellow-400 font-bold">{burn.date}</span>
                        <span className="text-red-400 text-sm">{burn.tokens}</span>
                      </div>
                      <p className="text-yellow-200 font-medium mb-1">{burn.event}</p>
                      <p className="text-gray-400 text-sm">{burn.amount}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Buy Section */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-b from-yellow-400/20 to-red-600/20 border-2 border-yellow-400 rounded-lg p-8">
              <h3 className="text-2xl circus-title text-yellow-400 mb-6">
                Get Your Tickets
              </h3>
              <div className="space-y-4 mb-6">
                <p className="text-yellow-200">
                  Ready to join the circus? Purchase $40PCT tokens and become part of 
                  the most transparent corruption-tracking community in India.
                </p>
                <div className="bg-red-900/50 border border-red-400 rounded-lg p-4">
                  <p className="text-yellow-200 text-sm">
                    <strong>Current Phase:</strong> Fair Launch on pump.fun<br/>
                    <strong>Goal:</strong> Reach Raydium for full decentralization<br/>
                    <strong>Community Target:</strong> 10,000 token holders
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <Button variant="ticket" size="lg" className="w-full">
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Buy on pump.fun
                </Button>
                <Button variant="outline" size="lg" className="w-full">
                  View Chart & Analytics
                </Button>
              </div>
            </div>

            <div className="bg-gradient-to-b from-yellow-400/20 to-red-600/20 border-2 border-yellow-400 rounded-lg p-8">
              <h3 className="text-2xl circus-title text-yellow-400 mb-6">
                Join the Community
              </h3>
              <div className="space-y-4 mb-6">
                <p className="text-yellow-200">
                  Connect with fellow circus enthusiasts, get real-time burn notifications, 
                  and participate in the ongoing democratic commentary.
                </p>
                <div className="bg-red-900/50 border border-red-400 rounded-lg p-4">
                  <p className="text-yellow-200 text-sm">
                    <strong>Telegram:</strong> Daily burn updates & community discussions<br/>
                    <strong>Twitter:</strong> Breaking news and absurdity alerts<br/>
                    <strong>Discord:</strong> Deep dives into corruption analysis
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <Button variant="circus" size="lg" className="w-full">
                  Join Telegram
                </Button>
                <Button variant="outline" size="lg" className="w-full">
                  Follow Twitter
                </Button>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-16 bg-gradient-to-r from-gray-800/50 to-gray-700/50 border border-gray-600 rounded-lg p-6 text-center">
            <p className="text-gray-300 text-sm">
              <strong>Disclaimer:</strong> $40PCT is a meme token for satirical purposes. This is not financial advice. 
              Cryptocurrency investments are highly volatile and risky. Only invest what you can afford to lose. 
              All corruption data is sourced from public records and media reports. 
              The Great Indian Circus is a satirical platform and does not promote or endorse any illegal activities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TokenSection;
