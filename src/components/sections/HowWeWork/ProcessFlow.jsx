import { useState, useEffect } from 'react';
import ProcessNode from './ProcessNode';
import ProcessDetail from './ProcessDetail';
import processSteps from './ProcessData';

// ProcessFlow component - main container for the process visualization
const ProcessFlow = ({ css, cssAlpha, isVisible }) => {
  const [activeStep, setActiveStep] = useState(null);
  const [activeStepData, setActiveStepData] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Handle window resize for responsive layout
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Set initial value
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Update active step data when active step changes
  useEffect(() => {
    if (activeStep) {
      const stepData = processSteps.find(step => step.id === activeStep);
      setActiveStepData(stepData);
    } else {
      setActiveStepData(null);
    }
  }, [activeStep]);
  
  const handleStepClick = (stepId) => {
    setActiveStep(stepId === activeStep ? null : stepId);
  };

  // Render process flow for desktop
  const renderDesktopFlow = () => (
    <div className="flex flex-row items-start justify-between">
      {processSteps.map((step, index) => {
        // Calculate a slightly different vertical position for each step
        const offsetY = index % 2 === 0 ? 0 : 30;
        
        return (
          <div 
            key={step.id}
            className="flex flex-col items-center relative z-10"
            style={{ 
              marginTop: offsetY,
              width: `${100 / processSteps.length}%`,
              maxWidth: '200px'
            }}
          >
            {/* Process node */}
            <ProcessNode 
              step={step}
              index={index}
              isActive={activeStep === step.id}
              onClick={() => handleStepClick(step.id)}
            />
            
            {/* Step description below */}
            <div className="mt-4 max-w-[180px] text-center">
              <h3 className="font-medium mb-1" style={{ color: step.color }}>{step.title}</h3>
              <p className="text-xs" style={{ color: cssAlpha('secondary', 0.7) }}>
                {step.description.split('.')[0]}.
              </p>
            </div>
            
            {/* Connector to next node (if not the last item) */}
            {index < processSteps.length - 1 && (
              <div className="absolute" style={{
                left: '50%',
                top: '50%',
                width: '100%',
                height: '2px',
                zIndex: 0,
                overflow: 'visible',
                transform: 'translateY(-50%)',
              }}>
                {/* Improved connector with better positioning */}
                <svg 
                  width="100%" 
                  height="60px" 
                  style={{ 
                    position: 'absolute',
                    overflow: 'visible',
                  }}
                  viewBox="0 0 100 60"
                  preserveAspectRatio="none"
                >
                  {/* Calculate path based on next node's position */}
                  {(() => {
                    const nextOffsetY = (index + 1) % 2 === 0 ? 0 : 30;
                    const heightDiff = nextOffsetY - offsetY;
                    const path = `M 0,30 C 30,30 70,${30 + heightDiff} 100,${30 + heightDiff}`;
                    
                    return (
                      <>
                        <path 
                          d={path}
                          fill="none"
                          stroke={`${step.color}40`}
                          strokeWidth="2"
                          strokeDasharray="4,2"
                        />
                        
                        {/* Animated dot with corrected path */}
                        <circle
                          r="4"
                          fill={step.color}
                        >
                          <animateMotion
                            path={path}
                            dur="2s"
                            begin={`${index * 0.5}s`}
                            repeatCount="indefinite"
                          />
                        </circle>
                      </>
                    );
                  })()}
                </svg>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
  
  // Render process flow for mobile
  const renderMobileFlow = () => (
    <div className="flex flex-col items-center justify-start space-y-10">
      {processSteps.map((step, index) => (
        <div 
          key={step.id}
          className="flex flex-col items-center relative z-10 w-full max-w-[280px]"
        >
          <div className="flex items-center w-full">
            {/* Process node */}
            <ProcessNode 
              step={step}
              index={index}
              isActive={activeStep === step.id}
              onClick={() => handleStepClick(step.id)}
            />
            
            {/* Step description beside node on mobile */}
            <div className="ml-4 flex-1">
              <h3 className="font-medium mb-1" style={{ color: step.color }}>{step.title}</h3>
              <p className="text-xs" style={{ color: cssAlpha('secondary', 0.7) }}>
                {step.description.split('.')[0]}.
              </p>
            </div>
          </div>
          
          {/* Connector to next node (if not the last item) */}
          {index < processSteps.length - 1 && (
            <div className="h-10 w-[2px] my-2 relative">
              <div 
                className="h-full w-full"
                style={{ backgroundColor: `${step.color}40` }}
              >
                {/* Animated dot for vertical flow */}
                <div 
                  className="absolute w-2 h-2 rounded-full left-1/2 transform -translate-x-1/2"
                  style={{ 
                    backgroundColor: step.color,
                    animation: `moveVertically 2s ${index * 0.5}s infinite`
                  }}
                ></div>
              </div>
            </div>
          )}
        </div>
      ))}
      
      {/* Add animation keyframes for vertical movement */}
      <style jsx>{`
        @keyframes moveVertically {
          0% { top: 0; }
          100% { top: 100%; }
        }
      `}</style>
    </div>
  );
  
  return (
    <div 
      className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Process flow visualization */}
      <div className="relative mb-16">
        {isMobile ? renderMobileFlow() : renderDesktopFlow()}
      </div>
      
      {/* Process detail card */}
      {activeStepData && (
        <ProcessDetail 
          step={activeStepData}
          css={css}
          cssAlpha={cssAlpha}
        />
      )}
    </div>
  );
};

export default ProcessFlow;