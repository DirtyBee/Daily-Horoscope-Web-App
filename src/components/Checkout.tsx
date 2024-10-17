import React from 'react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { PayPalButton } from "react-paypal-button-v2";

function Checkout() {
  const { cart, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const handleOrderComplete = () => {
    alert('Order placed successfully!');
    clearCart();
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto text-white">
      <h2 className="text-3xl font-light mb-6">Checkout</h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-light mb-4">Order Summary</h3>
          <ul className="space-y-2">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between bg-white bg-opacity-10 p-3 rounded-lg">
                <span>{item.name} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="text-2xl font-light mt-4">
            Total: ${getTotalPrice().toFixed(2)}
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-light mb-4">Payment Options</h3>
          <div className="space-y-4">
            <button 
              className="w-full bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-900 transition duration-300 hover-lift flex items-center justify-center"
              onClick={() => alert('Apple Pay integration would go here')}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.0444 10.4967C17.0444 10.4967 17.0444 10.4967 17.0444 10.4967C17.0444 7.77677 19.2411 6.88454 19.3078 6.85121C19.2411 6.75122 18.8411 5.52458 17.9489 4.36461C17.1901 3.37129 16.3645 2.37797 15.0723 2.37797C13.7801 2.37797 13.1546 3.10463 11.9623 3.10463C10.7701 3.10463 9.97787 2.37797 8.85231 2.37797C7.39342 2.37797 5.86787 3.47129 4.97564 5.15794C3.58342 7.77677 4.64231 11.6233 5.96787 13.7534C6.62675 14.8123 7.42675 15.9723 8.48564 15.9389C9.47897 15.9056 9.87897 15.3467 11.0712 15.3467C12.2634 15.3467 12.6301 15.9389 13.6901 15.9389C14.7823 15.9389 15.4745 14.8789 16.1001 13.82C16.8256 12.6278 17.1256 11.4678 17.1256 11.4011C17.0923 11.3678 17.0444 10.4967 17.0444 10.4967ZM14.7823 5.19127C15.3412 4.49794 15.7412 3.53795 15.6412 2.57796C14.8156 2.61129 13.8223 3.13795 13.2301 3.83128C12.7012 4.42461 12.2012 5.38461 12.3345 6.31127C13.2301 6.37793 14.1901 5.88461 14.7823 5.19127Z"/>
              </svg>
              Pay with Apple Pay
            </button>
            <PayPalButton
              amount={getTotalPrice()}
              onSuccess={(details, data) => {
                console.log('PayPal Transaction completed by ' + details.payer.name.given_name);
                handleOrderComplete();
              }}
              options={{
                clientId: "YOUR_PAYPAL_CLIENT_ID",
                currency: "USD"
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;