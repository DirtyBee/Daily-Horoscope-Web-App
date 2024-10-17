import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Sun, Moon, Star, ShoppingBag, CreditCard, User } from 'lucide-react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useTranslation } from 'react-i18next';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ZodiacFinder from './components/ZodiacFinder';
import BlogPosts from './components/BlogPosts';
import AstrologyStore from './components/AstrologyStore';
import Checkout from './components/Checkout';
import SubscriptionOfferings from './components/SubscriptionOfferings';
import { CartProvider } from './contexts/CartContext';
import Sparkles from './components/Sparkles';
import AstrologyChatbot from './components/AstrologyChatbot';
import AccessibilitySettings from './components/AccessibilitySettings';
import UserProfile from './components/UserProfile';
import PersonalizedHoroscope from './components/PersonalizedHoroscope';
import LanguageSwitcher from './components/LanguageSwitcher';
import AuthModal from './components/Auth/AuthModal';

// Replace with your actual Stripe publishable key
const stripePromise = loadStripe('pk_test_your_publishable_key');

// Replace with your actual Google OAuth Client ID
const GOOGLE_CLIENT_ID = 'your_google_client_id.apps.googleusercontent.com';

function App() {
  const { t, i18n } = useTranslation();
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    document.documentElement.classList.toggle('light-theme', newTheme === 'light');
  };

  const handleFontSizeChange = (newSize: 'small' | 'medium' | 'large') => {
    setFontSize(newSize);
    document.documentElement.classList.remove('text-small', 'text-medium', 'text-large');
    document.documentElement.classList.add(`text-${newSize}`);
  };

  const handleLanguageChange = (newLanguage: string) => {
    i18n.changeLanguage(newLanguage);
  };

  const handleLogin = (userData: any) => {
    setUser(userData);
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Elements stripe={stripePromise}>
        <CartProvider>
          <Router>
            <div className={`min-h-screen gradient-bg flex flex-col items-center justify-center p-4 relative overflow-hidden ${theme === 'light' ? 'light-theme' : ''}`}>
              <Sparkles />
              <AccessibilitySettings onThemeChange={handleThemeChange} onFontSizeChange={handleFontSizeChange} />
              <header className="w-full max-w-4xl mx-auto mb-8 z-30">
                <div className="flex justify-between items-center">
                  <h1 className="text-4xl font-light text-white flex items-center">
                    {t('astrology_hub')}
                    <Sun className="ml-2 text-yellow-300" size={28} />
                    <Moon className="ml-2 text-blue-300" size={28} />
                    <Star className="ml-2 text-purple-300" size={28} />
                  </h1>
                  <div className="flex items-center space-x-4">
                    <LanguageSwitcher language={i18n.language} onLanguageChange={handleLanguageChange} />
                    {user ? (
                      <div className="flex items-center">
                        <img src={user.picture} alt={user.name} className="w-8 h-8 rounded-full mr-2" />
                        <button onClick={handleLogout} className="text-white hover:text-indigo-200 transition-colors duration-200">
                          Logout
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => setIsAuthModalOpen(true)} className="text-white hover:text-indigo-200 transition-colors duration-200">
                        <User size={24} />
                      </button>
                    )}
                  </div>
                </div>
                <nav className="mt-4" aria-label="Main navigation">
                  <ul className="flex space-x-6">
                    <li>
                      <Link to="/" className="text-white hover:text-indigo-200 text-lg font-light flex items-center">
                        <Sun className="mr-2" size={20} /> {t('home')}
                      </Link>
                    </li>
                    <li>
                      <Link to="/blog" className="text-white hover:text-indigo-200 text-lg font-light flex items-center">
                        <Star className="mr-2" size={20} /> {t('blog')}
                      </Link>
                    </li>
                    <li>
                      <Link to="/store" className="text-white hover:text-indigo-200 text-lg font-light flex items-center">
                        <ShoppingBag className="mr-2" size={20} /> {t('store')}
                      </Link>
                    </li>
                    <li>
                      <Link to="/subscribe" className="text-white hover:text-indigo-200 text-lg font-light flex items-center">
                        <CreditCard className="mr-2" size={20} /> {t('subscribe')}
                      </Link>
                    </li>
                  </ul>
                </nav>
              </header>
              <main className="glass-morphism p-8 max-w-4xl w-full z-20">
                <Routes>
                  <Route path="/" element={<ZodiacFinder />} />
                  <Route path="/blog" element={<BlogPosts />} />
                  <Route path="/store" element={<AstrologyStore />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/subscribe" element={<SubscriptionOfferings />} />
                  <Route path="/profile" element={<UserProfile user={user} />} />
                  <Route path="/horoscope" element={<PersonalizedHoroscope />} />
                </Routes>
              </main>
              <AstrologyChatbot />
              <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} onLogin={handleLogin} />
            </div>
          </Router>
        </CartProvider>
      </Elements>
    </GoogleOAuthProvider>
  );
}

export default App;