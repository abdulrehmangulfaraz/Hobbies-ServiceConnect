
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin } from 'lucide-react';

interface ServiceCardProps {
  id: string;
  name: string;
  image: string;
  serviceName: string;
  description: string;
  rating: number;
  postalCode: string;
  price: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  name,
  image,
  serviceName,
  description,
  rating,
  postalCode,
  price
}) => {
  return (
    <Link to={`/service/${id}`} className="block group">
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02] bg-white">
        <div className="relative">
          <img
            src={image}
            alt={name}
            className="w-full h-48 sm:h-56 object-cover"
          />
          <div className="absolute top-4 right-4">
            <Badge className="bg-pink-500 text-white px-2 py-1 text-xs">
              {serviceName}
            </Badge>
          </div>
        </div>
        
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center text-white font-semibold">
              {name.charAt(0)}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{name}</h3>
              <div className="flex items-center space-x-1">
                <MapPin className="h-3 w-3 text-pink-500" />
                <span className="text-xs text-gray-600">{postalCode}</span>
              </div>
            </div>
          </div>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">({rating}.0)</span>
            </div>
            <div className="text-right">
              <span className="text-lg font-bold text-gray-900">{price}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ServiceCard;
