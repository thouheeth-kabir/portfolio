import { useState, useEffect } from 'react';

// ProcessNode component - individual step in the process
const ProcessNode = ({ step, index, isActive, onClick }) => {
  const [isAnimated, setIsAnimated] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 500 + (index * 200));
    
    return () => clearTimeout(timer);
  }, [index]);
  
  return (
    <div className="flex flex-col items-center">
      {/* Main circle with number and icon */}
      <div 
        onClick={onClick}
        className={`relative w-24 h-24 rounded-full flex items-center justify-center cursor-pointer transition-all duration-500
                   ${isActive ? 'ring-4 ring-opacity-50 scale-110' : 'hover:scale-105'}
                   ${isAnimated ? 'opacity-100 transform-none' : 'opacity-0 scale-90'}`}
        style={{ 
          backgroundColor: `${step.color}20`,
          border: `3px solid ${step.color}`,
          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)',
          ringColor: step.color
        }}
      >
        {/* Decorative elements for active state */}
        {isActive && (
          <svg className="absolute w-36 h-36 -z-10" style={{ top: '-24px', left: '-24px' }}>
            <circle cx="72" cy="72" r="42" fill="none" stroke={`${step.color}30`} strokeWidth="1" strokeDasharray="3,3">
              <animate 
                attributeName="transform" 
                attributeType="XML" 
                type="rotate"
                from="0 72 72"
                to="360 72 72"
                dur="20s"
                repeatCount="indefinite"
              />
            </circle>
            {[...Array(8)].map((_, i) => {
              const angle = (i * 45) * Math.PI / 180;
              const x = 72 + 48 * Math.cos(angle);
              const y = 72 + 48 * Math.sin(angle);
              return (
                <circle 
                  key={i} 
                  cx={x} 
                  cy={y} 
                  r="2" 
                  fill={`${step.color}80`} 
                >
                  <animate 
                    attributeName="r" 
                    values="2;3;2" 
                    dur="2s"
                    repeatCount="indefinite"
                    begin={`${i * 0.25}s`}
                  />
                </circle>
              );
            })}
          </svg>
        )}
        
        {/* Main content */}
        <div className="flex flex-col items-center justify-center">
          {/* Icon */}
          <div 
            className={`mb-1 transition-all duration-300 ${isActive ? 'scale-110' : ''}`}
            style={{ color: isActive ? 'white' : step.color }}
          >
            {step.icon}
          </div>
          
          {/* Number - in a black circle */}
          <div 
            className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold"
          >
            {index + 1}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessNode;