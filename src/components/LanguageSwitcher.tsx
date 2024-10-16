import React, { useState, useRef, useEffect } from 'react';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  language: string;
  onLanguageChange: (language: string) => void;
}

const languages = [
  { code: 'en', name: 'EN', fullName: 'English' },
  { code: 'es', name: 'ES', fullName: 'Español' },
  { code: 'fr', name: 'FR', fullName: 'Français' },
  { code: 'de', name: 'DE', fullName: 'Deutsch' },
];

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ language, onLanguageChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLanguageChange = (langCode: string) => {
    onLanguageChange(langCode);
    setIsOpen(false);
  };

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center text-white hover:text-indigo-200 transition-colors duration-200 bg-indigo-600 bg-opacity-50 rounded-full px-3 py-1"
        aria-label="Select language"
      >
        <Globe size={16} className="mr-2" />
        {currentLanguage.name}
      </button>
      {isOpen && (
        <ul className="absolute right-0 mt-2 py-2 w-40 bg-indigo-800 bg-opacity-90 backdrop-blur-md rounded-md shadow-lg z-[100]">
          {languages.map((lang) => (
            <li key={lang.code}>
              <button
                onClick={() => handleLanguageChange(lang.code)}
                className={`block px-4 py-2 text-sm ${language === lang.code ? 'text-indigo-300' : 'text-white'} hover:bg-indigo-700 hover:bg-opacity-50 w-full text-left`}
              >
                {lang.name} - {lang.fullName}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;