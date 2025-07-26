import { useState } from 'react';
import { cn } from '@/lib/utils';
import CurtainOpening from '@/components/CurtainOpening';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Ringmasters from '@/components/Ringmasters';
import SilentPartners from '@/components/SilentPartners';
import TheAudience from '@/components/TheAudience';
import TokenSection from '@/components/TokenSection';
import Footer from '@/components/Footer';

const Index = () => {
  const [showContent, setShowContent] = useState(false);

  const handleCurtainComplete = () => {
    setShowContent(true);
  };

  return (
    <div className="min-h-screen bg-background circus-cursor">
      {!showContent && (
        <CurtainOpening onAnimationComplete={handleCurtainComplete} />
      )}
      
      {showContent && (
        <div className={cn(
          "animate-bounce-in",
          "selection:bg-yellow-400/20 selection:text-yellow-400"
        )}>
          <Header />
          <Hero />
          <Ringmasters />
          <SilentPartners />
          <TheAudience />
          <TokenSection />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Index;