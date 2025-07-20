// src/components/dashboard/Analytics.tsx

import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Users, DollarSign, List } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';

interface Service {
  serviceName: string;
  rating: number;
  price: string;
}

const getConsistentRandomNumber = (seed: string, max: number, min = 0) => {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        const char = seed.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0;
    }
    const random = Math.abs(hash);
    return (random % (max - min + 1)) + min;
};

const Analytics = () => {
  const { user } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [simulatedStats, setSimulatedStats] = useState({
    profileViews: "0",
    monthlyRevenue: "$0",
    conversionRate: "0%",
    chartData: [] as { name: string, revenue: number }[]
  });

  useEffect(() => {
    if (!user) return;

    const fetchAndSimulateData = async () => {
      try {
        const servicesCollection = collection(db, "services");
        const q = query(servicesCollection, where("providerId", "==", user.id));
        const querySnapshot = await getDocs(q);
        const fetchedServices = querySnapshot.docs.map(doc => doc.data() as Service);
        setServices(fetchedServices);

        if (fetchedServices.length === 0) {
            setSimulatedStats({
                profileViews: "0",
                monthlyRevenue: "$0",
                conversionRate: "0%",
                chartData: []
            });
        } else {
            const totalServices = fetchedServices.length;
            let totalBasePrice = 0;
            fetchedServices.forEach(service => {
                const priceMatch = service.price?.match(/\d+/);
                if (priceMatch) {
                    totalBasePrice += parseInt(priceMatch[0], 10);
                }
            });

            const seed = `${user.id}-${totalServices}-${totalBasePrice}`;
            const profileViews = getConsistentRandomNumber(seed, 500 * totalServices, 100 * totalServices);
            const monthlyRevenue = getConsistentRandomNumber(seed, 15 * totalBasePrice, 5 * totalBasePrice);
            const bookings = getConsistentRandomNumber(seed, 5 * totalServices, 1 * totalServices);
            // Make Conversion Rate dependent on other simulated numbers
            const conversionRate = profileViews > 0 ? ((bookings / profileViews) * 100).toFixed(1) : "0";

            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
            const chartData = months.map(month => ({
              name: month,
              revenue: getConsistentRandomNumber(user.id + month + totalServices, monthlyRevenue / 3, monthlyRevenue / 6),
            }));

            setSimulatedStats({
              profileViews: profileViews.toLocaleString(),
              monthlyRevenue: `$${monthlyRevenue.toLocaleString()}`,
              conversionRate: `${conversionRate}%`,
              chartData
            });
        }

      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndSimulateData();
  }, [user]);

  const stats = [
    { title: 'Profile Views', value: simulatedStats.profileViews, change: '+12%', icon: Users, color: 'text-blue-600' },
    { title: 'Total Services', value: services.length.toString(), change: '', icon: List, color: 'text-green-600' },
    { title: 'Revenue (Month)', value: simulatedStats.monthlyRevenue, change: '+23%', icon: DollarSign, color: 'text-purple-600' },
    { title: 'Conversion Rate', value: simulatedStats.conversionRate, change: '+2.1%', icon: TrendingUp, color: 'text-orange-600' }
  ];

  if (isLoading) {
    return <Skeleton className="h-96 w-full" />;
  }

  return (
    <div className="space-y-6">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Monthly Revenue</CardTitle></CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={simulatedStats.chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.5}/>
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} />
                  <YAxis stroke="#888888" fontSize={12} tickFormatter={(value) => `$${value}`} />
                  <Tooltip cursor={{fill: '#fce7f3'}} contentStyle={{backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '0.5rem'}}/>
                  <Bar dataKey="revenue" fill="#db2777" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Service Performance</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              {services.length > 0 ? (
                services.map((service, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{service.serviceName}</span>
                    <div className="flex items-center space-x-2">
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