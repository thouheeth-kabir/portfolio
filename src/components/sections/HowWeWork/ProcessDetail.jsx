// ProcessDetail component - shows information about the selected step
const ProcessDetail = ({ step, css, cssAlpha }) => {
  if (!step) return null;
  
  return (
    <div 
      className="p-6 rounded-xl bg-white shadow-lg transition-all duration-500 mt-8 relative overflow-hidden"
      style={{ borderLeft: `4px solid ${step.color}` }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div 
          className="p-2 rounded-lg"
          style={{ 
            backgroundColor: `${step.color}20`,
            color: step.color
          }}
        >
          {step.icon}
        </div>
        <h3 className="text-xl font-semibold" style={{ color: css('secondary') }}>
          {step.title}
        </h3>
      </div>
      <p className="text-base relative z-10" style={{ color: cssAlpha('secondary', 0.8) }}>
        {step.description}
      </p>
      
      {/* Decorative doodle elements */}
      <div className="absolute -z-0 right-4 bottom-4 opacity-10">
        <svg width="100" height="100" viewBox="0 0 100 100">
          {/* Curved line */}
          <path 
            d="M20,50 Q35,20 50,50 Q65,80 80,50" 
            fill="none" 
            stroke={step.color} 
            strokeWidth="2"
            strokeDasharray="4,2"
          >
            <animate 
              attributeName="d" 
              values="M20,50 Q35,20 50,50 Q65,80 80,50; M20,50 Q35,80 50,50 Q65,20 80,50; M20,50 Q35,20 50,50 Q65,80 80,50" 
              dur="10s" 
              repeatCount="indefinite"
            />
          </path>
          
          {/* Dots on the line */}
          <circle cx="20" cy="50" r="3" fill={step.color}>
            <animate 
              attributeName="r" 
              values="3;4;3" 
              dur="2s" 
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="50" cy="50" r="3" fill={step.color}>
            <animate 
              attributeName="r" 
              values="3;4;3" 
              dur="2s" 
              begin="0.6s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="80" cy="50" r="3" fill={step.color}>
            <animate 
              attributeName="r" 
              values="3;4;3" 
              dur="2s" 
              begin="1.2s"
              repeatCount="indefinite"
            />
          </circle>
          
          {/* Additional decorative elements */}
          <path 
            d="M30,30 Q40,20 50,30" 
            fill="none" 
            stroke={step.color} 
            strokeWidth="1"
            strokeDasharray="2,2"
          />
          <path 
            d="M50,70 Q60,80 70,70" 
            fill="none" 
            stroke={step.color} 
            strokeWidth="1"
            strokeDasharray="2,2"
          />
        </svg>
      </div>
    </div>
  );
};

export default ProcessDetail;