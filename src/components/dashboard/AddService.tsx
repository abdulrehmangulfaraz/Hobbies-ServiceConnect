// src/components/dashboard/AddService.tsx

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { db } from '@/firebase';
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from '@/contexts/AuthContext';
import Pricing from './Pricing';

const ServiceForm = () => {
    const { user } = useAuth();
    const { toast } = useToast();

    const [serviceName, setServiceName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [longDescription, setLongDescription] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [location, setLocation] = useState('');
    const [availability, setAvailability] = useState('');
    const [experience, setExperience] = useState('');
    const [priceDetails, setPriceDetails] = useState('');
    const [contactEmail, setContactEmail] = useState(user?.email || '');
    const [contactPhone, setContactPhone] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            toast({ title: "Authentication Error", variant: "destructive" });
            return;
        }

        setIsLoading(true);
        try {
            const newService = {
                providerId: user.id,
                name: user.name, // Using 'name' to match ServiceDetail page
                serviceName,
                price: `From ${price} DKK`,
                priceDetails,
                description, // Short description for the card
                longDescription, // Full "About Me" description
                postalCode,
                location,
                availability,
                experience,
                contactEmail,
                contactPhone,
                image: '/uploads/670ed39c-e49b-4baf-bdfa-6550e11d4230.png', // Placeholder Image
                rating: Math.floor(Math.random() * 2) + 4, // Random 4 or 5 star rating for now
                createdAt: new Date(),
            };

            await addDoc(collection(db, "services"), newService);
            toast({ title: "Success!", description: "Your new service has been added." });

            // Reset form fields after submission
            setServiceName(''); setPrice(''); setDescription(''); setLongDescription('');
            setPostalCode(''); setLocation(''); setAvailability(''); setExperience('');
            setPriceDetails(''); setContactEmail(user?.email || ''); setContactPhone('');

        } catch (error) {
            console.error("Error adding document: ", error);
            toast({ title: "Error", description: "Could not save the service details.", variant: "destructive" });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Describe Your Service</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="serviceName">Service Name</Label>
                    <Input id="serviceName" placeholder="e.g., Professional Dog Walking" value={serviceName} onChange={(e) => setServiceName(e.target.value)} required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="price">Starting Price (in DKK)</Label>
                        <Input id="price" type="number" placeholder="e.g., 40" value={price} onChange={(e) => setPrice(e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="priceDetails">Price Details</Label>
                        <Input id="priceDetails" placeholder="e.g., 40 kr for group, 60 kr for solo" value={priceDetails} onChange={(e) => setPriceDetails(e.target.value)} required />
                    </div>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="description">Short Description (for Service Card)</Label>
                    <Textarea id="description" placeholder="A brief, one-sentence summary of your service." value={description} onChange={(e) => setDescription(e.target.value)} required rows={2} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="longDescription">Full "About Me" Description</Label>
                    <Textarea id="longDescription" placeholder="Tell customers about yourself, your experience, and what makes your service special." value={longDescription} onChange={(e) => setLongDescription(e.target.value)} required rows={5} />
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="postalCode">Postal Code</Label>
                        <Input id="postalCode" placeholder="e.g., 4690" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="location">Location / City</Label>
                        <Input id="location" placeholder="e.g., Dalby" value={location} onChange={(e) => setLocation(e.target.value)} required />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <Label htmlFor="experience">Experience</Label>
                        <Input id="experience" placeholder="e.g., 2+ years" value={experience} onChange={(e) => setExperience(e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="availability">Availability</Label>
                        <Input id="availability" placeholder="e.g., Monday - Sunday, 7 AM - 7 PM" value={availability} onChange={(e) => setAvailability(e.target.value)} required />
                    </div>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="contactEmail">Public Contact Email</Label>
                        <Input id="contactEmail" type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="contactPhone">Public Contact Phone (Optional)</Label>
                        <Input id="contactPhone" type="tel" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} />
                    </div>
                </div>
                <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={isLoading}>
                  {isLoading ? 'Adding Service...' : 'Add Service'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      );
}

const AddService = () => {
  const { user } = useAuth();
  if (user?.subscriptionStatus === 'active') {
    return <ServiceForm />;
  } else {
    return <Pricing />;
  }
};

export default AddService;