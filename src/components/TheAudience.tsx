import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RevealAnimation } from '@/components/ui/reveal-animation';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import { Users, Eye, MessageCircle, TrendingUp, ArrowRight, Sparkles } from 'lucide-react';

const TheAudience = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const audienceTypes = {
    enthusiasts: {
      id: 'enthusiasts',
      title: 'The Cheerleader',
      emoji: '📣',
      percentage: 25,
      color: 'from-yellow-400 to-orange-500',
      description: 'Every party needs loyal fans!',
      traits: ['WhatsApp forward champion', 'Rally regular', 'Believes in party loyalty']
    },
    critics: {
      id: 'critics',
      title: 'The Analyst',
      emoji: '🔍',
      percentage: 15,
      color: 'from-blue-500 to-purple-500',
      description: 'Twitter threads are your hobby!',
      traits: ['Fact-check enthusiast', 'Data lover', 'Debate champion']
    },
    silent: {
      id: 'silent',
      title: 'The Observer',
      emoji: '👀',
      percentage: 45,
      color: 'from-gray-500 to-gray-700',
      description: 'Netflix > Politics any day!',
      traits: ['Watches from sidelines', 'Meme enjoyer', 'Avoids arguments']
    },
    participants: {
      id: 'participants',
      title: 'The Activist',
      emoji: '✊',
      percentage: 15,
      color: 'from-pink-500 to-red-500',
      description: 'Change starts with you!',
      traits: ['Social media warrior', 'Petition starter', 'Weekend protester']
    }
  };

  const quiz = [
    {
      question: "Morning routine check - what's first?",
      options: [
        { text: "Check party updates and news 📱", type: 'enthusiasts' },
        { text: "Analyze yesterday's political drama 📊", type: 'critics' },
        { text: "Scroll through memes and reels 😄", type: 'silent' },
        { text: "Check today's cause to support 🎯", type: 'participants' }
      ]
    },
    {
      question: "Breaking news: New scandal! Your move?",
      options: [
        { text: "Defend your side no matter what! 🛡️", type: 'enthusiasts' },
        { text: "Time for a detailed analysis thread 🧵", type: 'critics' },
        { text: "Same old drama, next meme please! 🥱", type: 'silent' },
        { text: "Organize online campaign ASAP! 📢", type: 'participants' }
      ]
    },
    {
      question: "Family gathering turns political. You?",
      options: [
        { text: "Convince everyone about your party 🗣️", type: 'enthusiasts' },
        { text: "Fact-check every statement made 🎯", type: 'critics' },
        { text: "Excuse yourself, check phone 📱", type: 'silent' },
        { text: "Start debate on voting rights 🗳️", type: 'participants' }
      ]
    }
  ];

  const handleAnswer = (type: string) => {
    const newAnswers = [...answers, type];
    setAnswers(newAnswers);

    if (currentQuestion < quiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate result
      const counts = newAnswers.reduce((acc, answer) => {
        acc[answer] = (acc[answer] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const winner = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
      setResult(winner);
    }
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
  };

  return (
    <section id="audience" className="py-20 bg-gradient-to-b from-black to-red-950 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-yellow-400 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-red-600 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <RevealAnimation>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl circus-title text-yellow-400 mb-4">
                The Real Stars Are...
              </h2>
              <div className="text-6xl md:text-7xl circus-title text-red-500 mb-4">
                YOU! 🎭
              </div>
              <p className="text-lg text-yellow-200 max-w-2xl mx-auto">
                Every circus needs an audience. What type of viewer are you?
              </p>
            </div>
          </RevealAnimation>

          {/* Quick Stats */}
          <RevealAnimation delay={200}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              <div className="bg-gradient-to-b from-yellow-400/20 to-red-600/20 border border-yellow-400/50 rounded-lg p-4 text-center">
                <Users className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-yellow-400">
                  <AnimatedCounter end={1.4} suffix="B" />
                </div>
                <div className="text-yellow-200 text-xs">Total Audience</div>
              </div>
              
              <div className="bg-gradient-to-b from-yellow-400/20 to-red-600/20 border border-yellow-400/50 rounded-lg p-4 text-center">
                <Eye className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-yellow-400">
                  <AnimatedCounter end={67} suffix="%" />
                </div>
                <div className="text-yellow-200 text-xs">Active Voters</div>
              </div>
              
              <div className="bg-gradient-to-b from-yellow-400/20 to-red-600/20 border border-yellow-400/50 rounded-lg p-4 text-center">
                <MessageCircle className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-yellow-400">24/7</div>
                <div className="text-yellow-200 text-xs">Social Media</div>
              </div>
              
              <div className="bg-gradient-to-b from-yellow-400/20 to-red-600/20 border border-yellow-400/50 rounded-lg p-4 text-center">
                <TrendingUp className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-yellow-400">∞</div>
                <div className="text-yellow-200 text-xs">Drama Continues</div>
              </div>
            </div>
          </RevealAnimation>

          {/* Main Content Area */}
          {!quizStarted && !result && (
            <RevealAnimation delay={400}>
              <div className="text-center">
                <div className="bg-gradient-to-r from-red-900/60 to-red-800/60 backdrop-blur-sm border-2 border-yellow-400 rounded-xl p-12 max-w-2xl mx-auto">
                  <Sparkles className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
                  <h3 className="text-3xl circus-title text-yellow-400 mb-4">
                    Discover Your Audience Type!
                  </h3>
                  <p className="text-yellow-200 mb-8">
                    Take our quick quiz and find out which part of the political circus audience you really are!
                  </p>
                  <Button 
                    variant="circus" 
                    size="lg"
                    onClick={() => setQuizStarted(true)}
                    className="text-lg px-8"
                  >
                    Start Quiz
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>

                {/* Audience Type Preview Grid */}
                <div className="grid md:grid-cols-4 gap-4 mt-12">
                  {Object.values(audienceTypes).map((type) => (
                    <div key={type.id} className="text-center">
                      <div className="text-4xl mb-2">{type.emoji}</div>
                      <div className="text-yellow-400 font-bold">{type.percentage}%</div>
                      <div className="text-yellow-200 text-sm">{type.title}</div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealAnimation>
          )}

          {/* Quiz Interface */}
          {quizStarted && !result && (
            <RevealAnimation>
              <div className="max-w-2xl mx-auto">
                <div className="bg-gradient-to-r from-red-900/60 to-red-800/60 backdrop-blur-sm border-2 border-yellow-400 rounded-xl p-8">
                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between text-yellow-400 text-sm mb-2">
                      <span>Question {currentQuestion + 1} of {quiz.length}</span>
                      <span>{Math.round(((currentQuestion + 1) / quiz.length) * 100)}%</span>
                    </div>
                    <div className="w-full bg-red-900/50 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-yellow-400 to-red-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((currentQuestion + 1) / quiz.length) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Question */}
                  <h3 className="text-2xl font-bold text-yellow-400 mb-6 text-center">
                    {quiz[currentQuestion].question}
                  </h3>

                  {/* Options */}
                  <div className="space-y-3">
                    {quiz[currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswer(option.type)}
                        className="w-full text-left p-4 bg-black/50 border border-yellow-400/30 rounded-lg hover:border-yellow-400 hover:bg-yellow-400/10 transition-all duration-200 group"
                      >
                        <span className="text-yellow-200 group-hover:text-yellow-400 transition-colors">
                          {option.text}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </RevealAnimation>
          )}

          {/* Result Display */}
          {result && (
            <RevealAnimation>
              <div className="max-w-3xl mx-auto text-center">
                <div className={`bg-gradient-to-br ${audienceTypes[result].color} p-1 rounded-2xl mb-8`}>
                  <div className="bg-black/90 backdrop-blur-sm rounded-2xl p-12">
                    <div className="text-6xl mb-4">{audienceTypes[result].emoji}</div>
                    <h3 className="text-4xl circus-title text-yellow-400 mb-4">
                      You're {audienceTypes[result].title}!
                    </h3>
                    <p className="text-2xl text-yellow-200 mb-8">
                      {audienceTypes[result].description}
                    </p>
                    
                    <div className="flex flex-wrap justify-center gap-3 mb-8">
                      {audienceTypes[result].traits.map((trait: string, index: number) => (
                        <span key={index} className="bg-yellow-400/20 border border-yellow-400/50 rounded-full px-4 py-2 text-yellow-300">
                          {trait}
                        </span>
                      ))}
                    </div>

                    <div className="bg-red-900/50 border border-red-400 rounded-lg p-4 mb-8">
                      <p className="text-yellow-200">
                        You're part of the <span className="font-bold text-yellow-400">{audienceTypes[result].percentage}%</span> who
                        {result === 'silent' ? ' watch from the sidelines' : 
                         result === 'enthusiasts' ? ' actively support their team' :
                         result === 'critics' ? ' analyze every move' :
                         ' try to make a difference'}!
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button variant="circus" onClick={resetQuiz}>
                        Try Again
                      </Button>
                      <Button variant="ticket">
                        Share Result
                      </Button>
                    </div>
                  </div>
                </div>

                {/* The Mirror Moment - Simplified */}
                <div className="bg-gradient-to-r from-yellow-400/20 to-red-600/20 border-2 border-yellow-400 rounded-lg p-6">
                  <p className="text-lg text-yellow-200 italic">
                    "Every democracy gets the government it deserves"
                  </p>
                  <p className="text-yellow-300 text-sm mt-2">
                    - Because we are all part of the show! 🎪
                  </p>
                </div>
              </div>
            </RevealAnimation>
          )}
        </div>
      </div>
    </section>
  );
};

export default TheAudience;