import React from 'react';
import { Check } from 'lucide-react';

const PricingSection = () => {
  const essentialFeatures = [
    "Adgang til +1000 danske creatorer",
    "Besød køre en velstationer",
    "Find de rette creatorer",
    "Tilgang til alle kategorier", 
    "Udregnet antal kampagner",
    "Chat med creatorer",
    "Automatiske administratering"
  ];

  const doneForYouFeatures = [
    "Alt i Essential plan",
    "Storyboard influencer-marketing",
    "Medieplanlægning og vurdering af creators",
    "Rettet kampagne-og creators",
    "Løbende administreret af bureau"
  ];

  return (
    <section className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block bg-red-500 text-white px-4 py-2 rounded-full mb-4">
            Til virk
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">
            Overbetal aldrig <span className="text-red-500">for</span>
          </h2>
          <h3 className="text-3xl lg:text-5xl font-bold mb-8">
            influencer marketing <span className="text-red-500">igen</span>
          </h3>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="bg-red-500 p-8 rounded-2xl">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">🔥 Burst Essential</h3>
              <div className="text-4xl font-bold mb-4">2800 kr. <span className="text-xl">md</span></div>
              <button className="w-full bg-black text-white py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors">
                Bestil via Influencer marketing
              </button>
            </div>
            
            <ul className="space-y-3">
              {essentialFeatures.map((feature, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <Check className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white text-black p-8 rounded-2xl">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">🚀 Burst Done-For-You</h3>
              <div className="text-4xl font-bold mb-4">7200 kr. <span className="text-xl">md</span></div>
              <button className="w-full bg-red-500 text-white py-3 rounded-full font-semibold hover:bg-red-600 transition-colors">
                Bestil via Influencer marketing
              </button>
            </div>
            
            <ul className="space-y-3">
              {doneForYouFeatures.map((feature, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <Check className="h-5 w-5 mt-0.5 flex-shrink-0 text-red-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;