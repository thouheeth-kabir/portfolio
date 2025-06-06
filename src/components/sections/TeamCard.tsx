import { useState, useEffect, useMemo } from 'react';
import { Github, Linkedin, Twitter, Mail, ExternalLink } from 'lucide-react';

// Enhanced TeamCard component with warm background, better animations and features
type SocialLinks = {
  github?: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
  [key: string]: string | undefined;
};

type TeamMember = {
  name: string;
  role: string;
  avatar?: string;
  description: string;
  skills: string[];
  social?: SocialLinks;
  processRole?: string;
  processDescription?: string;
  phaseTitle?: string;
};

type TeamCardProps = {
  member: TeamMember;
  css: (key: string) => string;
  cssAlpha: (key: string, alpha: number) => string;
};

export default function TeamCard({ member, css, cssAlpha }: TeamCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [avatarLoaded, setAvatarLoaded] = useState(false);
  
  // Trigger entrance animation when component mounts
  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);
  
  // Toggle flip state
  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  // Generate avatar colors based on name
  const avatarColors = useMemo(() => {
    // Hash the name to get consistent colors
    const hash = member.name.split('').reduce((acc: number, char: string) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    
    // Generate colors from the hash
    const h1 = Math.abs(hash % 360);
    const h2 = (h1 + 40) % 360;
    
    return {
      start: `hsl(${h1}, 80%, 65%)`,
      end: `hsl(${h2}, 80%, 55%)`
    };
  }, [member.name]);

  // Get icon component based on skill name
  const getSkillIcon = (skill: string) => {
    // Map of skill names to icon components
    const iconMap: Record<string, string> = {
      React: "⚛️",
      JavaScript: "𝗝𝗦",
      TypeScript: "𝗧𝗦",
      Node: "🛠️",
      Python: "🐍",
      AWS: "☁️",
      UI: "🎨",
      UX: "👤",
      Figma: "🖌️",
      "UI Design": "🎨",
      Accessibility: "♿",
      GraphQL: "◼️",
      SQL: "🗄️",
      "Node.js": "🛠️"
    };
    
    return iconMap[skill] || "🔧";
  };

  // Get social media icon component
  const getSocialIcon = (type: any) => {
    switch(type) {
      case 'github': return <Github size={18} />;
      case 'linkedin': return <Linkedin size={18} />;
      case 'twitter': return <Twitter size={18} />;
      case 'email': return <Mail size={18} />;
      default: return <ExternalLink size={18} />;
    }
  };
  
  // Warm gradient background for cards - similar to the image
  const warmGradient = `linear-gradient(120deg, #fff8e1 0%, #ffecb3 100%)`;
  
  // Card styling with enhanced shadow and effects
  const cardStyle = {
    background: warmGradient,
    border: `1px solid ${cssAlpha('border', isHovered ? 0.5 : 0.2)}`,
    boxShadow: isHovered 
      ? `0 20px 40px ${cssAlpha('primary', 0.25)}, 0 0 15px ${cssAlpha('secondary', 0.15)}`
      : `0 8px 24px ${cssAlpha('primary', 0.15)}`,
    transform: animate ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
    opacity: animate ? 1 : 0,
  };
  
  // Skill badge animation
  const getSkillDelay = (index: any) => {
    return {
      animationDelay: `${0.1 + (index * 0.1)}s`,
    };
  };

  // Generate pulsing animation keyframes for the avatar
  const pulseAnimation = {
    animation: isHovered ? 'pulse 2s infinite ease-in-out' : 'none',
  };
  
  return (
    <div 
      className="relative w-full h-[400px] rounded-xl overflow-hidden cursor-pointer perspective-1000 transition-all duration-500 ease-in-out"
      onClick={toggleFlip}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={cardStyle}
    >
      {/* Decorative elements */}
      <div 
        className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-20 transition-all duration-500 ease-in-out"
        style={{ 
          background: `radial-gradient(circle, ${css('primary')}, transparent 70%)`,
          transform: isHovered ? 'scale(1.2)' : 'scale(1)',
        }}
      />
      
      {/* Front side of card */}
      <div 
        className={`absolute inset-0 w-full h-full p-6 transition-all duration-700 ease-in-out flex flex-col justify-between ${
          isFlipped ? 'rotate-y-180 opacity-0 pointer-events-none' : 'rotate-y-0 opacity-100'
        }`}
      >
        {/* Header with avatar and name */}
        <div className="flex items-start">
          <div className="flex-1 flex items-center">
            {/* Avatar - Large display */}
            <div 
              className="relative w-20 h-20 mr-4 rounded-full overflow-hidden flex items-center justify-center transition-all duration-500"
              style={{ 
                boxShadow: `0 4px 12px ${cssAlpha('primary', 0.2)}`,
                transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
                ...pulseAnimation
              }}
            >
              {member.avatar ? (
                <img 
                  src={member.avatar} 
                  alt={member.name} 
                  className={`w-full h-full object-cover transition-all duration-500 ease-in-out ${avatarLoaded ? 'opacity-100' : 'opacity-0'}`}
                  style={{
                    filter: isHovered ? 'brightness(1.1)' : 'brightness(1)',
                  }}
                  onLoad={() => setAvatarLoaded(true)}
                />
              ) : (
                <div 
                  className="w-full h-full flex items-center justify-center"
                  style={{ 
                    background: `linear-gradient(135deg, ${avatarColors.start}, ${avatarColors.end})`,
                  }}
                >
                  <span className="text-3xl font-bold text-white animate-pulse">
                    {member.name.charAt(0)}
                  </span>
                </div>
              )}
              
              {/* Animated ring around avatar */}
              <div 
                className="absolute inset-0 rounded-full border-2 border-transparent transition-all duration-300"
                style={{
                  borderColor: isHovered ? css('primary') : 'transparent',
                  transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                  opacity: isHovered ? 0.7 : 0,
                }}
              />
            </div>
            
            <div>
              <h3 
                className="text-2xl font-bold transition-all duration-300"
                style={{ 
                  color: css('primary'),
                  transform: isHovered ? 'translateX(3px)' : 'translateX(0)',
                }}
              >
                {member.name}
              </h3>
              <p 
                className="text-sm mb-1 transition-all duration-300"
                style={{
                  color: '#555',
                  opacity: isHovered ? 0.9 : 0.7,
                }}
              >
                {member.role}
              </p>
              
              {/* Social links */}
              {member.social && (
                <div className="flex space-x-2 mt-1">
                  {Object.entries(member.social).map(([type, url], i) => (
                    <a 
                      key={type}
                      href={url}
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 rounded-full transition-all duration-300 hover:scale-110"
                      style={{ 
                        backgroundColor: cssAlpha('primary', 0.1),
                        color: css('primary'),
                        transform: `scale(${isHovered ? 1 : 0.95})`,
                        opacity: isHovered ? 1 : 0.7,
                        transitionDelay: `${i * 50}ms`,
                      }}
                    >
                      {getSocialIcon(type)}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Description and skills section */}
        <div className="mt-6">
          <p 
            className="mb-4 text-sm leading-relaxed line-clamp-3 transition-all duration-300"
            style={{
              color: '#333',
              opacity: isHovered ? 0.95 : 0.8,
              transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
            }}
          >
            {member.description}
          </p>
          
          {/* Animated skill badges */}
          <div className="flex flex-wrap gap-2">
            {member.skills.map((skill, i) => (
              <span 
                key={i}
                className="px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5"
                style={{
                  backgroundColor: cssAlpha('primary', 0.1),
                  color: css('primary'),
                  boxShadow: isHovered ? `0 2px 8px ${cssAlpha('primary', 0.15)}` : 'none',
                  transform: isHovered ? 'translateY(-2px) scale(1.05)' : 'translateY(0) scale(1)',
                  transition: 'all 0.3s ease-in-out',
                  transitionDelay: `${i * 50}ms`,
                  ...getSkillDelay(i),
                  animation: `fadeIn 0.5s ${0.1 + (i * 0.1)}s both`
                }}
              >
                <span 
                  className="text-base transition-transform duration-300"
                  style={{ 
                    transform: isHovered ? 'scale(1.2) rotate(5deg)' : 'scale(1) rotate(0)',
                    transitionDelay: `${i * 30}ms`
                  }}
                >
                  {getSkillIcon(skill)}
                </span>
                {skill}
              </span>
            ))}
          </div>
          
          <div 
            className="absolute bottom-2 right-4 text-xs opacity-70 transition-all duration-300"
            style={{
              color: '#666',
              transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
              opacity: isHovered ? 0.9 : 0.6,
            }}
          >
            Click to flip
          </div>
        </div>
      </div>
      
      {/* Back side of card */}
      <div 
        className={`absolute inset-0 w-full h-full p-6 transition-all duration-700 ease-in-out flex flex-col items-center justify-center text-center ${
          isFlipped ? 'rotate-y-0 opacity-100' : 'rotate-y-180 opacity-0 pointer-events-none'
        }`}
        style={{ background: warmGradient }}
      >
        {/* Process role badge */}
        <div 
          className="w-16 h-16 rounded-full mb-4 flex items-center justify-center"
          style={{ 
            background: `linear-gradient(135deg, ${avatarColors.start}, ${avatarColors.end})`,
            boxShadow: `0 6px 20px ${cssAlpha('secondary', 0.25)}`,
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'all 0.3s ease-in-out',
            animation: isHovered ? 'pulse 2s infinite ease-in-out' : 'none',
          }}
        >
          <span className="text-2xl text-white font-bold">{member.phaseTitle?.charAt(0) || "P"}</span>
        </div>
        
        <h3 
          className="text-xl font-bold mb-3 text-center transition-all duration-300"
          style={{ 
            color: css('secondary'),
            transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
          }}
        >
          {member.processRole || "Team Member"}
        </h3>
        
        <p 
          className="text-center mb-6 max-w-xs mx-auto transition-all duration-300"
          style={{
            color: '#333',
            opacity: isHovered ? 0.95 : 0.8,
            transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
          }}
        >
          {member.processDescription || "Contributes to the team with specialized skills and expertise."}
        </p>
        
        <div 
          className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-500"
          style={{ 
            backgroundColor: cssAlpha('secondary', 0.1),
            color: css('secondary'),
            boxShadow: isHovered ? `0 4px 12px ${cssAlpha('secondary', 0.2)}` : 'none',
            transform: isHovered ? 'translateY(-3px) scale(1.03)' : 'translateY(0) scale(1)',
          }}
        >
          {member.phaseTitle || "Team Phase"}
        </div>
        
        <div 
          className="absolute bottom-2 right-4 text-xs opacity-70 transition-all duration-300"
          style={{
            color: '#666',
            transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
            opacity: isHovered ? 0.9 : 0.6,
          }}
        >
          Click to flip back
        </div>
      </div>
      
      {/* Corner decorative element */}
      <div 
        className="absolute top-0 left-0 w-20 h-20 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(circle at top left, ${cssAlpha('secondary', 0.5)}, transparent 70%)`,
          transform: isHovered ? 'scale(1.2)' : 'scale(1)',
          transition: 'all 0.5s ease-in-out',
        }}
      />
      
      {/* Global animation styles */}
      <style jsx>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}