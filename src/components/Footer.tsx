'use client'

interface FooterProps {
  css: (value: any) => string;
  cssAlpha: (value: any, alpha: number) => string;
  themeName: string;
  themeCategory: string;
  randomTheme: () => void;
}

export default function Footer({ 
  css, 
  cssAlpha, 
  themeName,
  themeCategory,
  randomTheme 
}: FooterProps) {
  // Social links
  const socialLinks = [
    { name: "Twitter", url: "#", icon: "twitter" },
    { name: "GitHub", url: "#", icon: "github" },
    { name: "LinkedIn", url: "#", icon: "linkedin" },
    { name: "Email", url: "mailto:contact@example.com", icon: "mail" }
  ];
  
  // Quick links
  const quickLinks = [
    { name: "Home", url: "#hero" },
    { name: "Projects", url: "#projects" },
    { name: "Contact", url: "#contact" },
    { name: "Privacy", url: "#" }
  ];

  // Footer style
  const footerStyle = {
    backgroundColor: css('background'),
    borderTop: `1px solid ${css('border')}`
  };
  
  // Social icon style
  const socialIconStyle = {
    color: cssAlpha('foreground', 0.7),
    backgroundColor: cssAlpha('muted', 0.3),
    border: `1px solid ${cssAlpha('border', 0.3)}`
  };
  
  // Year for copyright
  const year = new Date().getFullYear();
  
  // Function to render social icon
  const renderIcon = (iconName: any) => {
    switch (iconName) {
      case 'twitter':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
          </svg>
        );
      case 'github':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
          </svg>
        );
      case 'linkedin':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect x="2" y="9" width="4" height="12" />
            <circle cx="4" cy="4" r="2" />
          </svg>
        );
      case 'mail':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <footer className="py-12" style={footerStyle}>
      <div className="container mx-auto px-4">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand column */}
          <div>
            <div 
              className="font-bold text-2xl mb-4"
              style={{ color: css('primary') }}
            >
              DevTeam
            </div>
            <p 
              className="mb-4 max-w-xs"
              style={{ color: cssAlpha('foreground', 0.7) }}
            >
              We build digital experiences with passion and precision. 
              Our team of skilled developers is ready to bring your vision to life.
            </p>
            
            {/* Social links */}
            <div className="flex space-x-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:opacity-80"
                  style={socialIconStyle}
                  aria-label={link.name}
                >
                  {renderIcon(link.icon)}
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick links column */}
          <div>
            <h3 
              className="font-bold text-lg mb-4"
              style={{ color: css('primary') }}
            >
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    className="transition-colors hover:opacity-100"
                    style={{ 
                      color: cssAlpha('foreground', 0.7),
                      textDecoration: 'none'
                    }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Theme info column */}
          <div>
            <h3 
              className="font-bold text-lg mb-4"
              style={{ color: css('primary') }}
            >
              Current Theme
            </h3>
            <div 
              className="p-4 rounded-lg mb-4"
              style={{ 
                backgroundColor: cssAlpha('muted', 0.3),
                border: `1px solid ${cssAlpha('border', 0.3)}`
              }}
            >
              <div className="font-medium mb-1">
                {themeName}
              </div>
              <div 
                className="text-sm mb-3"
                style={{ color: cssAlpha('foreground', 0.7) }}
              >
                Category: {themeCategory}
              </div>
              <button
                onClick={randomTheme}
                className="w-full py-2 rounded-md text-sm font-medium transition-transform hover:scale-105"
                style={{ 
                  backgroundColor: css('primary'),
                  color: css('background')
                }}
              >
                Try Random Theme
              </button>
            </div>
          </div>
        </div>
        
        {/* Copyright bar */}
        <div 
          className="pt-8 mt-8 text-center text-sm"
          style={{ 
            borderTop: `1px solid ${cssAlpha('border', 0.5)}`,
            color: cssAlpha('foreground', 0.6)
          }}
        >
          <p>
            &copy; {year} DevTeam Portfolio. All rights reserved.
          </p>
          <p className="mt-2">
            Built with Next.js, TypeScript, Tailwind CSS, and our custom theme system.
          </p>
        </div>
      </div>
    </footer>
  );
}