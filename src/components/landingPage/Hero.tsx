import React from 'react';

const Hero = () => {
  return (
    <section className="bg-gray-50 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-8">
            Få overblik over{' '}
            <span className="text-red-500">creators</span>{' '}
            og{' '}
            <span className="text-red-500">betal</span>{' '}
            kun for visninger
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="bg-red-500 text-white px-8 py-3 rounded-full hover:bg-red-600 transition-colors">
              Kom i gang gratis
            </button>
            <button className="text-gray-700 hover:text-gray-900 transition-colors underline">
              Se vores priser
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="font-semibold text-gray-900 mb-2">@influencer</h3>
              <div className="text-red-500 font-bold text-xl">250 DKK</div>
              <div className="text-gray-600 text-sm">per post</div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="font-semibold text-gray-900 mb-2">@creator</h3>
              <div className="text-red-500 font-bold text-xl">350 DKK</div>
              <div className="text-gray-600 text-sm">per post</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;