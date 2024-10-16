import React from 'react';

interface MoonPhase {
  phase: string;
  illumination: number;
  date: string;
}

const mockMoonPhases: MoonPhase[] = [
  { phase: 'New Moon', illumination: 0, date: '2024-03-10' },
  { phase: 'Waxing Crescent', illumination: 25, date: '2024-03-13' },
  { phase: 'First Quarter', illumination: 50, date: '2024-03-17' },
  { phase: 'Waxing Gibbous', illumination: 75, date: '2024-03-21' },
];

const MoonCycleTracker: React.FC = () => {
  return (
    <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg">
      <h3 className="text-3xl font-light mb-6 text-white">Moon Cycle Tracker</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {mockMoonPhases.map((phase, index) => (
          <div key={index} className="bg-indigo-600 bg-opacity-20 p-4 rounded-lg text-center">
            <p className="text-lg font-semibold text-indigo-300">{phase.date}</p>
            <div className="w-24 h-24 mx-auto my-4 rounded-full bg-gray-800 relative overflow-hidden">
              <div 
                className="absolute top-0 left-0 w-full h-full bg-indigo-300"
                style={{
                  clipPath: `inset(0 ${100 - phase.illumination}% 0 0)`,
                }}
              ></div>
            </div>
            <p className="text-white">{phase.phase}</p>
            <p className="text-sm text-gray-300">{phase.illumination}% illuminated</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoonCycleTracker;