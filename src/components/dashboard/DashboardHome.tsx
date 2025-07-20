// src/components/dashboard/DashboardHome.tsx

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Book, Calendar, Star, CreditCard, List } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';

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

const DashboardHome = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalServices: 0,
    averageRating: 0,
    upcomingBookings: 0,
    monthlyRevenue: "0",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchDashboardData = async () => {
      try {
        const servicesCollection = collection(db, "services");
        const q = query(servicesCollection, where("providerId", "==", user.id));
        const querySnapshot = await getDocs(q);

        const services = querySnapshot.docs.map(doc => doc.data());
        const totalServices = services.length;

        if (totalServices === 0) {
          setStats({
            totalServices: 0,
            averageRating: 0,
            upcomingBookings: 0,
            monthlyRevenue: "0",
          });
        } else {
          let totalRating = 0;
          // NEW: Calculate the total base price of all services
          let totalBasePrice = 0;
          services.forEach(service => {
            totalRating += service.rating || 0;
            // Extracts the number from a string like "From 40 DKK"
            const priceMatch = service.price?.match(/\d+/);
            if (priceMatch) {
                totalBasePrice += parseInt(priceMatch[0], 10);
            }
          });
          const averageRating = totalServices > 0 ? (totalRating / totalServices) : 0;

          // --- UPDATED SIMULATED DATA LOGIC ---
          // The seed now includes the total price for more realistic scaling
          const seed = `${user.id}-${totalServices}-${totalBasePrice}`;
          const upcomingBookings = getConsistentRandomNumber(seed, 5 * totalServices, 1 * totalServices);
          // Revenue is now based on the sum of service prices
          const monthlyRevenue = getConsistentRandomNumber(seed, 15 * totalBasePrice, 5 * totalBasePrice);

          setStats({
            totalServices,
            averageRating: parseFloat(averageRating.toFixed(1)),
            upcomingBookings,
            monthlyRevenue: monthlyRevenue.toLocaleString(),
          });
        }

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
                <p className="text-2xl font-bold text-gray-900">{stats.upcomingBookings}</p>
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
                <p className="text-2xl font-bold text-gray-900">${stats.monthlyRevenue}</p>
              </div>
              <CreditCard className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader><CardTitle>Recent Activity</CardTitle></CardHeader>
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