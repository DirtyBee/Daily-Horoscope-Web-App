import React, { useState } from 'react';
import { X } from 'lucide-react';
import Login from './Login';
import Register from './Register';
import GoogleAuth from './GoogleAuth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (userData: any) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [isLoginView, setIsLoginView] = useState(true);

  const handleGoogleSuccess = (response: any) => {
    console.log('Google login success:', response);
    onLogin(response);
    onClose();
  };

  const handleGoogleError = (error: any) => {
    console.error('Google login error:', error);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-indigo-900 p-8 rounded-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-light mb-6 text-white">
          {isLoginView ? 'Login' : 'Register'}
        </h2>
        {isLoginView ? (
          <Login onLogin={onLogin} onClose={onClose} />
        ) : (
          <Register onRegister={onLogin} onClose={onClose} />
        )}
        <div className="mt-4">
          <GoogleAuth onSuccess={handleGoogleSuccess} onError={handleGoogleError} />
        </div>
        <p className="mt-4 text-center text-gray-300">
          {isLoginView ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLoginView(!isLoginView)}
            className="ml-2 text-indigo-300 hover:underline"
          >
            {isLoginView ? 'Register' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;