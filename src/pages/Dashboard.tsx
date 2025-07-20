// src/pages/Dashboard.tsx

import { useState } from 'react';
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
import { useAuth } from '../contexts/AuthContext';
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
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('home');

  // New function to handle navigation from child components
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