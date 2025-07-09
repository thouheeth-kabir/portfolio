'use client'

import { useState, useRef } from 'react'

// Types
type StyleProps = {
  css: (key: any) => string
  cssAlpha: (key: any, alpha: number) => string
}

type TechItem = {
  name: string
  tooltip: string
}

type Project = {
  id: number
  title: string
  category: string
  description: string
  detailedDescription: string
  techStack: TechItem[]
  videoUrl: string
  clientFeedback: {
    rating: number
    text: string
    client: string
  }
  timeEstimate: string
  architecture: {
    components: string[]
    description: string
  }
  highlights: string[]
}

// Component for star rating display
const StarRating = ({ rating, css, cssAlpha }: { rating: number } & StyleProps) => (
  <div className="flex">
    {[1, 2, 3, 4, 5].map((star) => (
      <span key={star} style={{ color: star <= rating ? css('accent') : cssAlpha('foreground', 0.3) }}>
        ★
      </span>
    ))}
  </div>
)

// Component for tech stack badges with tooltips
const TechBadge = ({ tech, css, cssAlpha }: { tech: TechItem } & StyleProps) => (
  <div className="relative group inline-block">
    <span 
      className="px-3 py-1 text-sm rounded-full inline-block cursor-help"
      style={{ backgroundColor: cssAlpha('primary', 0.1), color: css('primary') }}
    >
      {tech.name}
    </span>
    <div 
      className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 text-xs rounded-lg 
                opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 whitespace-nowrap"
      style={{ 
        backgroundColor: css('foreground'), 
        color: css('background'),
        boxShadow: `0 4px 12px ${cssAlpha('foreground', 0.2)}`
      }}
    >
      {tech.tooltip}
    </div>
  </div>
)

