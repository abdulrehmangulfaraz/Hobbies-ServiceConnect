// src/components/dashboard/Analytics.tsx

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp, Users, DollarSign, List } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';

// Define a type for our service data
interface Service {
  serviceName: string;
  rating: number;
}

const Analytics = () => {
  const { user } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchServiceData = async () => {
      try {
        // Query for all services provided by the current user
        const servicesCollection = collection(db, "services");
        const q = query(servicesCollection, where("providerId", "==", user.id));
        const querySnapshot = await getDocs(q);

        const fetchedServices = querySnapshot.docs.map(doc => doc.data() as Service);
        setServices(fetchedServices);

      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServiceData();
  }, [user]);

  // Static stats for now, can be replaced with real data later
  const stats = [
    { title: 'Profile Views', value: '2,847', change: '+12%', icon: Users, color: 'text-blue-600' },
    { title: 'Total Services', value: services.length, change: '', icon: List, color: 'text-green-600' },
    { title: 'Revenue (Month)', value: '$1,234', change: '+23%', icon: DollarSign, color: 'text-purple-600' },
    { title: 'Conversion Rate', value: '12.4%', change: '+2.1%', icon: TrendingUp, color: 'text-orange-600' }
  ];

  if (isLoading) {
    return <Skeleton className="h-96 w-full" />;
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  {stat.change && <p className={`text-sm ${stat.color}`}>{stat.change} from last month</p>}
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                <p className="text-gray-600">Revenue chart placeholder</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Service Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {services.length > 0 ? (
                services.map((service, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{service.serviceName}</span>
                    <div className="flex items-center space-x-2">
                      {/* Performance is based on rating out of 5, converted to a percentage */}
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-pink-600 h-2 rounded-full" style={{ width: `${(service.rating / 5) * 100}%` }}></div>
                      </div>
                      <span className="text-sm font-medium">{service.rating}/5</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">You have not added any services yet.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;