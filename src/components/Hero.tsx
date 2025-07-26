import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import { RevealAnimation } from '@/components/ui/reveal-animation';
import { Play, TrendingUp, Users, Zap } from 'lucide-react';

const Hero = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPressed, setIsPressed] = useState<string | null>(null);

  const stats = [
    { icon: TrendingUp, label: 'Official Rate', value: 'Corruption Index', counter: 40, suffix: '%' },
    { icon: Users, label: 'Total Audience', value: '1.4B Citizens', counter: 1.4, suffix: 'B' },
    { icon: Zap, label: '₹40PCT Token', value: 'Your Voice', counter: 40, suffix: 'PCT' },
  ];

  const handleButtonPress = (buttonId: string) => {
    setIsPressed(buttonId);
    setTimeout(() => setIsPressed(null), 150);
  };

  return (
    <section id="show" className="min-h-screen bg-gradient-to-b from-black via-red-950 to-black relative overflow-hidden pt-20 circus-cursor">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          {/* Main Title */}
          <RevealAnimation delay={200}>
            <div className="mb-12">
              <h1 className="text-6xl md:text-8xl lg:text-9xl circus-title text-yellow-400 mb-6 leading-tight">
                Welcome to
                <span className="block text-red-500 mt-2">India's Biggest</span>
                <span className="block text-yellow-400 mt-2">Political Circus! 🎪</span>
              </h1>
              <p className="text-xl md:text-2xl circus-subtitle text-yellow-200 max-w-4xl mx-auto leading-relaxed">
                Where every <span className="text-red-400 font-bold">promise is a performance</span>, 
                every <span className="text-yellow-400 font-bold">speech is a show</span>, 
                and every election is a <span className="text-red-400 font-bold">blockbuster event</span>! 
                <br />
                <span className="text-lg italic">"Same story, different actors" - Every Election Ever</span>
              </p>
            </div>
          </RevealAnimation>

          {/* Key Message */}
          <RevealAnimation delay={400}>
            <div className="bg-gradient-to-r from-red-900/80 to-red-800/80 border-4 border-yellow-400 rounded-lg p-8 mb-12 backdrop-blur-sm animate-gentle-pulse">
              <h2 className="text-3xl md:text-4xl circus-title text-yellow-400 mb-4 animate-subtle-glow">
                "40% Corruption Rate - Officially Certified!"
              </h2>
              <p className="text-lg md:text-xl text-yellow-200 italic">
                And that's just what they admit! 😉
                <br />
                <span className="text-base">Source: Public Records + Common Sense</span>
              </p>
            </div>
          </RevealAnimation>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <RevealAnimation key={index} delay={600 + index * 100}>
                  <div className="bg-gradient-to-b from-yellow-400/20 to-red-600/20 border-2 border-yellow-400/50 rounded-lg p-6 backdrop-blur-sm hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/20">
                    <IconComponent className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                    <div className="text-2xl font-bold text-yellow-400 mb-2">
                      {stat.counter ? (
                        <AnimatedCounter end={stat.counter} suffix={stat.suffix} />
                      ) : (
                        stat.value
                      )}
                    </div>
                    <div className="text-yellow-200 font-medium uppercase tracking-wide">{stat.label}</div>
                  </div>
                </RevealAnimation>
              );
            })}
          </div>

          {/* Call to Action */}
          <RevealAnimation delay={1000}>
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button 
                  variant="circus" 
                  size="lg" 
                  className={`text-lg px-8 py-4 transition-all duration-150 ${
                    isPressed === 'enter-circus' ? 'animate-button-press' : ''
                  }`}
                  onClick={() => {
                    handleButtonPress('enter-circus');
                    setIsPlaying(!isPlaying);
                  }}
                >
                  <Play className="w-6 h-6 mr-2" />
                  Watch the Show!
                </Button>
                <Button 
                  variant="ticket" 
                  size="lg" 
                  className={`text-lg px-8 py-4 transition-all duration-150 ${
                    isPressed === 'buy-tokens' ? 'animate-button-press' : ''
                  }`}
                  onClick={() => handleButtonPress('buy-tokens')}
                >
                  Get ₹40PCT Tokens
                </Button>
              </div>
              
              <p className="text-yellow-300 text-sm max-w-2xl mx-auto">
                <strong>Disclaimer:</strong> This is a satirical platform. We make fun of the system, not the people. 
                <br />
                Side effects may include: Increased awareness, uncontrollable laughter, and a desire for better governance.
              </p>
            </div>
          </RevealAnimation>

          {/* Meme-worthy one-liners */}
          <RevealAnimation delay={1200}>
            <div className="mt-12 space-y-2 text-yellow-400/70 text-sm">
              <p>"Politicians change, promises remain the same" 🔄</p>
              <p>"Election season = Entertainment season" 🎭</p>
              <p>"Your vote matters... until the next scandal" 🗳️</p>
            </div>
          </RevealAnimation>
        </div>
      </div>

      {/* Decorative Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-r from-yellow-400 via-red-600 to-yellow-400 opacity-80" />
    </section>
  );
};

export default Hero;