import React, { useState } from 'react';

interface Planet {
  name: string;
  symbol: string;
  position: number;
}

const BirthChartCalculator: React.FC = () => {
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [birthPlace, setBirthPlace] = useState('');
  const [birthChart, setBirthChart] = useState<Planet[]>([]);

  const calculateBirthChart = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would involve complex calculations or an API call
    // For this example, we'll generate random positions for planets
    const planets: Planet[] = [
      { name: 'Sun', symbol: '☉', position: Math.floor(Math.random() * 360) },
      { name: 'Moon', symbol: '☽', position: Math.floor(Math.random() * 360) },
      { name: 'Mercury', symbol: '☿', position: Math.floor(Math.random() * 360) },
      { name: 'Venus', symbol: '♀', position: Math.floor(Math.random() * 360) },
      { name: 'Mars', symbol: '♂', position: Math.floor(Math.random() * 360) },
      { name: 'Jupiter', symbol: '♃', position: Math.floor(Math.random() * 360) },
      { name: 'Saturn', symbol: '♄', position: Math.floor(Math.random() * 360) },
    ];
    setBirthChart(planets);
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Birth Chart Calculator</h3>
      <form onSubmit={calculateBirthChart} className="space-y-4">
        <div>
          <label htmlFor="birthDate" className="block mb-1">Birth Date</label>
          <input
            type="date"
            id="birthDate"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="birthTime" className="block mb-1">Birth Time</label>
          <input
            type="time"
            id="birthTime"
            value={birthTime}
            onChange={(e) => setBirthTime(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="birthPlace" className="block mb-1">Birth Place</label>
          <input
            type="text"
            id="birthPlace"
            value={birthPlace}
            onChange={(e) => setBirthPlace(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="City, Country"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
        >
          Calculate Birth Chart
        </button>
      </form>
      {birthChart.length > 0 && (
        <div className="mt-6">
          <h4 className="text-lg font-semibold mb-2">Your Birth Chart</h4>
          <div className="grid grid-cols-2 gap-4">
            {birthChart.map((planet) => (
              <div key={planet.name} className="bg-indigo-100 p-3 rounded-md">
                <span className="font-semibold">{planet.name} {planet.symbol}:</span> {planet.position}°
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BirthChartCalculator;