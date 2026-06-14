import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import { RevealAnimation } from '@/components/ui/reveal-animation';
import { MapPin, Megaphone, Eye } from 'lucide-react';

const Hero = () => {
  const stats = [
    { icon: Eye, label: 'Acts on Stage', value: '36 states & UTs', counter: 36, suffix: '' },
    { icon: MapPin, label: 'Audience Size', value: '1.4B Citizens', counter: 1.4, suffix: 'B' },
    { icon: Megaphone, label: 'Your Vote', value: 'The Loudest Cheer', counter: 0, suffix: '' },
  ];

  return (
    <section id="show" className="min-h-screen bg-gradient-to-b from-black via-red-950 to-black relative overflow-hidden pt-20 circus-cursor">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <RevealAnimation delay={200}>
            <div className="mb-12">
              <h1 className="text-5xl md:text-7xl lg:text-8xl circus-title text-yellow-400 mb-6 leading-tight">
                Step right up.
                <span className="block text-red-500 mt-2">See the show.</span>
                <span className="block text-yellow-400 mt-2">Then report it. 🎪</span>
              </h1>
              <p className="text-xl md:text-2xl circus-subtitle text-yellow-200 max-w-4xl mx-auto leading-relaxed">
                A satirical, evidence-based atlas of Indian politics. Pick a state, meet the ringmasters,
                read the rap sheet — and pin your own corruption story on the live map.
              </p>
            </div>
          </RevealAnimation>

          <RevealAnimation delay={400}>
            <div className="bg-gradient-to-r from-red-900/80 to-red-800/80 border-4 border-yellow-400 rounded-lg p-6 md:p-8 mb-12 backdrop-blur-sm animate-gentle-pulse">
              <h2 className="text-2xl md:text-4xl circus-title text-yellow-400 mb-3 animate-subtle-glow">
                "Same circus. Different ringmaster."
              </h2>
              <p className="text-base md:text-xl text-yellow-200 italic">
                Politicians come and go. The act stays the same. Sources: ADR, MyNeta, ECI, PRS India, CAG.
              </p>
            </div>
          </RevealAnimation>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <RevealAnimation key={index} delay={600 + index * 100}>
                  <div className="bg-gradient-to-b from-yellow-400/20 to-red-600/20 border-2 border-yellow-400/50 rounded-lg p-6 backdrop-blur-sm hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/20">
                    <IconComponent className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                    <div className="text-2xl font-bold text-yellow-400 mb-2">
                      {stat.counter ? <AnimatedCounter end={stat.counter} suffix={stat.suffix} /> : stat.value}
                    </div>
                    <div className="text-yellow-200 font-medium uppercase tracking-wide">{stat.label}</div>
                  </div>
                </RevealAnimation>
              );
            })}
          </div>

          <RevealAnimation delay={1000}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="circus" size="lg" className="text-lg px-8 py-4" asChild>
                <a href="#ringmasters"><Eye className="w-6 h-6 mr-2" /> Pick your tent</a>
              </Button>
              <Button variant="ticket" size="lg" className="text-lg px-8 py-4" asChild>
                <Link to="/report"><MapPin className="w-6 h-6 mr-2" /> Report corruption</Link>
              </Button>
            </div>
            <p className="text-yellow-300 text-sm max-w-2xl mx-auto mt-6">
              <strong>Disclaimer:</strong> This is satire built on public records. We make fun of the system, not the citizens.
            </p>
          </RevealAnimation>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-r from-yellow-400 via-red-600 to-yellow-400 opacity-80" />
    </section>
  );
};

export default Hero;
