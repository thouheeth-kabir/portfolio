'use client'

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TeamCard from './TeamCard';
import HowWeWork from './HowWeWork';
import StatsDisplay from './StatsDisplay';
import { ArrowDown, Code, Zap, Globe } from 'lucide-react';

// Hero Section component with enhanced UI and animations
export default function HeroSection({ css, cssAlpha }) {
  // Sample team data (reduced to 2 members)
  const teamMembers = [
    {
      name: "Alex Chen",
      role: "Lead Developer",
      description: "Full-stack developer with 8+ years of experience building scalable web applications.",
      skills: ["React", "Node.js", "AWS"],
      processRole: "Architecture Planning",
      processDescription: "Designs system architecture and technical specifications for all projects.",
      phaseTitle: "Planning Phase",
      icon: <Code size={24} />
    },
    {
      name: "Sarah Johnson",
      role: "UI/UX Designer",
      description: "Creates beautiful, intuitive interfaces with a focus on accessibility and user experience.",
      skills: ["Figma", "UI Design", "Accessibility"],
      processRole: "User Experience Design",
      processDescription: "Translates requirements into wireframes, prototypes, and final designs.",
      phaseTitle: "Design Phase",
      icon: <Globe size={24} />
    }
  ];
  
  // Team stats with improved data visualization
  const stats = [
    { label: "Years Experience", value: "25+", icon: <Zap size={20} /> },
    { label: "Projects Completed", value: "120+", icon: <Code size={20} /> },
    { label: "Client Satisfaction", value: "98%", icon: <Globe size={20} /> }
  ];
  
  // State for parallax effect
  const [scrollY, setScrollY] = useState(0);
  
  // Handle scroll for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Background particles state
  const [particles] = useState(() => 
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 10 + 5,
      opacity: Math.random() * 0.5
    }))
  );
  
  // Modern gradient background with subtle color shifts
  const gradientStyle = {
    background: `radial-gradient(circle at 30% 10%, ${cssAlpha('primary', 0.1)}, transparent 40%), 
                 radial-gradient(circle at 70% 90%, ${cssAlpha('secondary', 0.05)}, transparent 40%),
                 linear-gradient(to bottom, ${css('background')}, ${cssAlpha('primary', 0.03)})`,
    position: 'relative',
    overflow: 'hidden'
  };

  return (
    <section 
      id="hero" 
      className="min-h-screen pt-24 pb-16 relative"
      style={gradientStyle}
    >
      {/* Animated background particles */}
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          initial={{ opacity: particle.opacity }}
          animate={{ 
            y: [particle.y + '%', (particle.y + 5) + '%', particle.y + '%'],
            opacity: [particle.opacity, particle.opacity + 0.1, particle.opacity]
          }}
          transition={{ 
            duration: 4 + Math.random() * 6, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: css('primary'),
            transform: `translateY(${scrollY * 0.1}px)`
          }}
        />
      ))}
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Main headline with animation */}
        <motion.div 
          className="max-w-4xl mx-auto text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            style={{ 
              color: css('primary'),
              textShadow: `0 0 30px ${cssAlpha('primary', 0.3)}`
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <span className="inline-block">We Build</span>{" "}
            <span className="inline-block relative">
              <span className="relative z-10">Digital Experiences</span>
              <motion.span 
                className="absolute bottom-0 left-0 h-3 w-full rounded-sm"
                style={{ background: cssAlpha('secondary', 0.3) }}
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 1 }}
              />
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl max-w-3xl mx-auto"
            style={{ color: css('secondary', 0.9) }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            A team of passionate developers bringing your vision to life with code.
          </motion.p>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <motion.div
            className="w-[2px] h-10"
            style={{ background: cssAlpha('primary', 0.5) }}
            animate={{ 
              height: [30, 40, 30],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          />
        </motion.div>
        
        {/* How We Work Component with stagger animation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <HowWeWork css={css} cssAlpha={cssAlpha} />
        </motion.div>
        
        {/* Team Members with flip cards and staggered animation */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2
              }
            },
            hidden: {}
          }}
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 50 }
              }}
              transition={{ duration: 0.6 }}
            >
              <TeamCard 
                member={member} 
                css={css} 
                cssAlpha={cssAlpha} 
              />
            </motion.div>
          ))}
        </motion.div>
        
        {/* Stats Display Component with animation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <StatsDisplay stats={stats} css={css} cssAlpha={cssAlpha} />
        </motion.div>
      </div>
    </section>
  );
}