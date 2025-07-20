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

// CHANGE 1: Update the Service interface to include contact info
interface Service {
    id: string;
    name: string;
    image: string;
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
    contactEmail: string; // Added for email
    contactPhone?: string; // Added for phone (optional)
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
          <div className="relative h-64 sm:h-80">
            <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
            <div className="absolute top-4 right-4">
              <Badge className="bg-pink-500 text-white px-3 py-1">{service.serviceName}</Badge>
            </div>
          </div>

          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
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
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900 mb-1">{service.price}</div>
                <div className="text-sm text-gray-600">{service.priceDetails}</div>
              </div>
            </div>
          </CardContent>
        </Card>

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
                  {/* CHANGE 2: Make the "Call Now" button a functional link */}
                  {/* It will only appear if a phone number exists */}
                  {service.contactPhone && (
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <a href={`tel:${service.contactPhone}`}>
                        <Phone className="h-4 w-4 mr-2" />
                        Call Now
                      </a>
                    </Button>
                  )}

                  {/* CHANGE 3: Make the "Send Email" button a functional link */}
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