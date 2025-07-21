import React from 'react';

const StatsSection = () => {
  return (
    <section className="bg- text-black py-16 p-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-5xl font-bold mb-4">
          Over 1000 Danske
        </h2>
        <h3 className="text-2xl lg:text-4xl font-bold mb-8">influencers</h3>
        <div className="text-xl mb-8">
          der kan{' '}
          <span className="underline">skabehype.com</span>{' '}
          dit brand
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button className="bg-[#dc44bb] text-white  hover:text-black px-8 py-3 rounded-full hover:bg-gray-100 transition-colors font-semibold">
            Find Creators
          </button>
          <button className="bg-[#dc44bb] text-white px-8 py-3  hover:text-black rounded-full hover:bg-gray-100 transition-colors font-semibold">
            Bliv Influencer
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="bg-[#dc44bb] text-white px-4 py-2  hover:text-black rounded-full font-medium">
            Alt Bygning
          </button>
          <button className="bg-[#dc44bb] text-white px-4 py-2  hover:text-black rounded-full font-medium">
            Gaming
          </button>
          <button className="bg-[#dc44bb] text-white px-4 py-2 hover:text-black rounded-full font-medium">
            All Categories
          </button>
          <button className="bg-[#dc44bb] text-white px-4 py-2 hover:text-black rounded-full font-medium">
            Beauty
          </button>
        </div>

        <div className="mt-8">
          <button className="bg-[#dc44bb] text-white px-8 py-3 rounded-full hover:bg-gray-100 hover:text-black transition-colors font-semibold">
            Se alle kategoner
          </button>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;