'use client'

import { useState, useEffect } from 'react';
import ProcessFlow from './HowWeWork/ProcessFlow';

export default function HowWeWork({ css, cssAlpha }) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Trigger visibility after component mounts for entrance animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-5xl mx-auto text-center mb-20">
      <div 
        className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-6'}`}
      >
        <h2 
          className="text-2xl font-semibold mb-3"
          style={{ color: css('secondary') }}
        >
          Meet Our Team & How We Work
        </h2>
        <p 
          className="text-base mb-6 max-w-2xl mx-auto"
          style={{ color: cssAlpha('secondary', 0.8) }}
        >
          Our development process flows through distinct phases, with each team member playing a 
          crucial role. Explore below to discover how we transform ideas into 
          exceptional digital products.
        </p>
      </div>
      
      {/* Process Flow Component */}
      <ProcessFlow css={css} cssAlpha={cssAlpha} isVisible={isVisible} />
      
      <div 
        className={`text-sm italic mt-6 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{ color: cssAlpha('secondary', 0.6) }}
      >
        Click on any process step to learn more about that phase
      </div>
    </div>
  );
}