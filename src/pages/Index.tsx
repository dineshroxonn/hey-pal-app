import { lazy, Suspense, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import CurtainOpening from '@/components/CurtainOpening';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ReportsTicker from '@/components/ReportsTicker';
import RingmasterMap from '@/components/RingmasterMap';
import SilentPartners from '@/components/SilentPartners';
import TheAudience from '@/components/TheAudience';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

// Three.js globe is the heaviest dependency on the site; load it only when the
// intro actually plays (first visit, before sessionStorage marks it as seen).
const CircusGlobe = lazy(() => import('@/components/CircusGlobe'));

type Phase = 'globe' | 'curtain' | 'content';

const Index = () => {
  const [phase, setPhase] = useState<Phase>(() => {
    if (typeof window === 'undefined') return 'globe';
    const seen = sessionStorage.getItem('circus_intro_seen');
    return seen ? 'content' : 'globe';
  });

  useEffect(() => {
    if (phase === 'content') sessionStorage.setItem('circus_intro_seen', '1');
  }, [phase]);

  return (
    <div className="min-h-screen bg-background circus-cursor">
      {phase === 'globe' && (
        <Suspense fallback={<div className="fixed inset-0 z-50 bg-black" />}>
          <CircusGlobe onComplete={() => setPhase('curtain')} />
        </Suspense>
      )}
      {phase === 'curtain' && (
        <CurtainOpening onAnimationComplete={() => setPhase('content')} />
      )}
      {phase === 'content' && (
        <div className={cn('animate-bounce-in')}>
          <Header />
          <Hero />
          <ReportsTicker />
          <RingmasterMap />

          {/* Report CTA */}
          <section className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 text-black py-14 px-4 border-y-4 border-black">
            <div className="container mx-auto max-w-4xl text-center">
              <h2 className="text-3xl md:text-5xl circus-title mb-4">You're not just the audience.</h2>
              <p className="text-lg md:text-xl mb-6 font-medium">
                Saw a bribe demanded? A ghost project? A peon asking for chai money?
                Drop a pin. Everyone sees it. Patterns emerge.
              </p>
              <Link
                to="/report"
                className="inline-flex items-center gap-2 bg-black text-yellow-400 font-black uppercase tracking-wider px-8 py-4 rounded text-lg hover:bg-red-900 transition-colors"
              >
                <MapPin className="w-6 h-6" /> Report on the live map
              </Link>
            </div>
          </section>

          <SilentPartners />
          <TheAudience />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Index;
