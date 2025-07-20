// src/components/dashboard/DashboardHome.tsx

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Book, Calendar, Star, CreditCard, List } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';

const DashboardHome = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalServices: 0,
    averageRating: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchDashboardData = async () => {
      try {
        // Create a query to get all services created by the current user
        const servicesCollection = collection(db, "services");
        const q = query(servicesCollection, where("providerId", "==", user.id));
        const querySnapshot = await getDocs(q);

        const services = querySnapshot.docs.map(doc => doc.data());
        const totalServices = services.length;

        // Calculate the average rating
        let totalRating = 0;
        services.forEach(service => {
          totalRating += service.rating || 0;
        });
        const averageRating = totalServices > 0 ? (totalRating / totalServices) : 0;

        setStats({
          totalServices,
          averageRating: parseFloat(averageRating.toFixed(1)), // Format to one decimal place
        });

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-28 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Services Listed</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalServices}</p>
              </div>
              <List className="h-8 w-8 text-pink-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Upcoming Bookings</p>
                <p className="text-2xl font-bold text-gray-900">12</p> {/* Placeholder */}
              </div>
              <Calendar className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Average Rating</p>
                <p className="text-2xl font-bold text-gray-900">{stats.averageRating}</p>
              </div>
              <Star className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Revenue (Monthly)</p>
                <p className="text-2xl font-bold text-gray-900">$1,234</p> {/* Placeholder */}
              </div>
              <CreditCard className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Section (can be implemented later) */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <Book className="h-12 w-12 mx-auto mb-2" />
            <p>Recent activity and notifications will appear here.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardHome;