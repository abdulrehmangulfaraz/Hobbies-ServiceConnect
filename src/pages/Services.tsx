
import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import ServiceCard from '../components/ServiceCard';

const mockServices = [
  {
    id: '1',
    name: 'Maja',
    image: '/uploads/670ed39c-e49b-4baf-bdfa-6550e11d4230.png',
    serviceName: 'Dog Walking',
    description: 'Professional dog walking service. I love animals and provide reliable care for your pets.',
    rating: 5,
    postalCode: '4690',
    price: 'From 40 DKK'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400',
    serviceName: 'House Cleaning',
    description: 'Thorough and reliable house cleaning services. Let me take care of your home while you focus on what matters.',
    rating: 5,
    postalCode: '2100',
    price: 'From 200 DKK'
  },
  {
    id: '3',
    name: 'Michael Chen',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    serviceName: 'Plumbing',
    description: 'Licensed plumber with 10+ years experience. Available for emergency repairs and installations.',
    rating: 4,
    postalCode: '1000',
    price: 'From 500 DKK'
  },
  {
    id: '4',
    name: 'Emma Wilson',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    serviceName: 'Tutoring',
    description: 'Mathematics and Science tutoring for students of all ages. Personalized learning approach.',
    rating: 5,
    postalCode: '2200',
    price: 'From 300 DKK'
  },
  {
    id: '5',
    name: 'David Thompson',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    serviceName: 'Gardening',
    description: 'Complete gardening services including lawn care, pruning, and landscape design.',
    rating: 4,
    postalCode: '2300',
    price: 'From 400 DKK'
  },
  {
    id: '6',
    name: 'Lisa Anderson',
    image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400',
    serviceName: 'Pet Sitting',
    description: 'Loving pet care in your home. Your pets will be safe and happy while you are away.',
    rating: 5,
    postalCode: '1200',
    price: 'From 150 DKK'
  }
];

const Index = () => {
  const [services, setServices] = useState(mockServices);
  const [filteredServices, setFilteredServices] = useState(mockServices);

  const handleSearch = (filters: { category: string; postalCode: string; keyword: string }) => {
    console.log('Search filters:', filters);
    
    let filtered = services;

    if (filters.category && filters.category !== 'All Categories') {
      filtered = filtered.filter(service => 
        service.serviceName.toLowerCase().includes(filters.category.toLowerCase())
      );
    }

    if (filters.postalCode) {
      filtered = filtered.filter(service => 
        service.postalCode.includes(filters.postalCode)
      );
    }

    if (filters.keyword) {
      filtered = filtered.filter(service => 
        service.serviceName.toLowerCase().includes(filters.keyword.toLowerCase()) ||
        service.description.toLowerCase().includes(filters.keyword.toLowerCase()) ||
        service.name.toLowerCase().includes(filters.keyword.toLowerCase())
      );
    }

    setFilteredServices(filtered);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6">
            Find Local Services
            <span className="block text-2xl sm:text-3xl lg:text-4xl text-red-100 mt-2">
              Near You
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Connect with trusted local service providers in your area. From dog walking to home repairs, find the help you need.
          </p>
          
          <div className="mt-8">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Available Services
          </h2>
          <p className="text-gray-600">
            {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                id={service.id}
                name={service.name}
                image={service.image}
                serviceName={service.serviceName}
                description={service.description}
                rating={service.rating}
                postalCode={service.postalCode}
                price={service.price}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No services found</h3>
            <p className="text-gray-500">Try adjusting your search criteria to find more services.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
