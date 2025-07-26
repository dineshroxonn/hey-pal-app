import { Building, DollarSign, Shield, Handshake } from 'lucide-react';

const SilentPartners = () => {
  const partnerTypes = [
    {
      icon: Building,
      title: 'The Infrastructure Architects',
      description: 'Building tomorrow\'s monuments to inefficiency today',
      examples: [
        { name: 'Highway to Nowhere Ltd.', specialty: 'Roads that lead to bank accounts', value: '₹1.2L Cr' },
        { name: 'Bridge Too Far Corp.', specialty: 'Connecting politicians to profits', value: '₹85,000 Cr' },
        { name: 'Metro Marvels Inc.', specialty: 'Underground money movements', value: '₹2.5L Cr' }
      ]
    },
    {
      icon: Shield,
      title: 'The Defense Dealers',
      description: 'Protecting national interests and profit margins',
      examples: [
        { name: 'Sky High Defense', specialty: 'Helicopters with premium pricing', value: '₹3,600 Cr' },
        { name: 'Naval Necessities', specialty: 'Submarines that surface occasionally', value: '₹15,000 Cr' },
        { name: 'Border Buddies', specialty: 'Equipment that works when it wants to', value: '₹8,400 Cr' }
      ]
    },
    {
      icon: DollarSign,
      title: 'The Resource Raiders',
      description: 'Extracting value from earth and exchequer alike',
      examples: [
        { name: 'Coal Comfort Consortium', specialty: 'Black gold, white money', value: '₹1.86L Cr' },
        { name: 'Spectrum Specialists', specialty: 'Airwave alchemy', value: '₹1.76L Cr' },
        { name: 'Mining Miracles', specialty: 'Digging deep into democracy', value: '₹5.68L Cr' }
      ]
    },
    {
      icon: Handshake,
      title: 'The Policy Partners',
      description: 'Where regulations meet relationships',
      examples: [
        { name: 'Banking Besties', specialty: 'Making NPAs disappear', value: '₹12.6L Cr' },
        { name: 'Pharma Friends', specialty: 'Prescribing profitable policies', value: '₹4.2L Cr' },
        { name: 'Telecom Titans', specialty: 'Connecting calls and campaigns', value: '₹2.3L Cr' }
      ]
    }
  ];

  return (
    <section id="partners" className="py-20 bg-gradient-to-b from-red-950 to-black relative">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl circus-title text-yellow-400 mb-6">
              The Silent Partners
            </h2>
            <p className="text-xl text-yellow-200 max-w-3xl mx-auto leading-relaxed">
              Behind every great circus performance are the sponsors who make it all possible. 
              Meet the corporate entities who've mastered the art of public-private partnerships.
            </p>
          </div>

          {/* Total Investment Banner */}
          <div className="bg-gradient-to-r from-red-900 to-red-800 border-4 border-yellow-400 rounded-lg p-8 mb-16 text-center">
            <h3 className="text-3xl circus-title text-yellow-400 mb-4">
              Total Estimated Investment in Democracy
            </h3>
            <div className="text-6xl font-bold text-red-400 mb-2">₹58+ Lakh Crores</div>
            <p className="text-yellow-200 italic">*Based on public scandals alone. Actual figures may be exponentially higher.</p>
          </div>

          {/* Partner Categories */}
          <div className="grid lg:grid-cols-2 gap-8">
            {partnerTypes.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <div key={index} className="bg-gradient-to-b from-yellow-400/10 to-red-600/10 border-2 border-yellow-400/50 rounded-lg p-8 hover:scale-105 transition-transform duration-300">
                  {/* Category Header */}
                  <div className="flex items-center mb-6">
                    <div className="bg-yellow-400/20 p-3 rounded-full mr-4">
                      <IconComponent className="w-8 h-8 text-yellow-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl circus-title text-yellow-400">
                        {category.title}
                      </h3>
                      <p className="text-yellow-200 italic">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  {/* Partner Examples */}
                  <div className="space-y-4">
                    {category.examples.map((partner, partnerIndex) => (
                      <div key={partnerIndex} className="bg-red-900/30 border border-yellow-400/30 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-lg font-bold text-yellow-400">
                            {partner.name}
                          </h4>
                          <span className="text-red-400 font-bold text-lg">
                            {partner.value}
                          </span>
                        </div>
                        <p className="text-yellow-200 italic text-sm">
                          {partner.specialty}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Method Explanation */}
          <div className="mt-16 bg-gradient-to-r from-yellow-400/20 to-red-600/20 border-2 border-yellow-400 rounded-lg p-8">
            <h3 className="text-3xl circus-title text-yellow-400 mb-6 text-center">
              How the Magic Works
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-4">🎪</div>
                <h4 className="text-xl font-bold text-yellow-400 mb-2">Step 1: The Setup</h4>
                <p className="text-yellow-200">Policy announcements create investment opportunities</p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl mb-4">🤝</div>
                <h4 className="text-xl font-bold text-yellow-400 mb-2">Step 2: The Partnership</h4>
                <p className="text-yellow-200">Private interests align with public projects</p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl mb-4">💰</div>
                <h4 className="text-xl font-bold text-yellow-400 mb-2">Step 3: The Profit</h4>
                <p className="text-yellow-200">Everyone wins! (Terms and conditions apply)</p>
              </div>
            </div>

            <div className="text-center mt-8">
              <p className="text-yellow-200 italic">
                "It's not corruption if everyone's doing it!" - Anonymous Corporate Executive, 2024
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SilentPartners;