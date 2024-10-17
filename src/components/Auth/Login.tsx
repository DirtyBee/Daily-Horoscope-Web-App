import React, { useState } from 'react';
import { User, Lock } from 'lucide-react';

interface LoginProps {
  onLogin: (email: string, password: string) => void;
  onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg text-white">
      <h2 className="text-3xl font-light mb-6">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1">Email</label>
          <div className="relative">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 bg-white bg-opacity-20 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              required
            />
            <User className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
        </div>
        <div>
          <label htmlFor="password" className="block mb-1">Password</label>
          <div className="relative">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 bg-white bg-opacity-20 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              required
            />
            <Lock className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;