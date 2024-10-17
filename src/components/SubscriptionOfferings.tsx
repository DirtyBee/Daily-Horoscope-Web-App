import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { Check, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

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
  const { addToCart, cart } = useCart();
  const [addedToCart, setAddedToCart] = useState<{ [key: string]: boolean }>({});

  const handleAddToCart = (plan: SubscriptionPlan) => {
    addToCart({
      id: parseInt(plan.id),
      name: `${plan.name} Subscription`,
      price: plan.price,
      quantity: 1
    });
    setAddedToCart(prev => ({ ...prev, [plan.id]: true }));
    setTimeout(() => {
      setAddedToCart(prev => ({ ...prev, [plan.id]: false }));
    }, 2000);
  };

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

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
              onClick={() => handleAddToCart(plan)}
              className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-300 flex items-center justify-center"
              disabled={addedToCart[plan.id]}
            >
              {addedToCart[plan.id] ? (
                <>
                  <Check size={18} className="mr-2" />
                  Added to Cart
                </>
              ) : (
                'Add to Cart'
              )}
            </button>
          </div>
        ))}
      </div>
      
      <Link
        to="/checkout"
        className="fixed bottom-4 right-4 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition duration-300 z-50"
      >
        <ShoppingCart size={24} />
        {cartItemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
            {cartItemCount}
          </span>
        )}
      </Link>
    </div>
  );
};

export default SubscriptionOfferings;