// src/components/dashboard/AddService.tsx

import { useAuth } from '@/contexts/AuthContext';
import Pricing from './Pricing';

// This is a placeholder for the form we will build in the next step.
const ServiceForm = () => {
    return (
        <div className="max-w-2xl mx-auto text-center py-12">
            <h2 className="text-2xl font-bold">Add Your Service Details</h2>
            <p className="mt-4 text-lg text-gray-600">You have an active subscription! We will build the service form here in the next step.</p>
        </div>
    )
}

const AddService = () => {
  const { user } = useAuth();

  // If the user has an active subscription, show the form placeholder.
  // Otherwise, show the Pricing component so they can subscribe.
  if (user?.subscriptionStatus === 'active') {
    return <ServiceForm />;
  } else {
    return <Pricing />;
  }
};

export default AddService;