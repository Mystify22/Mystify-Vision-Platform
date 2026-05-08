import React from 'react';

const SpeederLoader = () => {
  return (
    <div className="absolute inset-0 z-[100] flex items-center justify-center pointer-events-none overflow-hidden bg-[rgba(26,26,27,0.8)] backdrop-blur-sm">
      <div className="relative w-full h-full max-w-[320px] max-h-[200px] flex items-center justify-center" style={{ transform: 'scale(0.6)' }}>
        <div className="speeder-loader">
          <span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </span>
          <div className="speeder-base">
            <span></span>
            <div className="speeder-face"></div>
          </div>
        </div>
        <div className="longfazers">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default SpeederLoader;
