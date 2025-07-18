
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageCircle, User, Reply } from 'lucide-react';

const Messages = () => {
  const messages = [
    {
      id: 1,
      from: 'Sarah Johnson',
      subject: 'House Cleaning Service Inquiry',
      message: 'Hi! I\'m interested in your house cleaning service. Could you provide more details about pricing for a 3-bedroom house?',
      time: '2 hours ago',
      read: false,
      service: 'House Cleaning'
    },
    {
      id: 2,
      from: 'Mike Chen',
      subject: 'Plumbing Service',
      message: 'I have a leaky faucet that needs fixing. Are you available this weekend?',
      time: '5 hours ago',
      read: true,
      service: 'Plumbing'
    },
    {
      id: 3,
      from: 'Emily Davis',
      subject: 'Garden Maintenance',
      message: 'Looking for regular garden maintenance. What\'s your monthly rate?',
      time: '1 day ago',
      read: true,
      service: 'Gardening'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Messages</h2>
        <Badge variant="secondary">
          {messages.filter(m => !m.read).length} unread
        </Badge>
      </div>

      <div className="space-y-4">
        {messages.map((message) => (
          <Card key={message.id} className={`${!message.read ? 'border-pink-200 bg-pink-50' : ''}`}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{message.from}</CardTitle>
                    <p className="text-sm text-gray-600">{message.subject}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{message.time}</p>
                  {!message.read && (
                    <Badge className="mt-1 bg-pink-600">New</Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Badge variant="outline" className="mb-2">
                  Service: {message.service}
                </Badge>
                <p className="text-gray-700">{message.message}</p>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" className="bg-pink-600 hover:bg-pink-700">
                  <Reply className="h-4 w-4 mr-1" />
                  Reply
                </Button>
                <Button size="sm" variant="outline">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {messages.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <MessageCircle className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-semibold mb-2">No messages yet</h3>
            <p className="text-gray-600">
              When customers contact you about your services, their messages will appear here.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Messages;
