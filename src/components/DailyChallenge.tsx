import React, { useState } from 'react';
import { Star } from 'lucide-react';

const challenges = [
  "Meditate for 10 minutes focusing on your zodiac element",
  "Write down three things you're grateful for based on your moon sign's influence",
  "Perform a small act of kindness aligned with your rising sign's traits",
  "Reflect on a recent challenge through the lens of your current Saturn transit",
  "Practice a grounding exercise inspired by your Earth sign placements",
];

const DailyChallenge: React.FC = () => {
  const [challenge] = useState(challenges[Math.floor(Math.random() * challenges.length)]);
  const [completed, setCompleted] = useState(false);

  const handleComplete = () => {
    setCompleted(true);
    // In a real app, you would update the user's profile, add points, etc.
  };

  return (
    <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg">
      <h3 className="text-3xl font-light mb-6 text-white">Daily Astrology Challenge</h3>
      <p className="text-white text-lg mb-6">{challenge}</p>
      {completed ? (
        <div className="text-center">
          <p className="text-2xl font-semibold text-indigo-300 mb-4">Challenge Completed!</p>
          <Star className="text-yellow-400 mx-auto" size={48} />
          <p className="text-white mt-4">You've earned 10 cosmic points!</p>
        </div>
      ) : (
        <button
          onClick={handleComplete}
          className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition duration-300"
        >
          Complete Challenge
        </button>
      )}
    </div>
  );
};

export default DailyChallenge;