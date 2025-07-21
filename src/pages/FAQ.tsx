
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const FAQ = () => {
  const faqs = [
    {
      question: "How do I get started as a service provider?",
      answer: "Simply sign up for an account, complete your profile, and start listing your services. You can choose from various categories like dog walking, house cleaning, tutoring, and more."
    },
    {
      question: "How much does it cost to use ServiceConnect?",
      answer: "Creating an account and browsing services is completely free. Service providers can start with our Basic plan at $19/month or upgrade to Premium for $39/month for additional features."
    },
    {
      question: "How do I contact a service provider?",
      answer: "Click on any service card to view the provider's profile, then use the message button to send them a direct message. They'll receive your message and can respond directly."
    },
    {
      question: "How are service providers verified?",
      answer: "All service providers go through our verification process, including identity verification and background checks where applicable. Look for the verified badge on their profiles."
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept all major credit cards, PayPal, and bank transfers. Payments are processed securely through our platform to protect both customers and service providers."
    },
    {
      question: "How do I leave a review?",
      answer: "After using a service, you'll receive an email invitation to leave a review. You can also access your booking history in your account to leave reviews for past services."
    },
    {
      question: "What if I'm not satisfied with a service?",
      answer: "We have a satisfaction guarantee. If you're not happy with a service, contact our support team within 24 hours and we'll work to resolve the issue, including offering refunds when appropriate."
    },
    {
      question: "Can I modify or cancel a booking?",
      answer: "Yes, you can modify or cancel bookings through your account dashboard. Please note that cancellation policies may vary by service provider, so check their specific terms."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about using ServiceConnect to find local services or offer your own.
          </p>
        </div>

        {/* FAQ Section */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">Common Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left hover:text-red-600">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-red-50 to-pink-50 border-red-200">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Still have questions?
              </h2>
              <p className="text-gray-600 mb-6">
                Can't find the answer you're looking for? Our support team is here to help.
              </p>
              <TooltipProvider>
      <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
        
        {/* Email Support with Tooltip */}
        <Tooltip>
          <TooltipTrigger asChild>
            <a
              href="mailto:support@serviceconnect.com"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors"
            >
              Email Support
            </a>
          </TooltipTrigger>
          <TooltipContent>
            info@hobbiies.dk
          </TooltipContent>
        </Tooltip>

        {/* Call Us with Tooltip */}
        <Tooltip>
          <TooltipTrigger asChild>
            <a
              href="tel:+1234567890"
              className="inline-flex items-center px-6 py-3 border border-red-300 text-base font-medium rounded-md text-red-700 bg-white hover:bg-red-50 transition-colors"
            >
              Call Us
            </a>
          </TooltipTrigger>
          <TooltipContent>
            +1 (234) 567-890
          </TooltipContent>
        </Tooltip>

      </div>
    </TooltipProvider>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
