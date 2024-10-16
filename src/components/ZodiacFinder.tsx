import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AstrologyQuiz from './AstrologyQuiz';
import DailyChallenge from './DailyChallenge';
import AstrologicalTrends from './AstrologicalTrends';
import PlanetaryTransits from './PlanetaryTransits';
import MoonCycleTracker from './MoonCycleTracker';
import { Sun, Moon, Star } from 'lucide-react';

interface ZodiacSign {
  name: string;
  symbol: string;
  element: string;
  quality: string;
  ruler: string;
}

const ZodiacFinder: React.FC = () => {
  const { t } = useTranslation();
  const [birthDate, setBirthDate] = useState('');
  const [zodiacSign, setZodiacSign] = useState<ZodiacSign | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This is a simplified calculation. In a real app, you'd use a more accurate method.
    const date = new Date(birthDate);
    const month = date.getMonth() + 1;
    const day = date.getDate();

    let sign: ZodiacSign;

    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
      sign = { name: 'Aries', symbol: '♈', element: 'Fire', quality: 'Cardinal', ruler: 'Mars' };
    } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
      sign = { name: 'Taurus', symbol: '♉', element: 'Earth', quality: 'Fixed', ruler: 'Venus' };
    } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
      sign = { name: 'Gemini', symbol: '♊', element: 'Air', quality: 'Mutable', ruler: 'Mercury' };
    } else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
      sign = { name: 'Cancer', symbol: '♋', element: 'Water', quality: 'Cardinal', ruler: 'Moon' };
    } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
      sign = { name: 'Leo', symbol: '♌', element: 'Fire', quality: 'Fixed', ruler: 'Sun' };
    } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
      sign = { name: 'Virgo', symbol: '♍', element: 'Earth', quality: 'Mutable', ruler: 'Mercury' };
    } else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
      sign = { name: 'Libra', symbol: '♎', element: 'Air', quality: 'Cardinal', ruler: 'Venus' };
    } else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
      sign = { name: 'Scorpio', symbol: '♏', element: 'Water', quality: 'Fixed', ruler: 'Pluto' };
    } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
      sign = { name: 'Sagittarius', symbol: '♐', element: 'Fire', quality: 'Mutable', ruler: 'Jupiter' };
    } else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
      sign = { name: 'Capricorn', symbol: '♑', element: 'Earth', quality: 'Cardinal', ruler: 'Saturn' };
    } else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
      sign = { name: 'Aquarius', symbol: '♒', element: 'Air', quality: 'Fixed', ruler: 'Uranus' };
    } else {
      sign = { name: 'Pisces', symbol: '♓', element: 'Water', quality: 'Mutable', ruler: 'Neptune' };
    }

    setZodiacSign(sign);
  };

  return (
    <div className="text-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-light mb-8 text-center">{t('discover_profile')}</h2>
        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <div>
            <label htmlFor="birthDate" className="block mb-2">{t('enter_birth_date')}</label>
            <input
              type="date"
              id="birthDate"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full p-2 bg-white bg-opacity-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
              required
            />
          </div>
          <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300">
            {t('find_zodiac')}
          </button>
        </form>

        {zodiacSign && (
          <div className="bg-white bg-opacity-10 p-6 rounded-lg mb-8" aria-live="polite">
            <h3 className="text-2xl font-light mb-4">{t('your_zodiac_sign')}</h3>
            <p className="text-4xl mb-4" aria-label={t('zodiac_sign_aria', { sign: t(zodiacSign.name.toLowerCase()) })}>{zodiacSign.symbol}</p>
            <p className="text-xl mb-2">{t(zodiacSign.name.toLowerCase())}</p>
            <p>{t('element')}: {t(zodiacSign.element.toLowerCase())}</p>
            <p>{t('quality')}: {t(zodiacSign.quality.toLowerCase())}</p>
            <p>{t('ruler')}: {t(zodiacSign.ruler.toLowerCase())}</p>
            <Link to="/horoscope" className="mt-4 inline-block bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300">
              {t('view_horoscope')}
            </Link>
          </div>
        )}
      </div>

      <div className="mt-12 space-y-12">
        <AstrologyQuiz />
        <DailyChallenge />
        <AstrologicalTrends />
        <PlanetaryTransits />
        <MoonCycleTracker />
      </div>
    </div>
  );
};

export default ZodiacFinder;