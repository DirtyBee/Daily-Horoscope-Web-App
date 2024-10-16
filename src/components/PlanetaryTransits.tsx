import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Transit {
  planet: string;
  sign: string;
  degree: number;
}

const mockTransits: Transit[] = [
  { planet: 'Sun', sign: 'Aries', degree: 15 },
  { planet: 'Moon', sign: 'Taurus', degree: 22 },
  { planet: 'Mercury', sign: 'Pisces', degree: 8 },
  { planet: 'Venus', sign: 'Aquarius', degree: 3 },
  { planet: 'Mars', sign: 'Gemini', degree: 11 },
  { planet: 'Jupiter', sign: 'Aries', degree: 19 },
  { planet: 'Saturn', sign: 'Pisces', degree: 1 },
];

const PlanetaryTransits: React.FC = () => {
  const chartData = mockTransits.map(transit => ({
    planet: transit.planet,
    degree: transit.degree,
    sign: transit.sign
  }));

  return (
    <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg">
      <h3 className="text-3xl font-light mb-6 text-white">Current Planetary Transits</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff33" />
          <XAxis dataKey="planet" stroke="#ffffff" />
          <YAxis stroke="#ffffff" />
          <Tooltip contentStyle={{ backgroundColor: '#ffffff22', border: 'none', borderRadius: '8px' }} />
          <Legend />
          <Bar dataKey="degree" fill="#8884d8" name="Degree in Sign" />
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mockTransits.map((transit, index) => (
          <div key={index} className="bg-indigo-600 bg-opacity-20 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-indigo-300">{transit.planet}</h4>
            <p className="text-white">{transit.sign} {transit.degree}°</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanetaryTransits;