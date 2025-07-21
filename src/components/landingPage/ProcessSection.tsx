import React from 'react';
import { CheckCircle } from 'lucide-react';

const ProcessSection = () => {
  const steps = [
    "Opret kampagne",
    "Godkend creators", 
    "Influencers indhold",
    "Følg med i analytics"
  ];

  return (
    <section className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-5xl font-bold  mb-4">
            Det har <span className="text-[#dc44bb]">aldrig været så</span>
          </h2>
          <h3 className="text-3xl lg:text-5xl font-bold  mb-8">nemt!</h3>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Find den perfekte influencer til din næste kampagne. Med vores platform kan du nemt 
            finde, kontakte og samarbejde med influencers der passer til dit brand.
          </p>
        </div>

        <div className="bg-[#dc44bb] text-white p-8 rounded-2xl mb-12">
          <h3 className="text-2xl font-bold mb-6">Opret kampagne</h3>
          <p className="text-lg mb-6">
            Fortæl os hvad du vil opnå og hvilken influencer du leder efter. Vi matcher dig med de 
            bedste influencers indenfor dit budget og målgruppe.
          </p>
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-white" />
                <span className="text-lg">{step}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <p className="text-lg  mb-6">
            "Med Burst har vi fundet de <span className="font-bold">rette vto</span> influencers 
            som har skabt autentisk content og marketing resultater som vi aldrig kunne have 
            forestillet os"
          </p>
          <div className="font-semibold">
            Carolina Drivenes<br />
            Marketing Manager
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;