import { useState, useEffect } from 'react';

interface ThemeTogglerProps {
  currentTheme: any;
  themeName: string;
  themeCategory: string;
  nextTheme: () => void;
  previousTheme: () => void;
  randomTheme: () => void;
  css: (color: any) => string;
  cssAlpha: (color: any, alpha: number) => string;
}

export default function ThemeToggler({
  currentTheme,
  themeName,
  themeCategory,
  nextTheme,
  previousTheme,
  randomTheme,
  css,
  cssAlpha
}: ThemeTogglerProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [colorParticles, setColorParticles] = useState<Array<{color: string, x: number, y: number, size: number, angle: number, speed: number}>>([]);
  const [activeColor, setActiveColor] = useState<string | null>(null);
  const [themeChanging, setThemeChanging] = useState(false);
  
  useEffect(() => {
    // Determine if the current theme is dark based on luminance
    const primaryColor = css('primary');
    const rgb = hexToRgb(primaryColor);
    const luminance = rgb ? 0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b : 128;
    setIsDarkTheme(luminance < 128);
  }, [currentTheme, css]);
  
  // Convert hex color to rgb
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };
  
  // Toggle expanded state
  const toggleExpanded = () => {
    setIsAnimating(true);
    
    if (!isExpanded) {
      // Generate color particles when opening
      generateColorParticles();
    } else {
      // Clear particles when closing
      setTimeout(() => {
        setColorParticles([]);
      }, 300);
    }
    
    setIsExpanded(!isExpanded);
    
    // Reset animation state after animation completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };
  
  // Generate random color particles based on theme colors
  const generateColorParticles = () => {
    const colors = ['primary', 'secondary', 'accent', 'muted'];
    const particles = [];
    
    for (let i = 0; i < 15; i++) {
      particles.push({
        color: css(colors[Math.floor(Math.random() * colors.length)]),
        x: (Math.random() - 0.5) * 120,
        y: (Math.random() - 0.5) * 120,
        size: 3 + Math.random() * 5,
        angle: Math.random() * Math.PI * 2,
        speed: 0.5 + Math.random() * 1.5
      });
    }
    
    setColorParticles(particles);
  };
  
  // Generate bubbles for liquid animation
  const renderBubbles = (count: number) => {
    return Array.from({ length: count }).map((_, i) => (
      <div 
        key={i}
        className="absolute rounded-full bg-white bg-opacity-50"
        style={{
          width: `${4 + Math.random() * 6}px`,
          height: `${4 + Math.random() * 6}px`,
          left: `${10 + Math.random() * 80}%`,
          bottom: '0',
          animation: `bubbleRise ${2 + Math.random() * 2}s linear infinite ${Math.random() * 2}s`
        }}
      />
    ));
  };
  
  // Animate particles
  useEffect(() => {
    if (colorParticles.length === 0) return;
    
    const interval = setInterval(() => {
      setColorParticles(prevParticles => 
        prevParticles.map(particle => ({
          ...particle,
          x: particle.x + Math.cos(particle.angle) * particle.speed,
          y: particle.y + Math.sin(particle.angle) * particle.speed,
          size: particle.size * 0.96, // Slowly shrink
          speed: particle.speed * 0.98 // Slowly decelerate
        })).filter(p => p.size > 0.5) // Remove too small particles
      );
    }, 50);
    
    return () => clearInterval(interval);
  }, [colorParticles]);

  // Handle theme change with animation
  const handleThemeChange = (changeFunction: () => void) => {
    setThemeChanging(true);
    
    // Generate particles
    generateColorParticles();
    
    // Apply theme change
    changeFunction();
    
    // Reset animation state
    setTimeout(() => {
      setThemeChanging(false);
    }, 800);
  };

  return (
    <div className="relative">
      {/* Animated color particles */}
      {colorParticles.length > 0 && (
        <div className="absolute pointer-events-none" style={{ top: '50%', left: '50%' }}>
          {colorParticles.map((particle, i) => (
            <div 
              key={i}
              className="absolute rounded-full transform -translate-x-1/2 -translate-y-1/2"
              style={{
                backgroundColor: particle.color,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                transform: `translate(${particle.x}px, ${particle.y}px)`,
                opacity: particle.size / 10,
                transition: 'transform 0.05s linear, opacity 0.05s linear'
              }}
            />
          ))}
        </div>
      )}

      {/* Main toggle button - Sun/Moon Design */}
      <button
        onClick={toggleExpanded}
        className="w-14 h-14 rounded-full flex items-center justify-center relative overflow-hidden transition-all duration-300"
        style={{
          backgroundColor: isExpanded ? css('background') : css('primary'),
          boxShadow: `0 4px 12px ${cssAlpha('primary', 0.3)}`,
          transform: isAnimating ? 'scale(1.1)' : 'scale(1)',
        }}
        aria-label={isExpanded ? "Close theme options" : "Open theme options"}
      >
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          {/* Liquid animation inside the button */}
          <div 
            className="absolute inset-0 overflow-hidden"
            style={{
              opacity: isAnimating ? 1 : 0,
              transition: 'opacity 0.5s ease'
            }}
          >
            <div 
              className="absolute bottom-0 left-0 right-0 bg-opacity-80"
              style={{
                height: '100%', 
                backgroundColor: css('primary'),
                transform: `translateY(${isAnimating ? '60%' : '100%'})`,
                transition: 'transform 0.7s ease-out',
                zIndex: 0
              }}
            >
              {/* Waves */}
              <div 
                className="absolute top-0 left-0 w-[200%] h-6"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23ffffff' fill-opacity='0.5' d='M0,192L48,176C96,160,192,128,288,122.7C384,117,480,139,576,149.3C672,160,768,160,864,138.7C960,117,1056,75,1152,69.3C1248,64,1344,96,1392,112L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundSize: 'contain',
                  animation: 'waveMotion 6s linear infinite'
                }}
              />
              <div 
                className="absolute top-1 left-0 w-[200%] h-6"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23ffffff' fill-opacity='0.3' d='M0,192L48,176C96,160,192,128,288,122.7C384,117,480,139,576,149.3C672,160,768,160,864,138.7C960,117,1056,75,1152,69.3C1248,64,1344,96,1392,112L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundSize: 'contain',
                  animation: 'waveMotion 8s linear infinite reverse'
                }}
              />
              
              {/* Bubbles */}
              {renderBubbles(5)}
            </div>
          </div>
          
          {/* Sun and Moon Icon with animation */}
          <div 
            className="w-7 h-7 rounded-full relative transition-all duration-500 z-10"
            style={{
              backgroundColor: isExpanded ? css('primary') : css('background'),
              transform: `scale(${isExpanded ? 0.8 : 1})`,
              boxShadow: isExpanded ? 'none' : `0 0 20px ${cssAlpha('primary', 0.5)}`,
            }}
          >
            {/* Moon crater or sun rays */}
            {isExpanded ? (
              // Moon craters when expanded
              <>
                <div 
                  className="absolute rounded-full bg-opacity-20 transition-all duration-500"
                  style={{
                    width: '8px',
                    height: '8px',
                    top: '8px',
                    left: '6px',
                    backgroundColor: css('muted'),
                  }}
                />
                <div 
                  className="absolute rounded-full bg-opacity-15 transition-all duration-500"
                  style={{
                    width: '5px',
                    height: '5px',
                    top: '15px',
                    left: '16px',
                    backgroundColor: css('muted'),
                  }}
                />
              </>
            ) : (
              // Sun rays when not expanded
              <>
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute bg-current origin-center transition-all duration-300"
                    style={{
                      width: '2px',
                      height: '5px',
                      top: '50%',
                      left: '50%',
                      marginLeft: '-1px',
                      marginTop: '-2.5px',
                      transformOrigin: '50% 14px',
                      transform: `rotate(${i * 45}deg) translateY(-10px)`,
                      opacity: 0.8,
                      backgroundColor: css('primary'),
                    }}
                  />
                ))}
              </>
            )}
            
            {/* Moon shadow overlay */}
            <div 
              className="absolute top-0 right-0 w-full h-full rounded-full transition-all duration-500"
              style={{
                transform: isExpanded ? 'translateX(-30%)' : 'translateX(100%)',
                backgroundColor: css('background'),
                opacity: 0.9,
              }}
            />
          </div>
        </div>
      </button>
      
      {/* Expanded theme panel */}
      <div 
        className="absolute bottom-full mb-4 right-0 rounded-xl overflow-hidden transition-all duration-300 origin-bottom-right"
        style={{
          width: '280px',
          backgroundColor: css('background'),
          color: css('foreground'),
          border: `1px solid ${css('border')}`,
          boxShadow: `0 -10px 25px -5px ${cssAlpha('primary', 0.2)}`,
          opacity: isExpanded ? 1 : 0,
          transform: isExpanded ? 'scale(1)' : 'scale(0.95)',
          visibility: isExpanded ? 'visible' : 'hidden',
          pointerEvents: isExpanded ? 'auto' : 'none',
        }}
      >
        {/* Theme header */}
        <div 
          className="p-4 flex items-center space-x-3 border-b"
          style={{ borderColor: css('border') }}
        >
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden relative"
            style={{ 
              background: `linear-gradient(135deg, ${css('primary')}, ${cssAlpha('primary', 0.7)})`,
              boxShadow: `0 2px 8px ${cssAlpha('primary', 0.3)}`
            }}
          >
            {/* Liquid fill animation for the icon */}
            <div className="absolute inset-0 overflow-hidden">
              <div 
                className="absolute bottom-0 left-0 right-0"
                style={{
                  height: '100%', 
                  backgroundColor: css('primary'),
                  transform: 'translateY(40%)',
                  animation: themeChanging ? 'fillUp 1s ease-out forwards' : 'none'
                }}
              >
                {/* Waves */}
                <div 
                  className="absolute top-0 left-0 w-[200%] h-4"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23ffffff' fill-opacity='0.5' d='M0,192L48,176C96,160,192,128,288,122.7C384,117,480,139,576,149.3C672,160,768,160,864,138.7C960,117,1056,75,1152,69.3C1248,64,1344,96,1392,112L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundSize: 'contain',
                    animation: 'waveMotion 6s linear infinite'
                  }}
                />
                <div 
                  className="absolute top-1 left-0 w-[200%] h-4"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23ffffff' fill-opacity='0.3' d='M0,192L48,176C96,160,192,128,288,122.7C384,117,480,139,576,149.3C672,160,768,160,864,138.7C960,117,1056,75,1152,69.3C1248,64,1344,96,1392,112L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundSize: 'contain',
                    animation: 'waveMotion 8s linear infinite reverse'
                  }}
                />
                
                {/* Bubbles */}
                {renderBubbles(3)}
              </div>
            </div>
            
            {isDarkTheme ? (
              // Moon icon for dark themes
              <div className="relative w-6 h-6 z-10">
                <div 
                  className="absolute w-full h-full rounded-full"
                  style={{ backgroundColor: css('background') }}
                />
                <div 
                  className="absolute w-full h-full rounded-full transform -translate-x-1/4"
                  style={{ backgroundColor: css('primary') }}
                />
              </div>
            ) : (
              // Sun icon for light themes
              <div className="relative w-6 h-6 z-10">
                <div 
                  className="absolute w-full h-full rounded-full"
                  style={{ backgroundColor: css('background') }}
                />
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute bg-current origin-center"
                    style={{
                      width: '1.5px',
                      height: '4px',
                      top: '50%',
                      left: '50%',
                      marginLeft: '-0.75px',
                      marginTop: '-2px',
                      transformOrigin: '50% 11px',
                      transform: `rotate(${i * 45}deg) translateY(-8px)`,
                      backgroundColor: css('background'),
                    }}
                  />
                ))}
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <div className="font-medium" style={{ color: css('primary') }}>
              Current Theme
            </div>
            <div className="text-lg font-bold">
              {themeName}
            </div>
            <div className="text-xs opacity-70">
              Category: {themeCategory}
            </div>
          </div>
        </div>
        
        {/* Theme color showcase */}
        <div className="p-3 grid grid-cols-4 gap-2 relative">
          {/* Color circles */}
          {['primary', 'secondary', 'accent', 'background'].map((color, index) => (
            <div 
              key={color} 
              className="flex flex-col items-center"
              onMouseEnter={() => setActiveColor(color)}
              onMouseLeave={() => setActiveColor(null)}
            >
              <div className="relative w-12 h-12 mb-1">
                {/* Liquid container */}
                <div className="absolute inset-0 rounded-full overflow-hidden shadow-md"
                  style={{ 
                    border: `1px solid ${cssAlpha(color, 0.3)}`,
                  }}
                >
                  {/* Liquid fill */}
                  <div 
                    className="absolute bottom-0 left-0 right-0"
                    style={{
                      height: '100%', 
                      backgroundColor: css(color),
                      transform: activeColor === color ? 'translateY(25%)' : 'translateY(40%)',
                      transition: 'transform 0.5s ease-out'
                    }}
                  >
                    {/* Waves */}
                    <div 
                      className="absolute top-0 left-0 w-[200%] h-4"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23ffffff' fill-opacity='0.5' d='M0,192L48,176C96,160,192,128,288,122.7C384,117,480,139,576,149.3C672,160,768,160,864,138.7C960,117,1056,75,1152,69.3C1248,64,1344,96,1392,112L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E")`,
                        backgroundSize: 'contain',
                        animation: `waveMotion ${6 + index}s linear infinite`
                      }}
                    />
                    <div 
                      className="absolute top-1 left-0 w-[200%] h-4"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23ffffff' fill-opacity='0.3' d='M0,192L48,176C96,160,192,128,288,122.7C384,117,480,139,576,149.3C672,160,768,160,864,138.7C960,117,1056,75,1152,69.3C1248,64,1344,96,1392,112L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E")`,
                        backgroundSize: 'contain',
                        animation: `waveMotion ${8 + index}s linear infinite reverse`
                      }}
                    />
                    
                    {/* Bubbles - only show when active */}
                    {activeColor === color && renderBubbles(4)}
                  </div>
                </div>
                
                {/* Color identifier circle - acts as a color label */}
                <div 
                  className={`absolute inset-0 rounded-full transition-transform duration-300 ${activeColor === color ? 'scale-0' : 'scale-1'}`}
                  style={{
                    backgroundColor: css(color),
                    boxShadow: `0 3px 10px ${cssAlpha(color, 0.3)}`,
                    animation: `colorPulse 3s ${index * 0.5}s infinite alternate`
                  }}
                >
                  {/* Glow effect */}
                  <div 
                    className="absolute inset-0 rounded-full opacity-0 hover:opacity-40 transition-opacity duration-300"
                    style={{ 
                      boxShadow: `0 0 15px 5px ${css(color)}`,
                    }}
                  />
                </div>
              </div>
              <span className="text-xs">{color}</span>
            </div>
          ))}
        </div>
        
        {/* Theme controls */}
        <div className="p-4 grid grid-cols-2 gap-3">
          <div className="flex space-x-2">
            <button
              onClick={() => handleThemeChange(previousTheme)}
              className="flex-1 py-2 px-3 rounded-md text-sm transition-all hover:scale-105 active:scale-95 flex items-center justify-center relative overflow-hidden"
              style={{
                backgroundColor: cssAlpha('muted', 0.2),
                color: css('foreground'),
                border: `1px solid ${cssAlpha('border', 0.5)}`,
                transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            >
              {/* Liquid animation on click */}
              <div 
                className="absolute inset-0 overflow-hidden"
                style={{
                  opacity: themeChanging ? 1 : 0,
                  transition: 'opacity 0.5s ease'
                }}
              >
                <div 
                  className="absolute bottom-0 left-0 right-0 bg-opacity-20"
                  style={{
                    height: '100%', 
                    backgroundColor: css('primary'),
                    transform: themeChanging ? 'translateY(0%)' : 'translateY(100%)',
                    transition: 'transform 0.7s ease-out'
                  }}
                >
                  {/* Waves */}
                  <div 
                    className="absolute top-0 left-0 w-[200%] h-6"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23ffffff' fill-opacity='0.5' d='M0,192L48,176C96,160,192,128,288,122.7C384,117,480,139,576,149.3C672,160,768,160,864,138.7C960,117,1056,75,1152,69.3C1248,64,1344,96,1392,112L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E")`,
                      backgroundSize: 'contain',
                      animation: 'waveMotion 6s linear infinite'
                    }}
                  />
                  {renderBubbles(3)}
                </div>
              </div>
              
              <svg className="w-5 h-5 mr-1.5 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M5 12L12 19M5 12L12 5" />
              </svg>
              <span className="relative z-10">Previous</span>
            </button>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => handleThemeChange(nextTheme)}
              className="flex-1 py-2 px-3 rounded-md text-sm transition-all hover:scale-105 active:scale-95 flex items-center justify-center relative overflow-hidden"
              style={{
                backgroundColor: cssAlpha('muted', 0.2),
                color: css('foreground'),
                border: `1px solid ${cssAlpha('border', 0.5)}`,
                transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            >
              {/* Liquid animation on click */}
              <div 
                className="absolute inset-0 overflow-hidden"
                style={{
                  opacity: themeChanging ? 1 : 0,
                  transition: 'opacity 0.5s ease'
                }}
              >
                <div 
                  className="absolute bottom-0 left-0 right-0 bg-opacity-20"
                  style={{
                    height: '100%', 
                    backgroundColor: css('primary'),
                    transform: themeChanging ? 'translateY(0%)' : 'translateY(100%)',
                    transition: 'transform 0.7s ease-out'
                  }}
                >
                  {/* Waves */}
                  <div 
                    className="absolute top-0 left-0 w-[200%] h-6"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23ffffff' fill-opacity='0.5' d='M0,192L48,176C96,160,192,128,288,122.7C384,117,480,139,576,149.3C672,160,768,160,864,138.7C960,117,1056,75,1152,69.3C1248,64,1344,96,1392,112L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E")`,
                      backgroundSize: 'contain',
                      animation: 'waveMotion 6s linear infinite'
                    }}
                  />
                  {renderBubbles(3)}
                </div>
              </div>
              
              <span className="relative z-10">Next</span>
              <svg className="w-5 h-5 ml-1.5 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M14 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          <button
            onClick={() => {
              handleThemeChange(randomTheme);
              
              // Create extra burst of particles for random
              const extraBurst = [];
              for (let i = 0; i < 15; i++) {
                extraBurst.push({
                  color: css(['primary', 'secondary', 'accent'][Math.floor(Math.random() * 3)]),
                  x: (Math.random() - 0.5) * 180,
                  y: (Math.random() - 0.5) * 180,
                  size: 5 + Math.random() * 8,
                  angle: Math.random() * Math.PI * 2,
                  speed: 1 + Math.random() * 2
                });
              }
              setColorParticles(prev => [...prev, ...extraBurst]);
            }}
            className="col-span-2 py-3 rounded-md text-sm transition-all hover:scale-102 active:scale-98 flex items-center justify-center relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${css('primary')}, ${cssAlpha('secondary', 0.8)})`,
              color: css('background'),
              boxShadow: `0 4px 12px ${cssAlpha('primary', 0.3)}`,
              transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            {/* Liquid animation on click */}
            <div 
              className="absolute inset-0 overflow-hidden"
              style={{
                opacity: themeChanging ? 1 : 0,
                transition: 'opacity 0.5s ease'
              }}
            >
              <div 
                className="absolute bottom-0 left-0 right-0 bg-opacity-30"
                style={{
                  height: '100%', 
                  backgroundColor: css('background'),
                  transform: themeChanging ? 'translateY(0%)' : 'translateY(100%)',
                  transition: 'transform 0.7s ease-out'
                }}
              >
                {/* Waves */}
                <div 
                  className="absolute top-0 left-0 w-[200%] h-8"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23ffffff' fill-opacity='0.5' d='M0,192L48,176C96,160,192,128,288,122.7C384,117,480,139,576,149.3C672,160,768,160,864,138.7C960,117,1056,75,1152,69.3C1248,64,1344,96,1392,112L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundSize: 'contain',
                    animation: 'waveMotion 6s linear infinite'
                  }}
                />
                {renderBubbles(6)}
              </div>
            </div>
            
            <svg className="w-5 h-5 mr-2 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="7.5 4.21 12 6.81 16.5 4.21" />
              <polyline points="7.5 19.79 7.5 14.6 3 12" />
              <polyline points="21 12 16.5 14.6 16.5 19.79" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
            <span className="relative z-10">Random Theme</span>
          </button>
        </div>
      </div>
      
      {/* Global styles for animations */}
      <style jsx global>{`
        @keyframes waveMotion {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        @keyframes colorPulse {
          0% { transform: scale(1); }
          100% { transform: scale(1.15); }
        }
        
        @keyframes fillUp {
          0% { transform: translateY(100%); }
          100% { transform: translateY(40%); }
        }
        
        @keyframes bubbleRise {
          0% { 
            transform: translateY(0) scale(0.8); 
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% { 
            transform: translateY(-150px) scale(1.2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}