import { useState, useEffect } from 'react';

// Connector component - animated line between process nodes
const Connector = ({ fromStep, toStep, index }) => {
  const [isAnimated, setIsAnimated] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 800 + (index * 200));
    
    return () => clearTimeout(timer);
  }, [index]);
  
  // Create a slightly curved path for the connector
  const getPath = () => {
    // Control point for the curve (raised slightly)
    const controlY = -15;
    
    return `M 0,0 Q 50,${controlY} 100,0`;
  };
  
  return (
    <div className="flex-1 flex items-center justify-center relative">
      <div 
        className="w-full h-12 relative"
      >
        <svg className="w-full h-full absolute top-0 left-0">
          {/* Base line */}
          <path 
            d={getPath()}
            fill="none"
            stroke={`${fromStep.color}30`}
            strokeWidth="2"
            strokeDasharray={isAnimated ? "none" : "200,200"}
            strokeDashoffset={isAnimated ? "0" : "200"}
            className="transition-all duration-1000"
            style={{ 
              transition: 'stroke-dashoffset 1.5s ease-in-out',
            }}
          />
          
          {/* Animated dots on the line */}
          {isAnimated && (
            <>
              <circle r="4" fill={fromStep.color}>
                <animateMotion
                  path={getPath()}
                  dur="3s"
                  repeatCount="indefinite"
                  rotate="auto"
                />
              </circle>
              
              <circle r="3" fill={fromStep.color} opacity="0.7">
                <animateMotion
                  path={getPath()}
                  dur="3s"
                  begin="0.7s"
                  repeatCount="indefinite"
                  rotate="auto"
                />
              </circle>
            </>
          )}
          
          {/* Decorative doodle elements along the path */}
          {isAnimated && (
            <>
              <path
                d={`M 25,-5 Q 35,-15 45,-5`}
                fill="none"
                stroke={`${fromStep.color}30`}
                strokeWidth="1"
                strokeDasharray="2,2"
              />
              <path
                d={`M 55,-5 Q 65,-15 75,-5`}
                fill="none"
                stroke={`${fromStep.color}30`}
                strokeWidth="1"
                strokeDasharray="2,2"
              />
            </>
          )}
        </svg>
      </div>
    </div>
  );
};

export default Connector;