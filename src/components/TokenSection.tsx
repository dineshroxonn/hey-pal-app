import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RevealAnimation } from '@/components/ui/reveal-animation';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import { Coins, ArrowRight, Rocket, Info } from 'lucide-react';

const TokenSection = () => {
  const [showTokenomics, setShowTokenomics] = useState(false);
  const [selectedBenefit, setSelectedBenefit] = useState<number | null>(null);

  const benefits = [
    {
      id: 1,
      icon: '🗳️',
      title: 'Vote for Change',
      description: 'Choose which scandal to expose next',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      id: 2,
      icon: '💰',
      title: 'Earn Rewards',
      description: 'Get tokens for spreading awareness',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 3,
      icon: '🔓',
      title: 'VIP Access',
      description: 'Exclusive behind-the-scenes content',
      color: 'from-blue-500 to-purple-500'
    }
  ];

  const tokenomics = [
    { name: 'Public Sale', percentage: 40, color: 'bg-yellow-400', amount: '16M' },
    { name: 'Team Reserve', percentage: 20, color: 'bg-red-500', amount: '8M' },
    { name: 'Partnerships', percentage: 15, color: 'bg-purple-500', amount: '6M' },
    { name: 'Rewards Pool', percentage: 15, color: 'bg-green-500', amount: '6M' },
    { name: 'Development', percentage: 10, color: 'bg-blue-500', amount: '4M' }
  ];

  return (
    <section id="token" className="py-20 bg-gradient-to-b from-red-950 to-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-400 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <RevealAnimation>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-4">
                <Coins className="w-12 h-12 text-yellow-400" />
                <h2 className="text-4xl md:text-5xl circus-title text-yellow-400">
                  The 40PCT Token
                </h2>
              </div>
              <p className="text-lg text-yellow-200 max-w-2xl mx-auto">
                <span className="text-2xl font-bold">$40PCT</span> - Turning awareness into action! 
                <br />
                <span className="italic text-base">"Your voice, your vote, your token!"</span> 🎪
              </p>
            </div>
          </RevealAnimation>

          {/* Hero Stats */}
          <RevealAnimation delay={200}>
            <div className="bg-gradient-to-r from-red-900/60 to-red-800/60 backdrop-blur-sm border-2 border-yellow-400 rounded-xl p-8 mb-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-yellow-400">₹40</div>
                  <div className="text-yellow-200 text-sm">Token Price<br/><span className="text-xs">(Symbolic value)</span></div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-yellow-400">
                    <AnimatedCounter end={40} suffix="M" />
                  </div>
                  <div className="text-yellow-200 text-sm">Total Supply<br/><span className="text-xs">(Fixed forever)</span></div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-yellow-400">
                    <AnimatedCounter end={40} suffix="%" />
                  </div>
                  <div className="text-yellow-200 text-sm">Locked<br/><span className="text-xs">(For the future)</span></div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-yellow-400">
                    <AnimatedCounter end={14} suffix="K+" />
                  </div>
                  <div className="text-yellow-200 text-sm">Holders<br/><span className="text-xs">(Growing daily)</span></div>
                </div>
              </div>
            </div>
          </RevealAnimation>

          {/* Benefits Grid */}
          <RevealAnimation delay={400}>
            <div className="mb-12">
              <h3 className="text-2xl circus-title text-yellow-400 text-center mb-8">
                What Can You Do With $40PCT?
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {benefits.map((benefit) => (
                  <div
                    key={benefit.id}
                    className={`relative bg-gradient-to-br ${benefit.color} p-[2px] rounded-xl cursor-pointer transform transition-all duration-300 hover:scale-105`}
                    onClick={() => setSelectedBenefit(benefit.id === selectedBenefit ? null : benefit.id)}
                  >
                    <div className="bg-black/90 backdrop-blur-sm rounded-xl p-6 h-full text-center">
                      <div className="text-4xl mb-4">{benefit.icon}</div>
                      <h4 className="text-xl font-bold text-yellow-400 mb-2">{benefit.title}</h4>
                      <p className="text-yellow-200 text-sm">{benefit.description}</p>
                      
                      {selectedBenefit === benefit.id && (
                        <div className="mt-4 pt-4 border-t border-yellow-400/30">
                          <p className="text-yellow-300 text-xs">
                            {benefit.id === 1 && "Democracy meets blockchain - transparent voting on issues!"}
                            {benefit.id === 2 && "Share content, report issues, participate - earn tokens!"}
                            {benefit.id === 3 && "Get early access to investigations and exclusive reports!"}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealAnimation>

          {/* Tokenomics Toggle */}
          <RevealAnimation delay={600}>
            <div className="text-center mb-8">
              <Button
                variant="outline"
                onClick={() => setShowTokenomics(!showTokenomics)}
                className="border-yellow-400 text-yellow-400 hover:bg-yellow-400/20"
              >
                <Info className="w-4 h-4 mr-2" />
                {showTokenomics ? 'Hide' : 'Show'} Token Distribution
              </Button>
            </div>
          </RevealAnimation>

          {/* Tokenomics Visualization */}
          {showTokenomics && (
            <RevealAnimation>
              <div className="bg-gradient-to-r from-red-900/40 to-red-800/40 border border-yellow-400/50 rounded-xl p-6 mb-12">
                <h4 className="text-xl font-bold text-yellow-400 mb-6 text-center">
                  How Tokens Are Distributed 📊
                </h4>
                
                {/* Visual Bar */}
                <div className="h-12 rounded-full overflow-hidden flex mb-6">
                  {tokenomics.map((item, index) => (
                    <div
                      key={index}
                      className={`${item.color} relative group cursor-pointer transition-all duration-300 hover:opacity-80`}
                      style={{ width: `${item.percentage}%` }}
                      title={`${item.name}: ${item.percentage}%`}
                    >
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-black font-bold text-sm">{item.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Legend */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                  {tokenomics.map((item, index) => (
                    <div key={index} className="flex items-center justify-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${item.color}`} />
                      <span className="text-yellow-200 text-sm">{item.name}</span>
                    </div>
                  ))}
                </div>
                
                <p className="text-yellow-400/70 text-xs text-center mt-4">
                  "Fair distribution for maximum impact!" 🎯
                </p>
              </div>
            </RevealAnimation>
          )}

          {/* CTA Section */}
          <RevealAnimation delay={800}>
            <div className="bg-gradient-to-r from-yellow-400/20 to-red-600/20 border-2 border-yellow-400 rounded-xl p-8 text-center">
              <Rocket className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-3xl circus-title text-yellow-400 mb-4">
                Join the Movement Today!
              </h3>
              <p className="text-lg text-yellow-200 mb-6 max-w-2xl mx-auto">
                Be part of the change - turn the 40% corruption rate into 100% transparency!
                <br />
                <span className="text-base italic">"Together we can make a difference!"</span> 🚀
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <Button variant="circus" size="lg" className="text-lg px-8">
                  <Coins className="w-5 h-5 mr-2" />
                  Get $40PCT
                </Button>
                <Button variant="ticket" size="lg" className="text-lg px-8">
                  Learn More
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
              
              <p className="text-yellow-300 text-sm italic">
                "When 40% corruption exists, we made it our mission!" 
                <br />
                - The Great Indian Circus, 2024
              </p>
            </div>
          </RevealAnimation>

          {/* Disclaimer */}
          <RevealAnimation delay={1000}>
            <div className="text-center mt-8">
              <p className="text-yellow-400/60 text-xs max-w-2xl mx-auto">
                <strong>Disclaimer:</strong> $40PCT is a satirical token for awareness purposes. 
                Not financial advice. Always do your own research. 
                Side effects may include: increased political awareness and civic engagement.
              </p>
            </div>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
};

export default TokenSection;