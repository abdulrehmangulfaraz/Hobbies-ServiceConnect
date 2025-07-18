
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, CreditCard } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: 'Basic',
      price: '$19',
      period: 'month',
      description: 'Perfect for getting started',
      features: [
        'List up to 3 services',
        'Basic messaging',
        'Standard support',
        'Basic analytics'
      ],
      current: true
    },
    {
      name: 'Premium',
      price: '$39',
      period: 'month',
      description: 'Most popular for growing businesses',
      popular: true,
      features: [
        'Unlimited services',
        'Priority messaging',
        'Advanced analytics',
        'Premium support',
        'Featured listings',
        'Custom branding'
      ],
      current: false
    },
    {
      name: 'Enterprise',
      price: '$79',
      period: 'month',
      description: 'For established service providers',
      features: [
        'Everything in Premium',
        'Multi-location support',
        'API access',
        'Dedicated account manager',
        'Custom integrations',
        'White-label options'
      ],
      current: false
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Select the perfect plan for your business needs. All plans include our core features 
          and can be upgraded or downgraded at any time.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <Card key={index} className={`relative ${plan.popular ? 'border-2 border-pink-500' : ''} ${plan.current ? 'ring-2 ring-green-500' : ''}`}>
            {plan.popular && (
              <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-pink-500">
                Most Popular
              </Badge>
            )}
            {plan.current && (
              <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-green-500">
                Current Plan
              </Badge>
            )}
            
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
                className={`w-full ${plan.current 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : plan.popular 
                    ? 'bg-pink-600 hover:bg-pink-700' 
                    : 'bg-gray-600 hover:bg-gray-700'
                }`}
                disabled={plan.current}
              >
                {plan.current ? (
                  <>
                    <Star className="h-4 w-4 mr-2" />
                    Current Plan
                  </>
                ) : (
                  <>
                    <CreditCard className="h-4 w-4 mr-2" />
                    {plan.popular ? 'Upgrade Now' : 'Select Plan'}
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gray-50">
        <CardContent className="p-8 text-center">
          <h3 className="text-xl font-semibold mb-4">Need a custom solution?</h3>
          <p className="text-gray-600 mb-6">
            Contact our sales team for enterprise pricing and custom features 
            tailored to your specific business requirements.
          </p>
          <Button variant="outline">
            Contact Sales
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Pricing;
