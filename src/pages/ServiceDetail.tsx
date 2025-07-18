
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Star, MapPin, MessageCircle, Phone, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const mockServiceDetails = {
  '1': {
    id: '1',
    name: 'Maja',
    image: '/uploads/670ed39c-e49b-4baf-bdfa-6550e11d4230.png',
    serviceName: 'Dog Walking',
    description: 'Hey! I am a young girl from Dalby who loves animals. I offer dog walking services in the Dalby area.',
    longDescription: 'I am passionate about animals and have been walking dogs for over 2 years. I understand that every dog is unique and has different needs. I provide reliable, caring service and always make sure your furry friends get the exercise and attention they deserve.',
    rating: 5,
    postalCode: '4690',
    location: 'Dalby',
    price: 'From 40 DKK',
    priceDetails: '40 kr for group walks (2+ dogs) or 60 kr for solo walks',
    availability: 'Monday - Sunday, 7 AM - 7 PM',
    experience: '2+ years'
  }
};

const ServiceDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [message, setMessage] = useState('');
  const [isMessageSent, setIsMessageSent] = useState(false);
  
  const service = mockServiceDetails[id as keyof typeof mockServiceDetails];

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

  const handleSendMessage = () => {
    if (!message.trim()) {
      toast({
        title: "Message required",
        description: "Please enter a message before sending.",
        variant: "destructive"
      });
      return;
    }

    console.log('Sending message:', message);
    setIsMessageSent(true);
    setMessage('');
    
    toast({
      title: "Message sent!",
      description: `Your message has been sent to ${service.name}. They will get back to you soon.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Service Provider Header */}
        <Card className="mb-8 overflow-hidden">
          <div className="relative h-64 sm:h-80">
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4">
              <Badge className="bg-pink-500 text-white px-3 py-1">
                {service.serviceName}
              </Badge>
            </div>
          </div>
          
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  {service.name}
                </h1>
                <div className="flex items-center space-x-4 text-gray-600 mb-4">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4 text-pink-500" />
                    <span>{service.location} ({service.postalCode})</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < service.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="ml-1">({service.rating}.0)</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {service.price}
                </div>
                <div className="text-sm text-gray-600">
                  {service.priceDetails}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">About Me</h2>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <p className="text-gray-600">{service.longDescription}</p>
              </CardContent>
            </Card>

            {/* Service Details */}
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

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Send Message</h2>
                
                {!isMessageSent ? (
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Hi! I'm interested in your dog walking service..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      className="resize-none"
                    />
                    <Button 
                      onClick={handleSendMessage}
                      className="w-full bg-pink-600 hover:bg-pink-700"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Message Sent!</h3>
                    <p className="text-gray-600 text-sm">
                      {service.name} will get back to you soon.
                    </p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => {
                        setIsMessageSent(false);
                        setMessage('');
                      }}
                    >
                      Send Another Message
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Email
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
