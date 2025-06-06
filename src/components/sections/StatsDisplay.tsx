'use client'

import { useState, useEffect } from 'react';

type StatsDisplayProps = {
  stats?: Array<{ value: number | string; label: string }>;
  css?: (key: string) => string;
  cssAlpha?: (key: string, alpha: number) => string;
};

export default function StatsDisplay({ stats, css, cssAlpha }: StatsDisplayProps) {
  const [animatedStats, setAnimatedStats] = useState<Array<{ value: number | string; label: string; animatedValue: number }>>([]);
  const [isVisible, setIsVisible] = useState(false);

  // Sample data for demonstration
  const defaultStats = [
    { value: 2847, label: "Total Users" },
    { value: 156, label: "Active Projects" },
    { value: 98.5, label: "Success Rate %" },
    { value: 42, label: "Team Members" }
  ];

  const displayStats = stats || defaultStats;

  // Animation effect for counting up numbers
  useEffect(() => {
    setIsVisible(true);
    const animationDuration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = animationDuration / steps;

    displayStats.forEach((stat, index) => {
      let currentValue = 0;
      const targetValue = typeof stat.value === 'string' ? parseFloat(stat.value) : stat.value;
      const increment = targetValue / steps;

      const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
          currentValue = targetValue;
          clearInterval(timer);
        }

        setAnimatedStats(prev => {
          const newStats = [...prev];
          newStats[index] = {
            ...stat,
            animatedValue: currentValue
          };
          return newStats;
        });
      }, stepDuration);
    });

    // Initialize with zeros
    setAnimatedStats(displayStats.map(stat => ({ ...stat, animatedValue: 0 })));
  }, []);

  interface FormattableValue {
    value: number;
    originalValue: number | string;
  }

  const formatValue = (value: number, originalValue: number | string): string => {
    if (typeof originalValue === 'string' && originalValue.includes('%')) {
      return value.toFixed(1) + '%';
    }
    if (value >= 1000) {
      return (value / 1000).toFixed(1) + 'k';
    }
    return Math.floor(value).toLocaleString();
  };

  return (
    <div className="w-full px-3 sm:px-4 lg:px-6 xl:px-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 max-w-7xl mx-auto">
        {animatedStats.map((stat, index) => (
          <div 
            key={index}
            className={`group relative overflow-hidden transform transition-all duration-700 ease-out ${
              isVisible 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-4 opacity-0'
            }`}
            style={{ 
              transitionDelay: `${index * 150}ms`,
            }}
          >
            {/* Glassmorphism card */}
            <div 
              className="relative p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl backdrop-blur-xl border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-500 ease-out group-hover:scale-105 group-hover:-translate-y-1 h-full"
              style={{
                background: css && cssAlpha ? 
                  `linear-gradient(135deg, ${cssAlpha('primary', 0.1)} 0%, ${cssAlpha('secondary', 0.05)} 100%)` :
                  'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.05) 100%)'
              }}
            >
              {/* Animated gradient border */}
              <div 
                className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: css ?
                    `linear-gradient(45deg, ${css('primary')}, ${css('secondary')}, ${css('primary')})` :
                    'linear-gradient(45deg, #3b82f6, #8b5cf6, #3b82f6)',
                  backgroundSize: '400% 400%',
                  animation: 'gradientShift 3s ease infinite',
                  padding: '1px',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude'
                }}
              />

              {/* Floating particles effect */}
              <div className="absolute inset-0 overflow-hidden rounded-xl sm:rounded-2xl">
                {[...Array(2)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
                    style={{
                      left: `${25 + i * 50}%`,
                      top: `${15 + i * 30}%`,
                      animationDelay: `${i * 0.8}s`,
                      animationDuration: '2s'
                    }}
                  />
                ))}
              </div>

              {/* Content */}
              <div className="relative z-10 text-center h-full flex flex-col justify-between">
                {/* Icon placeholder with gradient background */}
                <div 
                  className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 mx-auto mb-3 sm:mb-4 rounded-xl flex items-center justify-center text-lg sm:text-xl lg:text-2xl font-bold text-white shadow-lg"
                  style={{
                    background: css ?
                      `linear-gradient(135deg, ${css('primary')} 0%, ${css('secondary')} 100%)` :
                      'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)'
                  }}
                >
                  {index === 0 && '👥'}
                  {index === 1 && '📊'}
                  {index === 2 && '✨'}
                  {index === 3 && '🚀'}
                </div>

                <div className="flex-1 flex flex-col justify-center">
                  <div 
                    className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black mb-2 sm:mb-3 bg-clip-text text-transparent leading-tight"
                    style={{
                      backgroundImage: css ?
                        `linear-gradient(135deg, ${css('primary')} 0%, ${css('secondary')} 100%)` :
                        'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)'
                    }}
                  >
                    {formatValue(stat.animatedValue, stat.value)}
                  </div>
                  
                  <div 
                    className="text-xs sm:text-sm font-semibold uppercase tracking-wider opacity-80 leading-tight"
                    style={{ 
                      color: cssAlpha ? cssAlpha('foreground', 0.7) : '#64748b'
                    }}
                  >
                    {stat.label}
                  </div>
                </div>

                {/* Progress indicator */}
                <div className="mt-3 sm:mt-4 h-1 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full transition-all duration-1000 ease-out rounded-full"
                    style={{
                      width: `${(stat.animatedValue / (typeof stat.value === 'string' ? parseFloat(stat.value) : stat.value)) * 100}%`,
                      background: css ?
                        `linear-gradient(90deg, ${css('primary')} 0%, ${css('secondary')} 100%)` :
                        'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)'
                    }}
                  />
                </div>
              </div>

              {/* Hover glow effect */}
              <div 
                className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: css ?
                    `radial-gradient(circle at center, ${css('primary')} 0%, transparent 70%)` :
                    'radial-gradient(circle at center, #3b82f6 0%, transparent 70%)'
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
}