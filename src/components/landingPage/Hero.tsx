import React from 'react';

const Hero = () => {
  return (
    <section className="bg-gray-50 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-8">
            Få overblik over{' '}
            <span className="text-[#ff00c8]">creators</span>{' '}
            og{' '}
            <span className="text-[#ff00c8]">betal</span>{' '}
            kun for visninger
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="bg-[#ff00c8] text-white px-8 py-3 rounded-full hover:bg-[#ff45d7] transition-colors">
                <a href="/signup">Kom i gang gratis</a> 
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"> <img src="/infulencer.jpg"  className="rounded-full w-16 h-16" alt="" /></div>
              <h3 className="font-semibold text-gray-900 mb-2">@Electrical</h3>
              <div className="text-[#ff00c8] font-bold text-xl">250 DKK</div>
              <div className="text-gray-600 text-sm">per post</div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"><img src="/infulencer2.jpg"  className="rounded-full w-16 h-16" alt="" /></div>
              <h3 className="font-semibold text-gray-900 mb-2">@Tutoring</h3>
              <div className="text-[#ff00c8] font-bold text-xl">500 DKK</div>
              <div className="text-gray-600 text-sm">per post</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;