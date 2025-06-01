import '@/app/globals.css';
import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import { ThemeProvider } from '@/lib/themes/ThemeProvider';
import { DEFAULT_THEME } from '@/lib/themes';
import ScrollToTopButton from '@/components/ScrollToTopButton';

// Modern font strategy - primary and secondary fonts
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

// Enhanced metadata with more SEO optimizations
export const metadata: Metadata = {
  title: 'DevTeam Portfolio | Web Development Experts',
  description: 'A team of passionate developers creating immersive digital experiences with React, Next.js, Node.js, and Go. We transform ideas into elegant solutions.',
  keywords: 'web development, react, next.js, node.js, go, developers, portfolio, team, digital experiences, modern web apps, progressive web applications',
  authors: [{ name: 'DevTeam', url: 'https://devteam-portfolio.com' }],
  openGraph: {
    title: 'DevTeam Portfolio | Web Development Experts',
    description: 'A team of passionate developers bringing your vision to life with code.',
    url: 'https://devteam-portfolio.com',
    siteName: 'DevTeam Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://devteam-portfolio.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'DevTeam Portfolio'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevTeam Portfolio | Web Development Experts',
    description: 'A team of passionate developers bringing your vision to life with code.',
    images: ['https://devteam-portfolio.com/twitter-image.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
  },
  manifest: '/site.webmanifest',
  robots: 'index, follow',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#121212' },
  ],
};

// Page transition animations and other client-side logic moved to PageTransition.tsx

/**
 * Modern root layout with enhanced features:
 * - Multi-font strategy
 * - Page transitions
 * - Improved accessibility
 * - Dark/light mode optimization
 * - Analytics integration
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="en" 
      className={`${inter.variable} ${montserrat.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="antialiased min-h-screen bg-gradient-to-b from-background to-background/80 text-foreground">
        <ThemeProvider 
          defaultTheme={DEFAULT_THEME} 
          enableTransitions={true}
          transitionDuration={400}
        >
          {/* Skip to content link for accessibility */}
          <a 
            href="#main-content" 
            className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-primary focus:text-primary-foreground"
          >
            Skip to content
          </a>
          
          {/* Page content wrapped with client-side transitions */}
          <main id="main-content" className="flex flex-col min-h-screen">
              {children}
          </main>
          
          {/* Improved scroll to top button */}
          <ScrollToTopButton />
        </ThemeProvider>
      </body>
    </html>
  );
}