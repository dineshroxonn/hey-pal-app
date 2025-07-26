import { useState, useEffect } from 'react';
import circusCurtains from '@/assets/circus-curtains.jpg';

interface CurtainOpeningProps {
  onAnimationComplete: () => void;
}

const CurtainOpening = ({ onAnimationComplete }: CurtainOpeningProps) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setStage(1), 1000);
    const timer2 = setTimeout(() => setStage(2), 3000);
    const timer3 = setTimeout(() => setStage(3), 5000);
    const timer4 = setTimeout(() => {
      setStage(4);
      onAnimationComplete();
    }, 7000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onAnimationComplete]);

  if (stage >= 4) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Stage Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-red-900">
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black opacity-60" />
      </div>

      {/* Spotlight Effect */}
      {stage >= 1 && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-radial from-yellow-200/30 via-yellow-300/20 to-transparent rounded-full animate-spotlight" />
      )}

      {/* Curtains */}
      <div className="absolute inset-0 flex">
        {/* Left Curtain */}
        <div 
          className={`w-1/2 h-full curtain-texture transition-transform duration-[2000ms] ease-out ${
            stage >= 2 ? '-translate-x-full' : 'translate-x-0'
          }`}
          style={{
            backgroundImage: `url(${circusCurtains})`,
            backgroundSize: 'cover',
            backgroundPosition: 'right center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-red-800/80 to-red-900/60" />
          <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-r from-yellow-400 to-yellow-600 shadow-lg" />
        </div>

        {/* Right Curtain */}
        <div 
          className={`w-1/2 h-full curtain-texture transition-transform duration-[2000ms] ease-out ${
            stage >= 2 ? 'translate-x-full' : 'translate-x-0'
          }`}
          style={{
            backgroundImage: `url(${circusCurtains})`,
            backgroundSize: 'cover',
            backgroundPosition: 'left center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-l from-red-800/80 to-red-900/60" />
          <div className="absolute left-0 top-0 h-full w-8 bg-gradient-to-l from-yellow-400 to-yellow-600 shadow-lg" />
        </div>
      </div>

      {/* Title Sequence */}
      {stage >= 1 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            {stage >= 1 && (
              <h1 className={`text-6xl md:text-8xl circus-title text-yellow-400 mb-4 ${stage >= 1 ? 'animate-bounce-in' : 'opacity-0'}`}>
                THE GREAT
              </h1>
            )}
            {stage >= 2 && (
              <h2 className={`text-7xl md:text-9xl circus-title text-red-500 mb-6 ${stage >= 2 ? 'animate-bounce-in' : 'opacity-0'}`}>
                INDIAN
              </h2>
            )}
            {stage >= 3 && (
              <h3 className={`text-8xl md:text-10xl circus-title text-yellow-400 ${stage >= 3 ? 'animate-bounce-in' : 'opacity-0'}`}>
                CIRCUS
              </h3>
            )}
            {stage >= 3 && (
              <p className={`text-xl md:text-2xl circus-subtitle text-yellow-200 mt-8 italic ${stage >= 3 ? 'animate-bounce-in delay-500' : 'opacity-0'}`}>
                "Where Democracy Meets Drama"
              </p>
            )}
          </div>
        </div>
      )}

      {/* Decorative Elements */}
      {stage >= 1 && (
        <>
          {/* Top Banner */}
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-yellow-400 to-yellow-600 border-b-4 border-red-600 animate-flicker">
            <div className="flex items-center justify-center h-full">
              <div className="flex space-x-4">
                {[...Array(20)].map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-red-600 rounded-full animate-ping" style={{ animationDelay: `${i * 100}ms` }} />
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Banner */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-yellow-400 to-yellow-600 border-t-4 border-red-600">
            <div className="flex items-center justify-center h-full">
              <div className="flex space-x-4">
                {[...Array(20)].map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-red-600 rounded-full animate-ping" style={{ animationDelay: `${i * 100}ms` }} />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CurtainOpening;