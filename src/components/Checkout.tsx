import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  // ... (keep the existing state and functions)

  return (
    <div className="max-w-md mx-auto text-white">
      <h2 className="text-3xl font-light mb-6">Checkout</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ... (keep the existing form fields, but update their styles) */}
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="w-full p-3 bg-white bg-opacity-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 text-white"
          placeholder="Name"
        />
        {/* ... (repeat for other form fields) */}
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
        <button type="submit" className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition duration-300 hover-lift">
          Place Order
        </button>
      </form>
    </div>
  );
}

export default Checkout;