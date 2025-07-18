import React from 'react';

const FeatureCircle = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <div className="w-80 h-80 bg-red-500 rounded-full flex items-center justify-center text-white mx-auto">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">
                  Oplev hemligt af<br />
                  influencer marketing
                </h3>
                <p className="text-lg mb-6">
                  Lær dig viden, konkrete praktikale og<br />
                  øvelser samarbejdet med influencers
                </p>
                <button className="bg-white text-red-500 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                  Læs mere
                </button>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              En komplet marketing løsning for enhver virksomhed
            </h2>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">Pod mest hjælp</h4>
                <p className="text-gray-600">Få professionel hjælp til at planlægge og gennemføre din kampagne</p>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Lær</h4>
                <h4 className="font-semibold text-gray-900">Kontakt</h4>
                
                <div className="border-t pt-4">
                  <p className="text-gray-600">business@burstcreators.dk</p>
                  <p className="text-gray-600">Tlf: +45 31 17 13 01</p>
                  <p className="text-gray-600">Fredriksberg</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureCircle;