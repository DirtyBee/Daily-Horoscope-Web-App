import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
}

const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 9.99,
    features: ['Daily horoscopes', 'Monthly forecast', 'Access to basic articles']
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 19.99,
    features: ['All Basic features', 'Personalized weekly reports', 'Exclusive video content', 'Priority customer support']
  },
  {
    id: 'ultimate',
    name: 'Ultimate',
    price: 29.99,
    features: ['All Premium features', 'One-on-one astrology consultation (monthly)', 'Custom birth chart analysis', 'Early access to new features']
  }
];

const SubscriptionOfferings: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements || !selectedPlan) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement)!,
      });

      if (error) {
        throw new Error(error.message);
      }

      // In a real application, you would send this to your backend
      const response = await axios.post('/api/create-subscription', {
        paymentMethodId: paymentMethod.id,
        planId: selectedPlan.id,
      });

      if (response.data.success) {
        setSuccess(true);
      } else {
        throw new Error('Subscription failed. Please try again.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg text-white">
      <h2 className="text-3xl font-light mb-6">Subscription Plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {subscriptionPlans.map((plan) => (
          <div key={plan.id} className="bg-indigo-600 bg-opacity-20 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
            <p className="text-2xl mb-4">${plan.price}/month</p>
            <ul className="mb-4">
              {plan.features.map((feature, index) => (
                <li key={index} className="mb-2">✨ {feature}</li>
              ))}
            </ul>
            <button
              onClick={() => setSelectedPlan(plan)}
              className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-300"
            >
              Select Plan
            </button>
          </div>
        ))}
      </div>

      {selectedPlan && (
        <form onSubmit={handleSubmit} className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Subscribe to {selectedPlan.name} Plan</h3>
          <div className="mb-4">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#ffffff',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
            />
          </div>
          <button
            type="submit"
            disabled={!stripe || loading}
            className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-300 disabled:opacity-50"
          >
            {loading ? 'Processing...' : `Subscribe for $${selectedPlan.price}/month`}
          </button>
        </form>
      )}

      {error && <p className="mt-4 text-red-400">{error}</p>}
      {success && <p className="mt-4 text-green-400">Subscription successful! Welcome to your new plan.</p>}
    </div>
  );
};

export default SubscriptionOfferings;