import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Users, Eye, Heart, MessageCircle, Share, TrendingUp } from 'lucide-react';

const TheAudience = () => {
  const [selectedType, setSelectedType] = useState('all');

  const audienceTypes = [
    {
      id: 'enthusiasts',
      title: 'The Enthusiasts',
      emoji: '🎊',
      description: 'Front row seats, every show, rain or shine',
      characteristics: [
        'Knows every performer by name and scandal',
        'Has strong opinions about plot developments',
        'Believes their favorite act can do no wrong',
        'Quotes circus performances in daily conversations'
      ],
      percentage: '25%',
      engagement: 'Always Cheering'
    },
    {
      id: 'critics',
      title: 'The Critics',
      emoji: '📰',
      description: 'Professional reviewers of the democratic performance',
      characteristics: [
        'Documents every act with detailed analysis',
        'Compares current show to historical performances',
        'Writes lengthy reviews that few people read',
        'Secretly enjoys the drama while denouncing it'
      ],
      percentage: '15%',
      engagement: 'Analytical Applause'
    },
    {
      id: 'silent',
      title: 'The Silent Majority',
      emoji: '🤐',
      description: 'Watching quietly from the back rows',
      characteristics: [
        'Knows the show is absurd but keeps watching',
        'Occasionally claps when everyone else does',
        'More interested in snacks than performances',
        'Hopes the show will improve but expects it won\'t'
      ],
      percentage: '45%',
      engagement: 'Polite Clapping'
    },
    {
      id: 'participants',
      title: 'The Participants',
      emoji: '🎭',
      description: 'Sometimes audience, sometimes part of the act',
      characteristics: [
        'Gets pulled on stage during interactive segments',
        'Believes they can direct the show better',
        'Forms fan clubs for different performers',
        'Occasionally throws things when disappointed'
      ],
      percentage: '15%',
      engagement: 'Active Participation'
    }
  ];

  const filteredAudience = selectedType === 'all' 
    ? audienceTypes 
    : audienceTypes.filter(type => type.id === selectedType);

  return (
    <section id="audience" className="py-20 bg-gradient-to-b from-black to-red-950 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl circus-title text-yellow-400 mb-6">
              And Our Beloved Audience...
            </h2>
            <div className="text-7xl md:text-8xl circus-title text-red-500 mb-6">
              US!
            </div>
            <p className="text-xl text-yellow-200 max-w-3xl mx-auto leading-relaxed">
              The most important part of any circus - the audience that makes it all possible. 
              Every democracy gets the circus it deserves, and every audience gets the show it watches.
            </p>
          </div>

          {/* Audience Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="bg-gradient-to-b from-yellow-400/20 to-red-600/20 border-2 border-yellow-400/50 rounded-lg p-6 text-center">
              <Users className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <div className="text-3xl font-bold text-yellow-400 mb-2">1.4B</div>
              <div className="text-yellow-200 uppercase tracking-wide">Total Audience</div>
            </div>
            
            <div className="bg-gradient-to-b from-yellow-400/20 to-red-600/20 border-2 border-yellow-400/50 rounded-lg p-6 text-center">
              <Eye className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <div className="text-3xl font-bold text-yellow-400 mb-2">67%</div>
              <div className="text-yellow-200 uppercase tracking-wide">Active Viewers</div>
            </div>
            
            <div className="bg-gradient-to-b from-yellow-400/20 to-red-600/20 border-2 border-yellow-400/50 rounded-lg p-6 text-center">
              <MessageCircle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <div className="text-3xl font-bold text-yellow-400 mb-2">24/7</div>
              <div className="text-yellow-200 uppercase tracking-wide">Commentary</div>
            </div>
            
            <div className="bg-gradient-to-b from-yellow-400/20 to-red-600/20 border-2 border-yellow-400/50 rounded-lg p-6 text-center">
              <TrendingUp className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <div className="text-3xl font-bold text-yellow-400 mb-2">∞</div>
              <div className="text-yellow-200 uppercase tracking-wide">Seasons</div>
            </div>
          </div>

          {/* Audience Type Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button
              variant={selectedType === 'all' ? "ringmaster" : "outline"}
              onClick={() => setSelectedType('all')}
            >
              All Audience Types
            </Button>
            {audienceTypes.map((type) => (
              <Button
                key={type.id}
                variant={selectedType === type.id ? "ringmaster" : "outline"}
                onClick={() => setSelectedType(type.id)}
                className="flex items-center gap-2"
              >
                <span>{type.emoji}</span>
                {type.title}
              </Button>
            ))}
          </div>

          {/* Audience Types */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {filteredAudience.map((type, index) => (
              <div key={type.id} className="bg-gradient-to-r from-red-900/40 to-red-800/40 border-2 border-yellow-400/50 rounded-lg p-8 hover:scale-105 transition-transform duration-300">
                <div className="flex items-center mb-6">
                  <div className="text-4xl mr-4">{type.emoji}</div>
                  <div>
                    <h3 className="text-2xl circus-title text-yellow-400 mb-2">
                      {type.title}
                    </h3>
                    <div className="flex items-center gap-4">
                      <span className="text-red-400 font-bold text-lg">{type.percentage}</span>
                      <span className="text-yellow-200 italic">{type.engagement}</span>
                    </div>
                  </div>
                </div>

                <p className="text-yellow-200 mb-6 italic">
                  {type.description}
                </p>

                <div className="space-y-3">
                  <h4 className="text-lg font-bold text-yellow-400">Typical Behavior:</h4>
                  <ul className="space-y-2">
                    {type.characteristics.map((characteristic, charIndex) => (
                      <li key={charIndex} className="text-yellow-200 flex items-start">
                        <span className="text-red-400 mr-2">•</span>
                        {characteristic}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Self-Reflection Section */}
          <div className="bg-gradient-to-r from-yellow-400/20 to-red-600/20 border-4 border-yellow-400 rounded-lg p-8 text-center">
            <h3 className="text-3xl circus-title text-yellow-400 mb-6">
              The Mirror Moment
            </h3>
            
            <div className="max-w-4xl mx-auto">
              <p className="text-xl text-yellow-200 mb-6 leading-relaxed">
                Every great circus ends with a moment of reflection. We laugh at the performers, 
                we critique the management, we analyze the sponsors... but what about us?
              </p>
              
              <div className="bg-red-900/50 border-2 border-red-400 rounded-lg p-6 mb-6">
                <p className="text-lg text-yellow-200 italic">
                  "We are the audience that keeps coming back. We are the critics who keep watching. 
                  We are the democracy that gets exactly the circus it deserves."
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <Heart className="w-12 h-12 text-red-400 mx-auto mb-4" />
                  <h4 className="text-lg font-bold text-yellow-400 mb-2">We Enable</h4>
                  <p className="text-yellow-200 text-sm">By watching, we give power to the performance</p>
                </div>
                
                <div className="text-center">
                  <Share className="w-12 h-12 text-red-400 mx-auto mb-4" />
                  <h4 className="text-lg font-bold text-yellow-400 mb-2">We Amplify</h4>
                  <p className="text-yellow-200 text-sm">Our reactions become part of the show</p>
                </div>
                
                <div className="text-center">
                  <Eye className="w-12 h-12 text-red-400 mx-auto mb-4" />
                  <h4 className="text-lg font-bold text-yellow-400 mb-2">We Choose</h4>
                  <p className="text-yellow-200 text-sm">Every five years, we pick our favorite performers</p>
                </div>
              </div>

              <Button variant="circus" size="lg" className="text-lg px-8">
                Join the Self-Aware Audience
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TheAudience;