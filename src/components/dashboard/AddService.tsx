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
import { Link } from 'react-router-dom';
import { Upload, Loader2 } from 'lucide-react';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue // Import Select components
} from '@/components/ui/select';


// ⬇️ ACTION REQUIRED: Replace these with your Cloudinary details ⬇️
const CLOUDINARY_CLOUD_NAME = "dxvvpd8rn";
const CLOUDINARY_UPLOAD_PRESET = "hobbies_preset"; // The same preset you created earlier

interface AddServiceProps {
  navigateToTab: (tabId: string) => void;
}

// Define the categories. You can expand this list as needed.
const categories = [
  'Dog Walking',
  'House Cleaning',
  'Plumbing',
  'Electrical',
  'Gardening',
  'Tutoring',
  'Pet Sitting',
  'Handyman',
  'Beauty Services'
];


const ServiceForm = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const [serviceName, setServiceName] = useState('');
  const [category, setCategory] = useState(''); // New state for category
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [location, setLocation] = useState('');
  const [availability, setAvailability] = useState('');
  const [experience, setExperience] = useState('');
  const [priceDetails, setPriceDetails] = useState('');
  const [contactEmail, setContactEmail] = useState(user?.email || '');

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = async () => {
    if (!imageFile) {
      toast({ title: "Image Required", description: "Please select an image for your service.", variant: "destructive" });
      return null;
    }
    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Image upload failed');
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      toast({ title: "Image Upload Failed", description: "Could not upload the service image.", variant: "destructive" });
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({ title: "Authentication Error", variant: "destructive" });
      return;
    }

    // Add validation for category selection
    if (!category) {
      toast({ title: "Category Required", description: "Please select a category for your service.", variant: "destructive" });
      return;
    }

    setIsLoading(true);

    const imageUrl = await handleImageUpload();
    if (!imageUrl) {
      setIsLoading(false);
      return; // Stop if image upload fails
    }

    try {
      const newService = {
        providerId: user.id,
        name: user.name,
        providerImageUrl: user.imageUrl || '',
        contactPhone: user.phone || '',
        serviceName,
        category, // Include the selected category
        price: `From ${price} DKK`,
        priceDetails,
        description,
        longDescription,
        postalCode,
        location,
        availability,
        experience,
        contactEmail,
        image: imageUrl, // Use the new Cloudinary URL
        rating: Math.floor(Math.random() * 2) + 4,
        createdAt: new Date(),
      };
      await addDoc(collection(db, "services"), newService);
      toast({ title: "Success!", description: "Your new service has been added." });
      // Reset form
      setServiceName(''); setCategory(''); setPrice(''); setDescription(''); setLongDescription(''); // Reset category
      setPostalCode(''); setLocation(''); setAvailability(''); setExperience('');
      setPriceDetails(''); setContactEmail(user?.email || ''); setImageFile(null);
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
        <CardHeader><CardTitle>Describe Your Service</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="serviceName">Service Name</Label>
              <Input id="serviceName" placeholder="e.g., Professional Dog Walking" value={serviceName} onChange={(e) => setServiceName(e.target.value)} required />
            </div>

            {/* Category Dropdown */}
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Service Image Upload */}
            <div className="space-y-2">
              <Label htmlFor="serviceImage">Service Image</Label>
              <Input id="serviceImage" type="file" accept="image/*" onChange={(e) => e.target.files && setImageFile(e.target.files[0])} className="file:text-pink-600" required />
              {imageFile && <p className="text-sm text-gray-500 mt-1">Selected: {imageFile.name}</p>}
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
            </div>
            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={isLoading || isUploading}>
              {isLoading || isUploading ? 'Saving Service...' : 'Add Service'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

const AddService = ({ navigateToTab }: AddServiceProps) => {
  const { user } = useAuth();
  if (!user?.planName || user.planName === 'none') return <Pricing />;
  if (!user.phone) {
    return (
      <Card className="max-w-2xl mx-auto text-center">
        <CardHeader><CardTitle>Phone Number Required</CardTitle></CardHeader>
        <CardContent>
          <p className="mb-4 text-muted-foreground">
            Please add a phone number to your profile before you can list a new service.
          </p>
          <Button onClick={() => navigateToTab('settings')}>Go to Settings</Button>
        </CardContent>
      </Card>
    );
  }
  return <ServiceForm />;
};

export default AddService;