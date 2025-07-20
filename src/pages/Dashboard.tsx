// src/pages/Dashboard.tsx

import { useState, useEffect } from 'react'; // Keep existing useEffect
import { useLocation, useNavigate } from 'react-router-dom'; // ADDED: For URL parameters and navigation
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger
} from '@/components/ui/sidebar';
import { useAuth } from '../contexts/AuthContext'; // Keep original relative path
import { useToast } from '@/hooks/use-toast'; // ADDED: For displaying toasts

import {
  Plus,
  Settings,
  BarChart3,
  CreditCard,
  User,
  Home
} from 'lucide-react';
import DashboardHome from '../components/dashboard/DashboardHome';
import AddService from '../components/dashboard/AddService';
import DashboardSettings from '../components/dashboard/DashboardSettings';
import Analytics from '../components/dashboard/Analytics';
import Pricing from '../components/dashboard/Pricing';

const Dashboard = () => {
  // Destructure updateSubscription from useAuth for plan updates
  const { user, updateSubscription } = useAuth();
  const { toast } = useToast(); // Initialize useToast
  const location = useLocation(); // Initialize useLocation
  const navigate = useNavigate(); // Initialize useNavigate
  const [activeTab, setActiveTab] = useState('home');

  // ADDED: useEffect to handle logic upon returning from Stripe
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const paymentStatus = queryParams.get('payment_status');
    const sessionId = queryParams.get('session_id');

    // Use sessionStorage to prevent re-processing on simple page refresh
    // This flag should be cleared when a user logs out or leaves the app for a long time
    const hasProcessedPayment = sessionStorage.getItem('hasProcessedPayment');

    if (paymentStatus === 'success' && sessionId && user && !hasProcessedPayment) {
      console.log("Stripe successful return detected for session ID:", sessionId);

      // --- ⚠️ WARNING: INSECURE CLIENT-SIDE DEMONSTRATION ONLY ⚠️ ---
      // In a real, secure application, you MUST verify this `sessionId`
      // on your backend with Stripe's API before updating the user's plan in Firestore.
      // The secure method involves Stripe Webhooks (e.g., listening for 'checkout.session.completed' events).
      // This client-side update is for immediate feedback demonstration ONLY.

      // Simulate successful plan update (assuming 'Premium' for this demo; adapt as needed for 'Basic')
      updateSubscription('Premium') // Replace 'Premium' with logic to determine actual purchased plan
        .then(() => {
          toast({ title: "Payment Successful!", description: "Your plan has been updated!" });
          sessionStorage.setItem('hasProcessedPayment', 'true'); // Mark as processed for this session
          // Clean the URL to remove query parameters
          navigate('/dashboard', { replace: true }); // Use replace to avoid adding to browser history
        })
        .catch(error => {
          console.error("Failed to update subscription locally:", error);
          toast({ title: "Payment Error", description: "There was an issue updating your plan. Please contact support.", variant: "destructive" });
          navigate('/dashboard', { replace: true }); // Clean URL even on error
        });

    } else if (paymentStatus === 'cancelled') {
      toast({ title: "Payment Cancelled", description: "You chose not to complete the payment." });
      sessionStorage.removeItem('hasProcessedPayment'); // Clear flag if they cancelled
      navigate('/dashboard', { replace: true }); // Clean the URL
    }
    // No action needed if paymentStatus is null/not recognized or if already processed
  }, [location.search, user, navigate, toast, updateSubscription]); // Dependencies for useEffect

  // Original function for handling navigation from child components
  const navigateToTab = (tabId: string) => {
    setActiveTab(tabId);
  };

  const menuItems = [
    { id: 'home', label: 'Dashboard', icon: Home },
    { id: 'add-service', label: 'Add Service', icon: Plus },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'pricing', label: 'Pricing', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <DashboardHome />;
      case 'add-service':
        // Pass the navigateToTab function as a prop
        return <AddService navigateToTab={navigateToTab} />;
      case 'analytics':
        return <Analytics />;
      case 'pricing':
        return <Pricing />;
      case 'settings':
        return <DashboardSettings />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar className="border-r">
          <SidebarHeader className="p-4">
            <div className="flex items-center space-x-2">
              <User className="h-8 w-8 text-pink-600" />
              <div>
                <h2 className="font-semibold text-gray-900">{user?.name}</h2>
                <p className="text-sm text-gray-500">Service Provider</p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => setActiveTab(item.id)}
                    isActive={activeTab === item.id}
                    className="w-full justify-start"
                  >
                    <item.icon className="h-4 w-4 mr-2" />
                    {item.label}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        <SidebarInset className="flex-1">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="h-4 w-px bg-border mx-2" />
            <h1 className="text-lg font-semibold">
              {menuItems.find(item => item.id === activeTab)?.label}
            </h1>
          </header>
          <main className="flex-1 p-6">
            {renderContent()}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;