// src/components/dashboard/Pricing.tsx

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, CreditCard } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Pricing = () => {
  const { updateSubscription } = useAuth();
  const { toast } = useToast();

  const handlePlanSelection = async (planName: string) => {
    // In a real app, this would trigger a Stripe checkout flow.
    // Here, we'll just simulate the successful purchase.
    console.log(`User selected ${planName}`);
    try {
        await updateSubscription('active');
        toast({
            title: "Subscription Activated!",
            description: `You can now add services to your profile.`
        });
    } catch (error) {
        toast({
            title: "Error",
            description: `Could not update subscription. Please try again.`,
            variant: "destructive"
        });
    }
  };

  const plans = [
    {
      name: 'Basic', price: '$19', period: 'month', description: 'Perfect for getting started',
      features: ['List up to 3 services', 'Basic messaging', 'Standard support', 'Basic analytics'],
    },
    {
      name: 'Premium', price: '$39', period: 'month', description: 'Most popular for growing businesses', popular: true,
      features: ['Unlimited services', 'Priority messaging', 'Advanced analytics', 'Premium support', 'Featured listings'],
    },
    {
      name: 'Enterprise', price: '$79', period: 'month', description: 'For established providers',
      features: ['Everything in Premium', 'Multi-location support', 'API access', 'Dedicated account manager'],
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          You need an active subscription to list your services. Select a plan to get started.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <Card key={index} className={`relative ${plan.popular ? 'border-2 border-pink-500' : ''}`}>
            {plan.popular && ( <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-pink-500">Most Popular</Badge> )}

            <CardHeader className="text-center">
              <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
              <div className="mt-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-gray-600">/{plan.period}</span>
              </div>
              <p className="text-gray-600 mt-2">{plan.description}</p>
            </CardHeader>

            <CardContent>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className={`w-full ${plan.popular ? 'bg-pink-600 hover:bg-pink-700' : 'bg-gray-600 hover:bg-gray-700'}`}
                onClick={() => handlePlanSelection(plan.name)}
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Select Plan
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Pricing;