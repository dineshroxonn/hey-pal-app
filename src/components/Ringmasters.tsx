import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Crown, Users, TrendingDown, ExternalLink } from 'lucide-react';

const Ringmasters = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const ringmasters = [
    {
      category: 'central',
      title: 'The Main Act',
      description: 'Center stage performances that captivate nationwide audiences',
      performers: [
        {
          name: 'The Promise Master',
          specialty: '2014-2024 Spectacular',
          record: '₹15 Lakh Crore* Electoral Bonds Mystery',
          source: 'Supreme Court, 2024',
          achievement: 'Made transparency disappear completely'
        },
        {
          name: 'The Dynasty Juggler',
          specialty: 'Multi-Generational Act',
          record: '1947-Present Family Business',
          source: 'Election Commission Records',
          achievement: 'Keeping the family name in lights for 75+ years'
        }
      ]
    },
    {
      category: 'state',
      title: 'Regional Circuses',
      description: 'State-level productions with their own unique flavors',
      performers: [
        {
          name: 'The Land Acquisition Magician',
          specialty: 'Making Farmers Disappear',
          record: '₹1.76 Lakh Crore Land Bank',
          source: 'RTI Responses, Various States',
          achievement: 'Turned agricultural land into industrial gold'
        },
        {
          name: 'The Liquor License Illusionist',
          specialty: 'Policy Transformation Tricks',
          record: '₹8,000 Crore Scam Portfolio',
          source: 'Delhi Excise Policy Case, CBI',
          achievement: 'Made black money white overnight'
        }
      ]
    },
    {
      category: 'bureaucratic',
      title: 'The Supporting Cast',
      description: 'The backbone performers who keep the show running',
      performers: [
        {
          name: 'The File-Moving Virtuoso',
          specialty: 'Administrative Choreography',
          record: '₹2,000 per signature average',
          source: 'Transparency International India',
          achievement: 'Perfected the art of delayed gratification'
        },
        {
          name: 'The Tender Whisperer',
          specialty: 'Procurement Performance Art',
          record: '300% cost inflation on average',
          source: 'CAG Reports, Multiple States',
          achievement: 'Made ₹1 roads cost ₹4 consistently'
        }
      ]
    }
  ];

  const categories = [
    { id: 'all', name: 'All Acts', icon: Crown },
    { id: 'central', name: 'Main Stage', icon: Users },
    { id: 'state', name: 'Regional Shows', icon: TrendingDown },
    { id: 'bureaucratic', name: 'Supporting Cast', icon: ExternalLink }
  ];

  const filteredRingmasters = selectedCategory === 'all' 
    ? ringmasters 
    : ringmasters.filter(rm => rm.category === selectedCategory);

  return (
    <section id="ringmasters" className="py-20 bg-gradient-to-b from-black to-red-950 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl circus-title text-yellow-400 mb-6">
              Meet Your Ringmasters
            </h2>
            <p className="text-xl text-yellow-200 max-w-3xl mx-auto leading-relaxed">
              The talented individuals who have perfected the art of governance as entertainment. 
              Each performance is backed by official records and verifiable sources.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "ringmaster" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex items-center gap-2"
                >
                  <IconComponent className="w-4 h-4" />
                  {category.name}
                </Button>
              );
            })}
          </div>

          {/* Ringmaster Categories */}
          <div className="space-y-12">
            {filteredRingmasters.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-gradient-to-r from-red-900/40 to-red-800/40 border-2 border-yellow-400/50 rounded-lg p-8 backdrop-blur-sm">
                <div className="mb-8">
                  <h3 className="text-3xl circus-title text-yellow-400 mb-3">
                    {category.title}
                  </h3>
                  <p className="text-yellow-200 text-lg italic">
                    {category.description}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {category.performers.map((performer, performerIndex) => (
                    <div key={performerIndex} className="bg-gradient-to-b from-yellow-400/10 to-red-600/10 border border-yellow-400/30 rounded-lg p-6 hover:scale-105 transition-transform duration-300">
                      <div className="mb-4">
                        <h4 className="text-xl font-bold text-yellow-400 mb-2">
                          {performer.name}
                        </h4>
                        <p className="text-yellow-300 font-medium italic">
                          {performer.specialty}
                        </p>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <span className="text-red-400 font-bold text-lg">Record Performance: </span>
                          <span className="text-yellow-200">{performer.record}</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-gray-400 text-sm">Source: </span>
                            <span className="text-gray-300 text-sm font-medium">{performer.source}</span>
                          </div>
                          <ExternalLink className="w-4 h-4 text-gray-400" />
                        </div>
                        
                        <div className="pt-3 border-t border-yellow-400/20">
                          <span className="text-yellow-400 font-medium">Signature Achievement: </span>
                          <span className="text-yellow-200 italic">{performer.achievement}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-yellow-400/20 to-red-600/20 border-2 border-yellow-400 rounded-lg p-8 backdrop-blur-sm">
              <h3 className="text-2xl circus-title text-yellow-400 mb-4">
                Want to See More Acts?
              </h3>
              <p className="text-yellow-200 mb-6">
                This is just the opening show. Hold your $40PCT tokens for exclusive access to 
                behind-the-scenes footage and insider documentation.
              </p>
              <Button variant="ticket" size="lg">
                Get VIP Access with $40PCT
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ringmasters;