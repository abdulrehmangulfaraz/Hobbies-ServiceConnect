// src/pages/ServiceDetail.tsx

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Phone, Mail } from 'lucide-react';
import { db } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'; // Import Avatar components

// Update the Service interface to include the provider's image URL
interface Service {
    id: string;
    name: string;
    image: string;
    providerImageUrl?: string; // This is the provider's profile picture
    serviceName: string;
    description: string;
    longDescription: string;
    rating: number;
    postalCode: string;
    location: string;
    price: string;
    priceDetails: string;
    availability: string;
    experience: string;
    contactEmail: string;
    contactPhone?: string;
}

const ServiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchService = async () => {
      try {
        const docRef = doc(db, "services", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setService({ id: docSnap.id, ...docSnap.data() } as Service);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchService();
  }, [id]);

  if (isLoading) {
    // Skeleton loader remains the same
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="mb-8 overflow-hidden">
            <Skeleton className="h-64 sm:h-80 w-full" />
            <CardContent className="p-6">
              <Skeleton className="h-8 w-3/4 mb-4" />
              <Skeleton className="h-6 w-1/2" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!service) {
    // Not found page remains the same
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Service not found</h1>
          <p className="text-gray-600">The service you are looking for does not exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="mb-8 overflow-hidden">
          {/* --- CHANGE 1: Image container --- */}
          <div className="relative h-64 sm:h-80">
            {/* Cover Image */}
            <img src={service.image} alt={service.serviceName} className="w-full h-full object-cover" />
            <div className="absolute top-4 right-4">
              <Badge className="bg-pink-500 text-white px-3 py-1">{service.serviceName}</Badge>
            </div>
            {/* Provider's Profile Picture (Avatar) */}
            <div className="absolute -bottom-10 left-6">
               <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                  <AvatarImage src={service.providerImageUrl} alt={service.name} />
                  <AvatarFallback className="text-2xl">{service.name.charAt(0)}</AvatarFallback>
                </Avatar>
            </div>
          </div>

          {/* --- CHANGE 2: Adjust spacing for the content below --- */}
          <CardContent className="p-6 pt-16"> {/* Increased top padding */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{service.name}</h1>
                <div className="flex items-center space-x-4 text-gray-600 mb-4">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4 text-pink-500" />
                    <span>{service.location} ({service.postalCode})</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < service.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                    ))}
                    <span className="ml-1">({service.rating}.0)</span>
                  </div>
                </div>
              </div>
              <div className="text-right mt-4 sm:mt-0">
                <div className="text-2xl font-bold text-gray-900 mb-1">{service.price}</div>
                <div className="text-sm text-gray-600">{service.priceDetails}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* The rest of the page remains the same */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">About Me</h2>
                <p className="text-gray-600 whitespace-pre-wrap">{service.longDescription}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Service Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Experience</h3>
                    <p className="text-gray-600">{service.experience}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Availability</h3>
                    <p className="text-gray-600">{service.availability}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Contact Provider</h3>
                <div className="space-y-3">
                  {service.contactPhone && (
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <a href={`tel:${service.contactPhone}`}>
                        <Phone className="h-4 w-4 mr-2" />
                        Call Now
                      </a>
                    </Button>
                  )}
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href={`mailto:${service.contactEmail}`}>
                      <Mail className="h-4 w-4 mr-2" />
                      Send Email
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;