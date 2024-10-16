import React from 'react';

const Sparkles: React.FC = () => {
  return (
    <div className="sparkles-container">
      {[...Array(50)].map((_, i) => (
        <div key={i} className="sparkle" style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`
        }}>
          <svg width="10" height="10" viewBox="0 0 10 10">
            <path d="M5 0L6.12 3.88L10 5L6.12 6.12L5 10L3.88 6.12L0 5L3.88 3.88L5 0Z" fill="#FFD700" />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default Sparkles;