'use client'

import { useState } from 'react';

export default function ThemeToggler({
  currentTheme,
  themeName,
  themeCategory,
  nextTheme,
  previousTheme,
  randomTheme,
  css,
  cssAlpha
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Toggle expanded state
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  
  // Main button style
  const buttonStyle = {
    backgroundColor: css('primary'),
    color: css('background'),
    boxShadow: `0 4px 12px ${cssAlpha('primary', 0.3)}`
  };
  
  // Secondary button style
  const secondaryButtonStyle = {
    backgroundColor: cssAlpha('muted', 0.7),
    color: css('foreground'),
    border: `1px solid ${css('border')}`
  };
  
  // Theme info panel style
  const infoStyle = {
    backgroundColor: css('background'),
    color: css('foreground'),
    border: `1px solid ${css('border')}`,
    boxShadow: `0 10px 25px -5px ${cssAlpha('primary', 0.2)}`
  };

  return (
    <div className="relative">
      {/* Main toggle button */}
      <button
        onClick={toggleExpanded}
        className="w-12 h-12 rounded-full flex items-center justify-center transition-transform hover:scale-105"
        style={buttonStyle}
        aria-label={isExpanded ? "Close theme options" : "Open theme options"}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          {isExpanded ? (
            <path d="M18 6L6 18M6 6l12 12" />
          ) : (
            <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
          )}
        </svg>
      </button>
      
      {/* Expanded theme options */}
      {isExpanded && (
        <div 
          className="absolute bottom-16 right-0 mb-2 rounded-lg overflow-hidden w-64 animate-fadeIn"
          style={infoStyle}
        >
          {/* Theme info */}
          <div className="p-4 border-b" style={{ borderColor: css('border') }}>
            <div className="font-medium mb-1" style={{ color: css('primary') }}>
              Current Theme
            </div>
            <div className="text-xl font-bold mb-1">
              {themeName}
            </div>
            <div className="text-sm opacity-70">
              Category: {themeCategory}
            </div>
          </div>
          
          {/* Theme color preview */}
          <div className="p-3 grid grid-cols-4 gap-2">
            {['primary', 'secondary', 'accent', 'background'].map((color) => (
              <div key={color} className="flex flex-col items-center">
                <div 
                  className="w-8 h-8 rounded-full mb-1"
                  style={{ backgroundColor: css(color) }}
                ></div>
                <span className="text-xs">{color}</span>
              </div>
            ))}
          </div>
          
          {/* Theme controls */}
          <div className="p-3 flex space-x-2">
            <button
              onClick={previousTheme}
              className="flex-1 py-2 rounded-md text-sm transition-colors"
              style={secondaryButtonStyle}
            >
              Previous
            </button>
            <button
              onClick={nextTheme}
              className="flex-1 py-2 rounded-md text-sm transition-colors"
              style={secondaryButtonStyle}
            >
              Next
            </button>
            <button
              onClick={randomTheme}
              className="flex-1 py-2 rounded-md text-sm transition-colors"
              style={buttonStyle}
            >
              Random
            </button>
          </div>
        </div>
      )}
    </div>
  );
}