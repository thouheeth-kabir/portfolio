'use client'

// Capabilities Section - Will be expanded later
export function CapabilitiesSection({ css, cssAlpha }: { css: (color: any) => any, cssAlpha: (color: any, alpha: any) => any }) {
  // Tech stack items
  const technologies = [
    { name: "React", icon: "react", description: "Frontend UI Library" },
    { name: "Next.js", icon: "nextjs", description: "React Framework" },
    { name: "Node.js", icon: "nodejs", description: "Backend Runtime" },
    { name: "Go", icon: "go", description: "Performance Backend" },
    { name: "Redis", icon: "redis", description: "In-memory Data Store" },
    { name: "Tailwind", icon: "tailwind", description: "Utility CSS" }
  ];
  
  // Capabilities categories
  const capabilities = [
    {
      title: "Frontend Development",
      description: "Creating responsive, accessible, and performant user interfaces with modern web technologies.",
      domains: ["E-commerce", "Dashboards", "Interactive Applications"]
    },
    {
      title: "Backend Systems",
      description: "Building scalable, robust APIs and server-side applications with a focus on performance.",
      domains: ["API Design", "Database Optimization", "System Architecture"]
    },
    {
      title: "Integration Solutions",
      description: "Connecting disparate systems and services to create cohesive technical ecosystems.",
      domains: ["Third-party APIs", "Payment Gateways", "Data Pipelines"]
    }
  ];
  
  // Gradient background style
  const gradientStyle = {
    background: `linear-gradient(to bottom, ${cssAlpha('primary', 0.05)}, ${cssAlpha('secondary', 0.05)})`
  };

  return (
    <section 
      id="capabilities" 
      className="min-h-screen py-20"
      style={gradientStyle}
    >
      <div className="container mx-auto px-4">
        <h2 
          className="text-4xl md:text-5xl font-bold mb-16 text-center"
          style={{ color: css('primary') }}
        >
          Our Capabilities
        </h2>
        
        {/* Capabilities */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {capabilities.map((capability, index) => (
            <div 
              key={index}
              className="p-6 rounded-xl"
              style={{ 
                backgroundColor: cssAlpha('muted', 0.5),
                border: `1px solid ${css('border')}`,
                boxShadow: `0 8px 32px ${cssAlpha('primary', 0.1)}`
              }}
            >
              <h3 
                className="text-xl font-bold mb-4"
                style={{ color: css('primary') }}
              >
                {capability.title}
              </h3>
              <p 
                className="mb-4"
                style={{ color: cssAlpha('foreground', 0.8) }}
              >
                {capability.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {capability.domains.map((domain) => (
                  <span 
                    key={domain}
                    className="px-3 py-1 text-sm rounded-full"
                    style={{ 
                      backgroundColor: cssAlpha('primary', 0.1),
                      color: css('primary')
                    }}
                  >
                    {domain}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Tech Stack */}
        <div className="mb-16">
          <h3 
            className="text-2xl font-bold mb-8 text-center"
            style={{ color: css('secondary') }}
          >
            Our Tech Stack
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {technologies.map((tech) => (
              <div 
                key={tech.name}
                className="p-4 rounded-lg text-center"
                style={{ 
                  backgroundColor: cssAlpha('muted', 0.3),
                  border: `1px solid ${cssAlpha('border', 0.3)}`
                }}
              >
                <div 
                  className="w-12 h-12 mx-auto px-4 mb-3 rounded-lg flex items-center justify-center"
                  style={{ 
                    backgroundColor: cssAlpha('secondary', 0.1),
                    color: css('secondary')
                  }}
                >
                  {tech.icon}
                </div>
                <div className="font-medium"  style={{ color: cssAlpha('foreground', 0.9) }}>{tech.name}</div>
                <div 
                  className="text-xs"
                  style={{ color: cssAlpha('foreground', 0.7) }}
                >
                  {tech.description}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Process Timeline - Simple Version */}
        <div className="max-w-2xl mx-auto">
          <h3 
            className="text-2xl font-bold mb-8 text-center"
            style={{ color: css('secondary') }}
          >
            Our Process
          </h3>
          <div className="flex flex-col md:flex-row justify-between">
            {['Discovery', 'Design', 'Development', 'Deployment'].map((step, index) => (
              <div 
                key={step}
                className="flex flex-col items-center mb-8 md:mb-0"
              >
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-2 text-lg font-bold"
                  style={{ 
                    backgroundColor: css('primary'),
                    color: css('background')
                  }}
                >
                  {index + 1}
                </div>
                <div className="font-medium">{step}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Projects Section - Will be expanded later
export function ProjectsSection({ css, cssAlpha }: { css: (color: string) => string, cssAlpha: (color: string, alpha: number) => string }) {
  // Sample projects
  const projects = [
    {
      title: "E-commerce Platform",
      description: "A fully featured online store with inventory management, payment processing, and customer analytics.",
      image: "/placeholder.jpg", // Will be replaced with actual images
      technologies: ["React", "Node.js", "MongoDB"],
      category: "Web Application"
    },
    {
      title: "Financial Dashboard",
      description: "Real-time data visualization for financial metrics with customizable widgets and reporting tools.",
      image: "/placeholder.jpg",
      technologies: ["Next.js", "Express", "D3.js"],
      category: "Dashboard"
    },
    {
      title: "API Integration Service",
      description: "Middleware solution connecting multiple third-party services with custom data transformations.",
      image: "/placeholder.jpg",
      technologies: ["Go", "Redis", "Docker"],
      category: "Backend Service"
    },
    {
      title: "Mobile App",
      description: "Cross-platform mobile application with offline capabilities and seamless cloud synchronization.",
      image: "/placeholder.jpg",
      technologies: ["React Native", "Firebase", "Redux"],
      category: "Mobile Application"
    }
  ];
  
  // Gradient background style
  const gradientStyle = {
    background: `linear-gradient(to bottom, ${cssAlpha('secondary', 0.05)}, ${cssAlpha('accent', 0.05)})`
  };

  return (
    <section 
      id="projects" 
      className="min-h-screen py-20"
      style={gradientStyle}
    >
      <div className="container mx-auto px-4">
        <h2 
          className="text-4xl md:text-5xl font-bold mb-16 text-center"
          style={{ color: css('secondary') }}
        >
          Our Projects
        </h2>
        
        {/* Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="rounded-xl overflow-hidden"
              style={{ 
                backgroundColor: cssAlpha('muted', 0.5),
                border: `1px solid ${css('border')}`,
                boxShadow: `0 8px 32px ${cssAlpha('secondary', 0.1)}`
              }}
            >
              {/* Project Image Placeholder */}
              <div 
                className="h-48 flex items-center justify-center"
                style={{ backgroundColor: cssAlpha('muted', 0.7) }}
              >
                <span style={{ color: cssAlpha('foreground', 0.5) }}>
                  Project Preview
                </span>
              </div>
              
              {/* Project Info */}
              <div className="p-6">
                <div 
                  className="text-sm font-medium mb-2 inline-block px-2 py-1 rounded"
                  style={{ 
                    backgroundColor: cssAlpha('secondary', 0.1),
                    color: css('secondary')
                  }}
                >
                  {project.category}
                </div>
                <h3 
                  className="text-xl font-bold mb-2"
                  style={{ color: css('secondary') }}
                >
                  {project.title}
                </h3>
                <p 
                  className="mb-4"
                  style={{ color: cssAlpha('foreground', 0.8) }}
                >
                  {project.description}
                </p>
                
                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span 
                      key={tech}
                      className="px-2 py-1 text-xs rounded-full"
                      style={{ 
                        backgroundColor: cssAlpha('secondary', 0.1),
                        color: css('secondary')
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Contact Section - Will be expanded later
export function ContactSection({ css, cssAlpha }: { css: (color: any) => any, cssAlpha: (color: any, alpha: any) => any }) {
  // Gradient background style
  const gradientStyle = {
    background: `linear-gradient(to bottom, ${cssAlpha('accent', 0.05)}, ${css('background')})`
  };
  
  // Form field style
  const inputStyle = {
    backgroundColor: cssAlpha('muted', 0.5),
    border: `1px solid ${css('border')}`,
    color: css('foreground')
  };
  
  // Button style
  const buttonStyle = {
    backgroundColor: css('accent'),
    color: css('background')
  };

  return (
    <section 
      id="contact" 
      className="min-h-screen py-20"
      style={gradientStyle}
    >
      <div className="container mx-auto px-4">
        <h2 
          className="text-4xl md:text-5xl font-bold mb-16 text-center"
          style={{ color: css('accent') }}
        >
          Get In Touch
        </h2>
        
        {/* Contact Form Card */}
        <div 
          className="max-w-2xl mx-auto rounded-xl p-8"
          style={{ 
            backgroundColor: cssAlpha('muted', 0.3),
            border: `1px solid ${css('border')}`,
            boxShadow: `0 8px 32px ${cssAlpha('accent', 0.1)}`
          }}
        >
          {/* Form introduction */}
          <div className="mb-8 text-center"
                        style={{ color: cssAlpha('foreground', 0.9) }}
          >
            <p className="mb-4" >
              Interested in working with us? We'd love to hear about your project.
            </p>
            <p 
              className="text-sm"
              style={{ color: cssAlpha('foreground', 0.7) }}
            >
              Fill out the form below and we'll get back to you within 48 hours.
            </p>
          </div>
          
          {/* Contact Form */}
          <form className="space-y-6">
            {/* Project Type */}
            <div>
              <label 
                htmlFor="projectType" 
                className="block mb-2 font-medium"
                style={{ color: css('foreground') }}
              >
                Project Type
              </label>
              <select 
                id="projectType"
                className="w-full p-3 rounded-lg"
                style={inputStyle}
              >
                <option>New Project</option>
                <option>Question about work</option>
                <option>Coffee chat</option>
                <option>General inquiry</option>
              </select>
            </div>
            
            {/* Name */}
            <div>
              <label 
                htmlFor="name" 
                className="block mb-2 font-medium"
                style={{ color: css('foreground') }}
              >
                Name
              </label>
              <input 
                id="name"
                type="text" 
                className="w-full p-3 rounded-lg"
                style={inputStyle}
                placeholder="Your name"
              />
            </div>
            
            {/* Email */}
            <div>
              <label 
                htmlFor="email" 
                className="block mb-2 font-medium"
                style={{ color: css('foreground') }}
              >
                Email
              </label>
              <input 
                id="email"
                type="email" 
                className="w-full p-3 rounded-lg"
                style={inputStyle}
                placeholder="your@email.com"
              />
            </div>
            
            {/* Message */}
            <div>
              <label 
                htmlFor="message" 
                className="block mb-2 font-medium"
                style={{ color: css('foreground') }}
              >
                Message
              </label>
              <textarea 
                id="message"
                className="w-full p-3 rounded-lg min-h-32 resize-y"
                style={inputStyle}
                placeholder="Tell us about your project..."
              ></textarea>
            </div>
            
            {/* Submit Button */}
            <button 
              type="submit"
              className="w-full py-3 rounded-lg font-medium transition-transform hover:scale-105"
              style={buttonStyle}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}