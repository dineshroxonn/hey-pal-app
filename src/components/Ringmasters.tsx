import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RevealAnimation } from '@/components/ui/reveal-animation';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import { TrendingUp, AlertCircle, ChevronRight, X } from 'lucide-react';

const Ringmasters = () => {
  const [selectedPerformer, setSelectedPerformer] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const topPerformers = [
    {
      id: 1,
      name: 'The Promise Master',
      title: 'Expert in Election Magic',
      amount: '₹15L Cr',
      achievement: 'Made transparency disappear!',
      details: {
        scandal: 'Electoral Bonds - Anonymous Donations',
        period: '2014-2024 (Still Running)',
        impact: 'Democracy becomes pay-to-play',
        source: 'Supreme Court Records'
      },
      icon: '🎩',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      id: 2,
      name: 'The Land Wizard',
      title: 'Real Estate Magic Show',
      amount: '₹1.76L Cr',
      achievement: 'Turned farms into goldmines!',
      details: {
        scandal: 'Land Acquisition Mysteries',
        period: '2010-Present (Ongoing)',
        impact: 'Farmers lose, builders win',
        source: 'RTI Applications'
      },
      icon: '🏗️',
      color: 'from-red-500 to-pink-500'
    },
    {
      id: 3,
      name: 'The Mining Maestro',
      title: 'Natural Resource Juggler',
      amount: '₹5.68L Cr',
      achievement: 'Made forests vanish overnight!',
      details: {
        scandal: 'Coal & Mining Allocation',
        period: '2004-Present (Family Business)',
        impact: 'Environment pays the price',
        source: 'CAG Audit Reports'
      },
      icon: '⛏️',
      color: 'from-purple-500 to-indigo-500'
    }
  ];

  const totalScandals = 420; // Meme number!

  return (
    <section id="ringmasters" className="py-20 bg-gradient-to-b from-black to-red-950 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-yellow-400 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-red-600 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          
          {/* Simplified Header */}
          <RevealAnimation>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl circus-title text-yellow-400 mb-4">
                Meet Your Star Performers
              </h2>
              <p className="text-lg text-yellow-200 max-w-2xl mx-auto">
                The talented folks who've perfected the art of <span className="text-red-400 font-bold">public service magic</span>
                <br />
                <span className="text-base italic">- Sponsored by Your Tax Money™</span>
              </p>
            </div>
          </RevealAnimation>

          {/* Quick Stats Bar */}
          <RevealAnimation delay={200}>
            <div className="bg-gradient-to-r from-red-900/60 to-red-800/60 backdrop-blur-sm border-2 border-yellow-400/50 rounded-lg p-6 mb-12">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-yellow-400">
                    <AnimatedCounter end={totalScandals} />
                  </div>
                  <div className="text-yellow-200 text-sm">Major Scams<br/><span className="text-xs">(Just the tip of iceberg)</span></div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-red-400">
                    ₹<AnimatedCounter end={23} suffix=".2L Cr" />
                  </div>
                  <div className="text-yellow-200 text-sm">Total Value<br/><span className="text-xs">(That we know of)</span></div>
                </div>
                <div className="hidden md:block">
                  <div className="text-3xl font-bold text-yellow-400">365/24/7</div>
                  <div className="text-yellow-200 text-sm">Non-Stop Show<br/><span className="text-xs">(No breaks, no intermission)</span></div>
                </div>
              </div>
            </div>
          </RevealAnimation>

          {/* Top 3 Performers - Card Based */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {topPerformers.map((performer, index) => (
              <RevealAnimation key={performer.id} delay={300 + index * 100}>
                <div 
                  className={`relative bg-gradient-to-br ${performer.color} p-[2px] rounded-xl cursor-pointer transform transition-all duration-300 hover:scale-105`}
                  onClick={() => setSelectedPerformer(performer.id)}
                >
                  <div className="bg-black/90 backdrop-blur-sm rounded-xl p-6 h-full">
                    {/* Icon and Amount */}
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-4xl">{performer.icon}</span>
                      <span className="text-2xl font-bold text-red-400">{performer.amount}</span>
                    </div>
                    
                    {/* Name and Title */}
                    <h3 className="text-xl font-bold text-yellow-400 mb-1">
                      {performer.name}
                    </h3>
                    <p className="text-yellow-200 text-sm mb-3">{performer.title}</p>
                    
                    {/* Achievement */}
                    <p className="text-yellow-300 italic text-sm mb-4">
                      "{performer.achievement}"
                    </p>
                    
                    {/* CTA */}
                    <button className="flex items-center text-yellow-400 text-sm hover:text-yellow-300 transition-colors">
                      <span>See full story</span>
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </RevealAnimation>
            ))}
          </div>

          {/* View More Button */}
          <RevealAnimation delay={600}>
            <div className="text-center">
              <Button
                variant="outline"
                onClick={() => setShowAll(!showAll)}
                className="border-yellow-400 text-yellow-400 hover:bg-yellow-400/20"
              >
                {showAll ? 'Show Less' : 'View All 420 Performers'}
              </Button>
            </div>
          </RevealAnimation>

          {/* Call to Action */}
          <RevealAnimation delay={700}>
            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-2 bg-red-900/50 border border-red-400 rounded-full px-6 py-3">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <span className="text-yellow-200">
                  Breaking: New scandals daily! Get <span className="font-bold">$40PCT</span> tokens for exclusive updates!
                </span>
              </div>
              <p className="text-yellow-400/70 text-xs mt-2">
                "Yesterday's news is today's forgotten scandal" 📰
              </p>
            </div>
          </RevealAnimation>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedPerformer && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedPerformer(null)}>
          <RevealAnimation>
            <div className="bg-gradient-to-br from-red-900 to-red-950 border-2 border-yellow-400 rounded-xl p-8 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setSelectedPerformer(null)}
                className="absolute top-4 right-4 text-yellow-400 hover:text-yellow-300"
              >
                <X className="w-6 h-6" />
              </button>
              
              {(() => {
                const performer = topPerformers.find(p => p.id === selectedPerformer);
                if (!performer) return null;
                
                return (
                  <>
                    <div className="text-4xl mb-4">{performer.icon}</div>
                    <h3 className="text-2xl circus-title text-yellow-400 mb-4">
                      {performer.name}
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <span className="text-red-400 font-bold">The Act:</span>
                        <span className="text-yellow-200 ml-2">{performer.details.scandal}</span>
                      </div>
                      <div>
                        <span className="text-red-400 font-bold">Show Duration:</span>
                        <span className="text-yellow-200 ml-2">{performer.details.period}</span>
                      </div>
                      <div>
                        <span className="text-red-400 font-bold">Impact:</span>
                        <span className="text-yellow-200 ml-2">{performer.details.impact}</span>
                      </div>
                      <div>
                        <span className="text-red-400 font-bold">Evidence:</span>
                        <span className="text-yellow-200 ml-2 text-sm">{performer.details.source}</span>
                      </div>
                    </div>
                    
                    <div className="mt-6 text-center">
                      <Button variant="circus" size="sm">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Track this scandal
                      </Button>
                      <p className="text-yellow-400/60 text-xs mt-2">
                        "The show must go on!"
                      </p>
                    </div>
                  </>
                );
              })()}
            </div>
          </RevealAnimation>
        </div>
      )}
    </section>
  );
};

export default Ringmasters;