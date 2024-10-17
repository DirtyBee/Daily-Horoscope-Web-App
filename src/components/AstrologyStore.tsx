import React, { useState } from 'react';
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const products = [
  {
    id: 1,
    name: "Crystal Ball",
    price: 49.99,
    description: "A genuine crystal ball for divination and scrying.",
    category: "Divination",
    image: "https://images.unsplash.com/photo-1568219656418-15c329312bf1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: 2,
    name: "Tarot Deck",
    price: 24.99,
    description: "A beautifully illustrated tarot deck for readings.",
    category: "Divination",
    image: "https://images.unsplash.com/photo-1632756238243-06a4c5f2cdfe?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: 3,
    name: "Zodiac Pendant",
    price: 39.99,
    description: "A stylish pendant featuring your zodiac sign.",
    category: "Jewelry",
    image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: 4,
    name: "Astrology Book",
    price: 19.99,
    description: "An in-depth guide to understanding astrology.",
    category: "Books",
    image: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: 5,
    name: "Celestial Candle Set",
    price: 29.99,
    description: "A set of scented candles inspired by celestial bodies.",
    category: "Home",
    image: "https://images.unsplash.com/photo-1602523961358-f9f03dd557db?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  }
];

function AstrologyStore() {
  const { t } = useTranslation();
  const { addToCart, cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="space-y-8 text-white">
      <h2 className="text-3xl font-light mb-6">{t('astrology_store')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product.id} className="bg-white bg-opacity-10 rounded-lg overflow-hidden hover-lift">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wide">{t(product.category.toLowerCase())}</span>
              <h3 className="text-xl font-light mb-2 mt-1">{product.name}</h3>
              <p className="text-gray-300 text-sm mb-4">{product.description}</p>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-light mb-2">${product.price.toFixed(2)}</span>
                <button 
                  onClick={() => addToCart({ id: product.id, name: product.name, price: product.price, quantity: 1 })}
                  className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300 flex items-center justify-center"
                >
                  <ShoppingCart size={18} className="mr-2" />
                  {t('add_to_cart')}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button
        onClick={toggleCart}
        className="fixed bottom-4 right-4 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition duration-300 z-50"
      >
        <ShoppingCart size={24} />
        {cartItemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
            {cartItemCount}
          </span>
        )}
      </button>

      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-indigo-900 p-8 rounded-lg w-full max-w-md">
            <h3 className="text-2xl font-light mb-4">{t('shopping_cart')}</h3>
            {cart.length === 0 ? (
              <p>{t('cart_empty')}</p>
            ) : (
              <div>
                <ul className="space-y-2">
                  {cart.map((item) => (
                    <li key={item.id} className="flex justify-between items-center bg-white bg-opacity-10 p-3 rounded-lg">
                      <span>{item.name}</span>
                      <div className="flex items-center">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-gray-400 hover:text-white">
                          <Minus size={18} />
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-gray-400 hover:text-white">
                          <Plus size={18} />
                        </button>
                        <span className="ml-4">${(item.price * item.quantity).toFixed(2)}</span>
                        <button onClick={() => removeFromCart(item.id)} className="ml-2 text-red-400 hover:text-red-300">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <p className="text-2xl font-light">{t('total')}: ${getTotalPrice().toFixed(2)}</p>
                  <Link to="/checkout" className="mt-4 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition duration-300 inline-block hover-lift">
                    {t('proceed_to_checkout')}
                  </Link>
                </div>
              </div>
            )}
            <button
              onClick={toggleCart}
              className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AstrologyStore;