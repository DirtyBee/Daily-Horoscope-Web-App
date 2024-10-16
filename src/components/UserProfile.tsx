import React, { useState, useEffect } from 'react';
import { User, Moon, Sun, Star } from 'lucide-react';
import axios from 'axios';
import Login from './Auth/Login';
import Register from './Auth/Register';

interface UserData {
  id: string;
  name: string;
  email: string;
  birthDate: string;
  zodiacSign: string;
}

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserData(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserData = async (token: string) => {
    try {
      const response = await axios.get('/api/user-profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data);
    } catch (err) {
      setError('Failed to load user data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await axios.post('/api/login', { email, password });
      localStorage.setItem('token', response.data.token);
      fetchUserData(response.data.token);
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  const handleRegister = async (name: string, email: string, password: string, birthDate: string) => {
    try {
      const response = await axios.post('/api/register', { name, email, password, birthDate });
      localStorage.setItem('token', response.data.token);
      fetchUserData(response.data.token);
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  if (loading) return <div className="text-white">Loading profile...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  if (!user) {
    return (
      <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg text-white">
        {showLogin ? (
          <Login onLogin={handleLogin} onSwitchToRegister={() => setShowLogin(false)} />
        ) : (
          <Register onRegister={handleRegister} onSwitchToLogin={() => setShowLogin(true)} />
        )}
      </div>
    );
  }

  return (
    <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg text-white">
      <h2 className="text-3xl font-light mb-6 flex items-center">
        <User className="mr-2" /> Your Profile
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Birth Date:</strong> {user.birthDate}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Astrological Profile</h3>
          <p className="flex items-center"><Sun className="mr-2" /> <strong>Sun Sign:</strong> {user.zodiacSign}</p>
          <p className="flex items-center"><Moon className="mr-2" /> <strong>Moon Sign:</strong> Not available</p>
          <p className="flex items-center"><Star className="mr-2" /> <strong>Rising Sign:</strong> Not available</p>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Your Personalized Horoscope</h3>
        <p className="text-lg">
          Today's cosmic energies align perfectly with your {user.zodiacSign} nature. 
          You may find yourself drawn to creative pursuits and social interactions. 
          Trust your intuition and be open to unexpected opportunities.
        </p>
      </div>
      <button 
        onClick={handleLogout}
        className="mt-6 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300"
      >
        Logout
      </button>
    </div>
  );
};

export default UserProfile;