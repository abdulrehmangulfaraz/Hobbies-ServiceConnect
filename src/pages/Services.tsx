// src/pages/Services.tsx

import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import ServiceCard from '../components/ServiceCard';
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from '@/firebase';
import { Skeleton } from '@/components/ui/skeleton';

interface Service {
    id: string;
    name: string;
    image: string;
    providerImageUrl?: string;
    serviceName: string;
    description: string;
    rating: number;
    postalCode: string;
    price: string;
    category: string; // Add the new category property
}

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const servicesCollection = collection(db, "services");
        const q = query(servicesCollection, orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);

        const servicesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Service));

        setServices(servicesData);
        setFilteredServices(servicesData);
      } catch (error) {
        console.error("Error fetching services: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);


  const handleSearch = (filters: { category: string; postalCode: string; keyword: string }) => {
    let filtered = services;

    if (filters.category && filters.category !== 'All Categories') {
      filtered = filtered.filter(service =>
        service.category.toLowerCase() === filters.category.toLowerCase()
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
      <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6">Find Local Services</h1>
          <div className="mt-8">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Available Services</h2>
        </div>

        {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-80 w-full rounded-lg" />)}
            </div>
        ) : filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                id={service.id}
                name={service.name}
                image={service.image}
                providerImageUrl={service.providerImageUrl}
                serviceName={service.serviceName}
                description={service.description}
                rating={service.rating}
                postalCode={service.postalCode}
                price={service.price}
                category={service.category}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No services have been listed yet.</h3>
            <p className="text-gray-500">Why not be the first? Go to your dashboard to add a service.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;