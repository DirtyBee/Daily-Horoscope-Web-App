import React from 'react';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const products = [
  // ... (keep the existing products)
];

function AstrologyStore() {
  const { t } = useTranslation();
  const { addToCart, cart, removeFromCart, getTotalPrice } = useCart();

  return (
    <div className="space-y-8 text-white">
      <h2 className="text-3xl font-light mb-6">{t('astrology_store')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product.id} className="bg-white bg-opacity-10 rounded-lg overflow-hidden hover-lift">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wide">{t(product.category.toLowerCase())}</span>
              <h3 className="text-xl font-light mb-2 mt-1">{t(product.name)}</h3>
              <p className="text-gray-300 text-sm mb-4">{t(product.description)}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-light">${product.price.toFixed(2)}</span>
                <button 
                  onClick={() => addToCart({ id: product.id, name: product.name, price: product.price, quantity: 1 })}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300 flex items-center"
                >
                  <ShoppingCart size={18} className="mr-2" />
                  {t('add_to_cart')}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12">
        <h3 className="text-2xl font-light mb-4">{t('shopping_cart')}</h3>
        {cart.length === 0 ? (
          <p>{t('cart_empty')}</p>
        ) : (
          <div>
            <ul className="space-y-2">
              {cart.map((item) => (
                <li key={item.id} className="flex justify-between items-center bg-white bg-opacity-10 p-3 rounded-lg">
                  <span>{t(item.name)} - {t('quantity')}: {item.quantity} - ${(item.price * item.quantity).toFixed(2)}</span>
                  <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-300">
                    <Trash2 size={18} />
                  </button>
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
      </div>
    </div>
  );
}

export default AstrologyStore;