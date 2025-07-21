// src/components/dashboard/DashboardSettings.tsx

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { User, Upload, Loader2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// ⬇️ ACTION REQUIRED: Replace these with your Cloudinary details ⬇️
const CLOUDINARY_CLOUD_NAME = "dxvvpd8rn"; // Corrected based on your image
const CLOUDINARY_UPLOAD_PRESET = "hobbies_preset"; // The name you created in the last step

const DashboardSettings = () => {
  const { user, updateUserProfile } = useAuth();
  const { toast } = useToast();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [description, setDescription] = useState(user?.description || '');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
      setDescription(user.description || '');
    }
  }, [user]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  // This function handles the direct upload to Cloudinary
  const handleImageUpload = async () => {
    if (!imageFile) return null;
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
      return data.secure_url; // This is the URL of the uploaded image
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      toast({ title: "Image Upload Failed", description: "Could not upload your profile picture.", variant: "destructive" });
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let imageUrl = user?.imageUrl; // Keep the existing image URL by default

      // If a new file is selected, upload it first
      if (imageFile) {
        const newImageUrl = await handleImageUpload();
        if (newImageUrl) {
          imageUrl = newImageUrl;
        } else {
          // If upload fails, stop the submission
          setIsSubmitting(false);
          return;
        }
      }

      // Save all data, including the new or existing image URL, to Firestore
      await updateUserProfile({ name, phone, description, imageUrl });
      toast({ title: "Success!", description: "Your profile has been updated." });
      setImageFile(null); // Clear the selected file
    } catch (error) {
      console.error("Profile update error:", error);
      toast({ title: "Error", description: "Could not update your profile.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader><CardTitle>Profile Settings</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center space-x-6">
              {/* Display the user's current avatar */}
              <Avatar className="h-20 w-20">
                <AvatarImage src={user?.imageUrl} alt={user?.name || ''} />
                <AvatarFallback>
                    <User className="h-10 w-10 text-gray-600" />
                </AvatarFallback>
              </Avatar>
              <div>
                <Input id="profileImage" type="file" accept="image/*" onChange={handleImageChange} className="hidden" disabled={isUploading} />
                <Label htmlFor="profileImage" className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                   {isUploading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Upload className="h-4 w-4 mr-2" />}
                   {isUploading ? 'Uploading...' : 'Upload Photo'}
                </Label>
                {imageFile && <p className="text-sm text-gray-500 mt-1">{imageFile.name}</p>}
              </div>
            </div>

            {/* Other form fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your full name" required/>
                </div>
                <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" value={email} placeholder="Email cannot be changed" disabled/>
                </div>
            </div>
            <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter your phone number" required/>
            </div>
            <div>
                <Label htmlFor="description">About You</Label>
                <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Tell customers about yourself and your services" rows={4}/>
            </div>

            <Button type="submit" className="w-full bg-pink-600 hover:bg-pink-700" disabled={isSubmitting || isUploading}>
              {(isSubmitting || isUploading) ? 'Saving...' : 'Update Profile'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardSettings;