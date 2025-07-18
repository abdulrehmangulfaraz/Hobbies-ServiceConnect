
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CreditCard, Upload } from 'lucide-react';

const AddService = () => {
  const [serviceName, setServiceName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [hasSubscription] = useState(false); // Mock subscription status

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasSubscription) {
      alert('Please purchase a subscription to add services!');
      return;
    }
    // Handle service submission
    console.log({ serviceName, price, description, postalCode, image });
  };

  if (!hasSubscription) {
    return (
      <div className="max-w-2xl mx-auto">
        <Alert className="mb-6">
          <CreditCard className="h-4 w-4" />
          <AlertDescription>
            You need an active subscription to add services. Please upgrade your plan to continue.
          </AlertDescription>
        </Alert>
        
        <Card className="text-center">
          <CardContent className="p-8">
            <CreditCard className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <h2 className="text-xl font-semibold mb-2">Subscription Required</h2>
            <p className="text-gray-600 mb-6">
              To add and manage your services, you need an active subscription plan.
            </p>
            <Button className="bg-pink-600 hover:bg-pink-700">
              View Pricing Plans
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Add New Service</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="serviceName">Service Name</Label>
              <Input
                id="serviceName"
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
                placeholder="e.g., House Cleaning"
                required
              />
            </div>

            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your service"
                rows={4}
                required
              />
            </div>

            <div>
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input
                id="postalCode"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                placeholder="Enter your postal code"
                required
              />
            </div>

            <div>
              <Label htmlFor="image">Service Image</Label>
              <div className="mt-2">
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <Label
                  htmlFor="image"
                  className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {image ? image.name : 'Choose Image'}
                </Label>
              </div>
            </div>

            <Button type="submit" className="w-full bg-pink-600 hover:bg-pink-700">
              Add Service
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddService;
