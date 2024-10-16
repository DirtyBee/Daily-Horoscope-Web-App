import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { date: '2024-03-01', Aries: 4, Taurus: 3, Gemini: 5, Cancer: 2, Leo: 6, Virgo: 4 },
  { date: '2024-03-02', Aries: 5, Taurus: 4, Gemini: 3, Cancer: 4, Leo: 5, Virgo: 3 },
  { date: '2024-03-03', Aries: 6, Taurus: 5, Gemini: 4, Cancer: 3, Leo: 4, Virgo: 5 },
  { date: '2024-03-04', Aries: 3, Taurus: 6, Gemini: 5, Cancer: 5, Leo: 3, Virgo: 6 },
  { date: '2024-03-05', Aries: 4, Taurus: 5, Gemini: 6, Cancer: 4, Leo: 4, Virgo: 5 },
];

const AstrologicalTrends: React.FC = () => {
  return (
    <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg">
      <h3 className="text-3xl font-light mb-6 text-white">Astrological Trends</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff33" />
          <XAxis dataKey="date" stroke="#ffffff" />
          <YAxis stroke="#ffffff" />
          <Tooltip contentStyle={{ backgroundColor: '#ffffff22', border: 'none', borderRadius: '8px' }} />
          <Legend />
          <Line type="monotone" dataKey="Aries" stroke="#ff6b6b" strokeWidth={2} dot={{ fill: '#ff6b6b' }} />
          <Line type="monotone" dataKey="Taurus" stroke="#4ecdc4" strokeWidth={2} dot={{ fill: '#4ecdc4' }} />
          <Line type="monotone" dataKey="Gemini" stroke="#feca57" strokeWidth={2} dot={{ fill: '#feca57' }} />
          <Line type="monotone" dataKey="Cancer" stroke="#48dbfb" strokeWidth={2} dot={{ fill: '#48dbfb' }} />
          <Line type="monotone" dataKey="Leo" stroke="#ff9ff3" strokeWidth={2} dot={{ fill: '#ff9ff3' }} />
          <Line type="monotone" dataKey="Virgo" stroke="#54a0ff" strokeWidth={2} dot={{ fill: '#54a0ff' }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AstrologicalTrends;