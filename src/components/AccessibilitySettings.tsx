import React, { useState, useEffect } from 'react';
import { Sun, Moon, Type } from 'lucide-react';

interface AccessibilitySettingsProps {
  onThemeChange: (theme: 'light' | 'dark') => void;
  onFontSizeChange: (size: 'small' | 'medium' | 'large') => void;
}

const AccessibilitySettings: React.FC<AccessibilitySettingsProps> = ({ onThemeChange, onFontSizeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    const savedFontSize = localStorage.getItem('fontSize') as 'small' | 'medium' | 'large';
    if (savedTheme) setTheme(savedTheme);
    if (savedFontSize) setFontSize(savedFontSize);
  }, []);

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    onThemeChange(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handleFontSizeChange = (newSize: 'small' | 'medium' | 'large') => {
    setFontSize(newSize);
    onFontSizeChange(newSize);
    localStorage.setItem('fontSize', newSize);
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-indigo-600 text-white p-2 rounded-full shadow-lg hover:bg-indigo-700 transition duration-300"
        aria-label="Accessibility Settings"
      >
        <Type size={20} />
      </button>
      {isOpen && (
        <div className="absolute top-12 right-0 bg-white bg-opacity-10 p-4 rounded-lg shadow-lg backdrop-blur-md">
          <h2 className="text-xl font-light mb-4 text-white">Accessibility</h2>
          <div className="flex items-center mb-4">
            <span className="mr-2 text-white">Theme:</span>
            <button
              onClick={() => handleThemeChange('light')}
              className={`mr-2 p-2 rounded-full ${theme === 'light' ? 'bg-yellow-400' : 'bg-gray-400'}`}
              aria-label="Light theme"
            >
              <Sun size={20} />
            </button>
            <button
              onClick={() => handleThemeChange('dark')}
              className={`p-2 rounded-full ${theme === 'dark' ? 'bg-indigo-600' : 'bg-gray-400'}`}
              aria-label="Dark theme"
            >
              <Moon size={20} />
            </button>
          </div>
          <div className="flex items-center">
            <span className="mr-2 text-white">Font:</span>
            <button
              onClick={() => handleFontSizeChange('small')}
              className={`mr-2 p-2 rounded ${fontSize === 'small' ? 'bg-indigo-600' : 'bg-gray-400'}`}
              aria-label="Small font size"
            >
              A
            </button>
            <button
              onClick={() => handleFontSizeChange('medium')}
              className={`mr-2 p-2 rounded ${fontSize === 'medium' ? 'bg-indigo-600' : 'bg-gray-400'}`}
              aria-label="Medium font size"
            >
              A
            </button>
            <button
              onClick={() => handleFontSizeChange('large')}
              className={`p-2 rounded ${fontSize === 'large' ? 'bg-indigo-600' : 'bg-gray-400'}`}
              aria-label="Large font size"
            >
              A
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccessibilitySettings;