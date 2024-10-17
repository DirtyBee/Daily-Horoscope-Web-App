import React, { useState, useEffect } from 'react';
import { Sun, Moon, Star } from 'lucide-react';

interface HoroscopeData {
  sunSign: string;
  moonSign: string;
  risingSign: string;
  dailyHoroscope: string;
  weeklyForecast: string;
  luckyNumbers: number[];
  compatibleSigns: string[];
}

const mockHoroscopeData: HoroscopeData = {
  sunSign: "Aries",
  moonSign: "Taurus",
  risingSign: "Gemini",
  dailyHoroscope: "Today is a day of new beginnings. Your energy is high, and you're ready to take on new challenges. Trust your instincts and don't be afraid to take the lead in projects or relationships.",
  weeklyForecast: "This week brings opportunities for growth in your career. You may face some obstacles, but your determination will see you through. Pay attention to your relationships, as there might be some tension that needs addressing.",
  luckyNumbers: [3, 7, 12, 18, 24],
  compatibleSigns: ["Leo", "Sagittarius", "Gemini"]
};

const PersonalizedHoroscope: React.FC = () => {
  const [horoscope, setHoroscope] = useState<HoroscopeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulating an API call
    const fetchHoroscope = async () => {
      try {
        // In a real application, you would fetch this data from your backend
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
        setHoroscope(mockHoroscopeData);
      } catch (err) {
        setError('Failed to load horoscope data');
      } finally {
        setLoading(false);
      }
    };

    fetchHoroscope();
  }, []);

  if (loading) return <div className="text-white">Loading your personalized horoscope...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!horoscope) return <div className="text-white">No horoscope data available</div>;

  return (
    <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg text-white">
      <h2 className="text-3xl font-light mb-6">Your Personalized Horoscope</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-indigo-600 bg-opacity-20 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-2 flex items-center"><Sun className="mr-2" /> Sun Sign</h3>
          <p>{horoscope.sunSign}</p>
        </div>
        <div className="bg-indigo-600 bg-opacity-20 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-2 flex items-center"><Moon className="mr-2" /> Moon Sign</h3>
          <p>{horoscope.moonSign}</p>
        </div>
        <div className="bg-indigo-600 bg-opacity-20 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-2 flex items-center"><Star className="mr-2" /> Rising Sign</h3>
          <p>{horoscope.risingSign}</p>
        </div>
      </div>
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">Daily Horoscope</h3>
        <p className="text-lg">{horoscope.dailyHoroscope}</p>
      </div>
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">Weekly Forecast</h3>
        <p className="text-lg">{horoscope.weeklyForecast}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">Lucky Numbers</h3>
          <p>{horoscope.luckyNumbers.join(', ')}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Compatible Signs</h3>
          <p>{horoscope.compatibleSigns.join(', ')}</p>
        </div>
      </div>
    </div>
  );
};

export default PersonalizedHoroscope;