// Component for project section using card expansion system
export function ProjectsSection({ css, cssAlpha }: StyleProps) {
  // State to track which project is expanded
  const [expandedId, setExpandedId] = useState<number | null>(null)
  
  // State to track active tab for expanded project
  const [activeTab, setActiveTab] = useState<'overview' | 'tech' | 'demo' | 'feedback'>('overview')
  
  // State for category filter
  const [filter, setFilter] = useState('all')

  // Smooth scroll to expanded content when opening
  const expandedRef = useRef<HTMLDivElement>(null)
  
  // Project data with all required information
  const projects: Project[] = [
    {
      id: 1,
      title: "Klaviyo Express Server",
      category: "Backend Service",
      description: "A high-performance Express.js server integration with Klaviyo's email marketing platform, featuring automated campaign management, customer segmentation, and real-time analytics.",
      detailedDescription: "Built a comprehensive backend service that seamlessly integrates with Klaviyo's API to handle complex email marketing workflows. The system processes over 100k customer interactions daily and includes advanced features like behavioral triggers, A/B testing automation, and detailed performance analytics.",
      techStack: [
        { name: "Express.js", tooltip: "Fast, unopinionated web framework for Node.js" },
        { name: "Node.js", tooltip: "JavaScript runtime built on Chrome's V8 engine" },
        { name: "Redis", tooltip: "In-memory data structure store for caching" },
        { name: "MongoDB", tooltip: "Document-oriented NoSQL database" },
        { name: "JWT", tooltip: "JSON Web Tokens for secure authentication" },
        { name: "Docker", tooltip: "Containerization platform for deployment" },
        { name: "PM2", tooltip: "Production process manager for Node.js" }
      ],
      videoUrl: "https://www.loom.com/embed/4d22ff68e02b4914be299eb50d999a8e?sid=d037abec-5025-40d1-a10c-fea0f8289586",
      clientFeedback: {
        rating: 5,
        text: "The Klaviyo integration exceeded our expectations. Our email campaign efficiency improved by 300% and the automated segmentation saved us countless hours.",
        client: "Sarah Johnson, Marketing Director at TechFlow"
      },
      timeEstimate: "6-8 weeks",
      architecture: {
        components: ["API Gateway", "Authentication Service", "Klaviyo Connector", "Database Layer", "Cache Layer", "Analytics Engine"],
        description: "Microservices architecture with Redis caching, JWT authentication, and MongoDB for data persistence"
      },
      highlights: ["Real-time sync", "Automated campaigns", "Advanced analytics", "99.9% uptime"]
    },
    {
      id: 2,
      title: "Monday.com Integration",
      category: "Integration Solution",
      description: "Custom integration platform connecting Monday.com with multiple third-party services, enabling seamless project management workflows and automated task synchronization.",
      detailedDescription: "Developed a sophisticated integration hub that connects Monday.com boards with external tools like Slack, Google Workspace, and custom CRM systems. Features include bi-directional sync, custom field mapping, and intelligent workflow automation.",
      techStack: [
        { name: "Next.js", tooltip: "React framework with server-side rendering" },
        { name: "TypeScript", tooltip: "Typed superset of JavaScript" },
        { name: "GraphQL", tooltip: "Query language for APIs" },
        { name: "Prisma", tooltip: "Next-generation ORM for Node.js and TypeScript" },
        { name: "PostgreSQL", tooltip: "Advanced open-source relational database" },
        { name: "Webhooks", tooltip: "HTTP callbacks for real-time updates" },
        { name: "OAuth 2.0", tooltip: "Industry-standard authorization framework" }
      ],
      videoUrl: "https://www.loom.com/embed/your-monday-video-id",
      clientFeedback: {
        rating: 5,
        text: "This integration transformed our project management workflow. We now have complete visibility across all our tools and the automation saves us 15+ hours per week.",
        client: "Michael Chen, Operations Manager at CreativeAgency"
      },
      timeEstimate: "4-6 weeks",
      architecture: {
        components: ["Webhook Handlers", "OAuth Service", "Sync Engine", "Field Mapper", "Error Handler", "Admin Dashboard"],
        description: "Event-driven architecture with robust error handling and real-time synchronization"
      },
      highlights: ["Bi-directional sync", "Custom field mapping", "Real-time updates", "Multi-tool integration"]
    },
    {
      id: 3,
      title: "Bazsy.com Marketplace",
      category: "Web Application",
      description: "A modern B2B marketplace platform featuring advanced search, vendor management, bulk ordering, and integrated payment processing with multi-currency support.",
      detailedDescription: "Built a comprehensive B2B marketplace that connects suppliers with retailers. The platform handles complex pricing tiers, bulk order management, and sophisticated search algorithms. Features include vendor onboarding, inventory management, and detailed analytics dashboard.",
      techStack: [
        { name: "React", tooltip: "JavaScript library for building user interfaces" },
        { name: "Next.js", tooltip: "Production-ready React framework" },
        { name: "Stripe", tooltip: "Online payment processing platform" },
        { name: "Elasticsearch", tooltip: "Distributed search and analytics engine" },
        { name: "AWS S3", tooltip: "Cloud storage service from Amazon Web Services" },
        { name: "Tailwind CSS", tooltip: "Utility-first CSS framework" },
        { name: "Vercel", tooltip: "Cloud platform for static sites and serverless functions" }
      ],
      videoUrl: "https://www.loom.com/embed/your-bazsy-video-id",
      clientFeedback: {
        rating: 5,
        text: "Bazsy.com has revolutionized how we connect with suppliers. The search functionality is incredibly intuitive and the bulk ordering system has streamlined our procurement process significantly.",
        client: "Lisa Rodriguez, Procurement Head at RetailMax"
      },
      timeEstimate: "10-12 weeks",
      architecture: {
        components: ["Frontend App", "API Gateway", "Search Service", "Payment Gateway", "User Management", "Inventory System", "Analytics Dashboard"],
        description: "Scalable marketplace architecture with advanced search capabilities and secure payment processing"
      },
      highlights: ["Advanced search", "Bulk ordering", "Multi-currency", "Vendor portal"]
    },
    {
      id: 4,
      title: "Mutual Fund Platform",
      category: "Financial Application",
      description: "Comprehensive mutual fund investment platform with portfolio tracking, risk analysis, automated rebalancing, and regulatory compliance features.",
      detailedDescription: "Created a full-featured mutual fund platform that allows investors to research, invest, and manage their portfolios. Includes advanced features like SIP automation, goal-based investing, tax optimization, and comprehensive reporting for regulatory compliance.",
      techStack: [
        { name: "React", tooltip: "Component-based UI library" },
        { name: "Node.js", tooltip: "Server-side JavaScript runtime" },
        { name: "Express.js", tooltip: "Minimal web application framework" },
        { name: "Chart.js", tooltip: "Simple yet flexible JavaScript charting library" },
        { name: "PostgreSQL", tooltip: "Robust relational database system" },
        { name: "Redis", tooltip: "In-memory caching for performance" },
        { name: "KYC APIs", tooltip: "Know Your Customer verification services" },
        { name: "Payment Gateway", tooltip: "Secure financial transaction processing" }
      ],
      videoUrl: "https://www.loom.com/embed/your-mutual-fund-video-id",
      clientFeedback: {
        rating: 5,
        text: "The mutual fund platform exceeded all our expectations. The user experience is seamless, compliance features are robust, and our clients love the portfolio insights and automated rebalancing.",
        client: "Rajesh Gupta, CTO at InvestSmart Financial"
      },
      timeEstimate: "12-16 weeks",
      architecture: {
        components: ["Frontend Dashboard", "Investment Engine", "Portfolio Manager", "KYC Service", "Payment Processor", "Compliance Module", "Reporting System"],
        description: "Secure financial architecture with regulatory compliance, real-time portfolio tracking, and automated investment workflows"
      },
      highlights: ["Portfolio tracking", "Risk analysis", "Automated SIP", "Regulatory compliance"]
    }
  ]

  // Filter categories
  const categories = ['all', 'Backend Service', 'Integration Solution', 'Web Application', 'Financial Application']
  
  // Filter projects based on selected category
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter)

  // Handle project card click
  const handleCardClick = (projectId: number) => {
    // Toggle expansion
    setExpandedId(expandedId === projectId ? null : projectId)
    
    // Reset active tab when opening a new project
    if (expandedId !== projectId) {
      setActiveTab('overview')
      
      // Scroll to expanded content after a short delay to allow rendering
      setTimeout(() => {
        if (expandedRef.current) {
          expandedRef.current.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          })
        }
      }, 100)
    }
  }

  // Gradient background style
  const gradientStyle = {
    background: `linear-gradient(to bottom, ${cssAlpha('secondary', 0.05)}, ${cssAlpha('accent', 0.05)})`
  }

  return (
    <section id="projects" className="min-h-screen py-20" style={gradientStyle}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: css('secondary') }}>
            Our Projects
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: cssAlpha('foreground', 0.8) }}>
            Explore our portfolio of successful projects, each crafted with precision and delivered with excellence
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setFilter(category)
                // Close any expanded card when changing filters
                setExpandedId(null)
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                filter === category ? 'scale-105' : 'hover:scale-105'
              }`}
              style={{
                backgroundColor: filter === category ? css('secondary') : cssAlpha('muted', 0.5),
                color: filter === category ? css('background') : css('foreground'),
                border: `1px solid ${filter === category ? css('secondary') : css('border')}`
              }}
            >
              {category === 'all' ? 'All Projects' : category}
            </button>
          ))}
        </div>

        {/* Projects List */}
        <div className="flex flex-col gap-6">
          {filteredProjects.map((project) => (
            <div key={project.id} className="w-full">
              {/* Collapsed card */}
              <div
                className={`rounded-xl overflow-hidden transition-all duration-300 cursor-pointer ${
                  expandedId === project.id ? 'shadow-xl' : 'hover:shadow-lg'
                }`}
                style={{
                  backgroundColor: cssAlpha('muted', 0.5),
                  border: `1px solid ${css('border')}`,
                  boxShadow: expandedId === project.id 
                    ? `0 10px 25px ${cssAlpha('secondary', 0.2)}` 
                    : `0 4px 6px ${cssAlpha('secondary', 0.1)}`
                }}
                onClick={() => handleCardClick(project.id)}
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span 
                          className="px-3 py-1 text-sm rounded-full"
                          style={{ backgroundColor: cssAlpha('secondary', 0.1), color: css('secondary') }}
                        >
                          {project.category}
                        </span>
                        <span 
                          className="text-sm font-medium"
                          style={{ color: css('accent') }}
                        >
                          {project.timeEstimate}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold" style={{ color: css('secondary') }}>
                        {project.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <StarRating rating={project.clientFeedback.rating} css={css} cssAlpha={cssAlpha} />
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xl transition-transform duration-300"
                        style={{ 
                          backgroundColor: cssAlpha('primary', 0.1),
                          color: css('primary'),
                          transform: expandedId === project.id ? 'rotate(45deg)' : 'rotate(0deg)'
                        }}
                      >
                        {expandedId === project.id ? '×' : '+'}
                      </div>
                    </div>
                  </div>
                  
                  {/* Preview content (only visible when collapsed) */}
                  {expandedId !== project.id && (
                    <div className="mt-3">
                      <p className="mb-4" style={{ color: cssAlpha('foreground', 0.8) }}>
                        {project.description}
                      </p>
                      
                      {/* Highlights */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {project.highlights.map((highlight, index) => (
                            <span 
                              key={index} 
                              className="px-2 py-1 text-xs rounded"
                              style={{ backgroundColor: cssAlpha('accent', 0.1), color: css('accent') }}
                            >
                              ✓ {highlight}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Tech Stack Preview */}
                      <div className="flex flex-wrap gap-1">
                        {project.techStack.slice(0, 4).map((tech, index) => (
                          <span 
                            key={index} 
                            className="px-2 py-1 text-xs rounded-full"
                            style={{ backgroundColor: cssAlpha('primary', 0.1), color: css('primary') }}
                          >
                            {tech.name}
                          </span>
                        ))}
                        {project.techStack.length > 4 && (
                          <span 
                            className="px-2 py-1 text-xs rounded-full"
                            style={{ backgroundColor: cssAlpha('primary', 0.1), color: css('primary') }}
                          >
                            +{project.techStack.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Expanded content */}
              {expandedId === project.id && (
                <div 
                  ref={expandedRef}
                  className="mt-1 rounded-b-xl overflow-hidden transform transition-all duration-300"
                  style={{
                    backgroundColor: css('background'),
                    border: `1px solid ${css('border')}`,
                    borderTop: 'none'
                  }}
                >
                  {/* Tabs navigation */}
                  <div 
                    className="flex flex-wrap border-b overflow-x-auto"
                    style={{ borderColor: css('border') }}
                  >
                    <button
                      className={`px-5 py-3 text-sm font-medium transition-colors duration-200 whitespace-nowrap`}
                      style={{
                        color: activeTab === 'overview' ? css('accent') : cssAlpha('foreground', 0.6),
                        borderBottom: `2px solid ${activeTab === 'overview' ? css('accent') : 'transparent'}`
                      }}
                      onClick={() => setActiveTab('overview')}
                    >
                      Overview & Architecture
                    </button>
                    <button
                      className={`px-5 py-3 text-sm font-medium transition-colors duration-200 whitespace-nowrap`}
                      style={{
                        color: activeTab === 'tech' ? css('accent') : cssAlpha('foreground', 0.6),
                        borderBottom: `2px solid ${activeTab === 'tech' ? css('accent') : 'transparent'}`
                      }}
                      onClick={() => setActiveTab('tech')}
                    >
                      Technologies
                    </button>
                    <button
                      className={`px-5 py-3 text-sm font-medium transition-colors duration-200 whitespace-nowrap`}
                      style={{
                        color: activeTab === 'demo' ? css('accent') : cssAlpha('foreground', 0.6),
                        borderBottom: `2px solid ${activeTab === 'demo' ? css('accent') : 'transparent'}`
                      }}
                      onClick={() => setActiveTab('demo')}
                    >
                      Video Demo
                    </button>
                    <button
                      className={`px-5 py-3 text-sm font-medium transition-colors duration-200 whitespace-nowrap`}
                      style={{
                        color: activeTab === 'feedback' ? css('accent') : cssAlpha('foreground', 0.6),
                        borderBottom: `2px solid ${activeTab === 'feedback' ? css('accent') : 'transparent'}`
                      }}
                      onClick={() => setActiveTab('feedback')}
                    >
                      Client Feedback
                    </button>
                  </div>
                  
                  {/* Tab content */}
                  <div className="p-6">
                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div>
                          <h4 className="text-xl font-semibold mb-4" style={{ color: css('primary') }}>
                            Project Details
                          </h4>
                          <p className="mb-6" style={{ color: cssAlpha('foreground', 0.8) }}>
                            {project.detailedDescription}
                          </p>
                          
                          <div className="mb-6">
                            <h5 className="text-lg font-medium mb-3" style={{ color: css('secondary') }}>
                              Key Highlights
                            </h5>
                            <div className="flex flex-wrap gap-2">
                              {project.highlights.map((highlight, index) => (
                                <div 
                                  key={index}
                                  className="flex items-center gap-2 px-3 py-2 rounded-lg"
                                  style={{ backgroundColor: cssAlpha('accent', 0.05) }}
                                >
                                  <span style={{ color: css('accent') }}>✓</span>
                                  <span style={{ color: cssAlpha('foreground', 0.9) }}>{highlight}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-xl font-semibold mb-4" style={{ color: css('primary') }}>
                            Architecture
                          </h4>
                          
                          <div 
                            className="p-4 rounded-lg mb-4"
                            style={{ backgroundColor: cssAlpha('muted', 0.3) }}
                          >
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                              {project.architecture.components.map((component, index) => (
                                <div 
                                  key={index} 
                                  className="p-2 rounded text-center text-sm"
                                  style={{ backgroundColor: cssAlpha('primary', 0.1), color: css('primary') }}
                                >
                                  {component}
                                </div>
                              ))}
                            </div>
                            <p className="text-sm" style={{ color: cssAlpha('foreground', 0.7) }}>
                              {project.architecture.description}
                            </p>
                          </div>
                          
                          <div className="p-4 rounded-lg border" style={{ borderColor: css('border') }}>
                            <h5 className="text-lg font-medium mb-2" style={{ color: css('secondary') }}>
                              Development Timeline
                            </h5>
                            <p className="text-lg" style={{ color: css('accent') }}>
                              {project.timeEstimate}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Technologies Tab */}
                    {activeTab === 'tech' && (
                      <div>
                        <h4 className="text-xl font-semibold mb-6" style={{ color: css('primary') }}>
                          Technology Stack
                        </h4>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          {project.techStack.map((tech, index) => (
                            <div 
                              key={index}
                              className="p-4 rounded-lg"
                              style={{ backgroundColor: cssAlpha('muted', 0.2) }}
                            >
                              <h5 
                                className="text-lg font-medium mb-2"
                                style={{ color: css('primary') }}
                              >
                                {tech.name}
                              </h5>
                              <p 
                                className="text-sm"
                                style={{ color: cssAlpha('foreground', 0.7) }}
                              >
                                {tech.tooltip}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Demo Tab */}
                    {activeTab === 'demo' && (
                      <div>
                        <h4 className="text-xl font-semibold mb-4" style={{ color: css('primary') }}>
                          Project Demo
                        </h4>
                        
                        <div className="aspect-video rounded-lg overflow-hidden">
                          <iframe
                            src={project.videoUrl}
                            allowFullScreen
                            className="w-full h-full"
                            title={`${project.title} Demo Video`}
                          ></iframe>
                        </div>
                      </div>
                    )}
                    
                    {/* Feedback Tab */}
                    {activeTab === 'feedback' && (
                      <div>
                        <h4 className="text-xl font-semibold mb-4" style={{ color: css('primary') }}>
                          Client Feedback
                        </h4>
                        
                        <div 
                          className="p-6 rounded-lg max-w-3xl mx-auto"
                          style={{ backgroundColor: cssAlpha('muted', 0.2) }}
                        >
                          <div className="flex items-center mb-4">
                            <StarRating rating={project.clientFeedback.rating} css={css} cssAlpha={cssAlpha} />
                            <span 
                              className="ml-2 font-medium"
                              style={{ color: css('accent') }}
                            >
                              {project.clientFeedback.rating}/5
                            </span>
                          </div>
                          
                          <blockquote 
                            className="text-xl italic mb-6 relative"
                            style={{ color: cssAlpha('foreground', 0.9) }}
                          >
                            <span 
                              className="absolute top-0 left-0 text-6xl leading-none transform -translate-x-4 -translate-y-2"
                              style={{ color: cssAlpha('accent', 0.2) }}
                            >
                              "
                            </span>
                            <p className="relative z-10">
                              {project.clientFeedback.text}
                            </p>
                          </blockquote>
                          
                          <div 
                            className="text-right font-medium"
                            style={{ color: css('secondary') }}
                          >
                            — {project.clientFeedback.client}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}