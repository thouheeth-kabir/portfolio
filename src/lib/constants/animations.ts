// Animation duration constants (in seconds)
export const animationDuration = {
    instant: 0,
    fastest: 0.1,
    faster: 0.15,
    fast: 0.2,
    normal: 0.3,
    slow: 0.5,
    slower: 0.75,
    slowest: 1,
    
    // Specific use cases
    microInteraction: 0.15,
    hover: 0.2,
    focus: 0.15,
    press: 0.1,
    tooltip: 0.2,
    dropdown: 0.25,
    modal: 0.4,
    page: 0.5,
    loading: 1.5,
  } as const
  
  // Animation delay constants (in seconds)
  export const animationDelay = {
    none: 0,
    shortest: 0.05,
    short: 0.1,
    medium: 0.2,
    long: 0.3,
    longest: 0.5,
    
    // Stagger delays
    staggerFast: 0.05,
    staggerNormal: 0.1,
    staggerSlow: 0.2,
    staggerSlower: 0.3,
  } as const
  
  // Easing curve constants
  export const easingCurves = {
    // Standard curves
    linear: [0, 0, 1, 1],
    ease: [0.25, 0.1, 0.25, 1],
    easeIn: [0.42, 0, 1, 1],
    easeOut: [0, 0, 0.58, 1],
    easeInOut: [0.42, 0, 0.58, 1],
    
    // Custom curves
    gentle: [0.25, 0.46, 0.45, 0.94],
    smooth: [0.4, 0, 0.2, 1],
    sharp: [0.4, 0, 0.6, 1],
    bounce: [0.68, -0.55, 0.265, 1.55],
    elastic: [0.175, 0.885, 0.32, 1.275],
    
    // Material Design curves
    materialStandard: [0.4, 0, 0.2, 1],
    materialDecelerate: [0, 0, 0.2, 1],
    materialAccelerate: [0.4, 0, 1, 1],
    materialSharp: [0.4, 0, 0.6, 1],
    
    // iOS curves
    iosStandard: [0.4, 0, 0.2, 1],
    iosDecelerate: [0, 0, 0.2, 1],
    iosAccelerate: [0.3, 0, 1, 1],
  } as const
  
  // Spring animation constants
  export const springPresets = {
    gentle: {
      stiffness: 120,
      damping: 14,
      mass: 1,
    },
    wobbly: {
      stiffness: 180,
      damping: 12,
      mass: 1,
    },
    stiff: {
      stiffness: 400,
      damping: 30,
      mass: 1,
    },
    slow: {
      stiffness: 80,
      damping: 20,
      mass: 1,
    },
    bouncy: {
      stiffness: 300,
      damping: 10,
      mass: 1,
    },
    snappy: {
      stiffness: 500,
      damping: 25,
      mass: 1,
    },
  } as const
  
  // Animation distance constants (in pixels or relative units)
  export const animationDistance = {
    // Slide distances
    slideSmall: 20,
    slideMedium: 30,
    slideLarge: 50,
    slideExtra: 100,
    
    // Scale values
    scaleSubtle: 0.95,
    scaleNormal: 0.9,
    scaleDown: 0.8,
    scaleUp: 1.1,
    scaleHover: 1.05,
    scaleTap: 0.95,
    
    // Rotation values (in degrees)
    rotateSubtle: 3,
    rotateNormal: 10,
    rotateMedium: 45,
    rotateLarge: 90,
    rotateFull: 180,
    
    // Blur values (in pixels)
    blurSubtle: 2,
    blurNormal: 4,
    blurMedium: 8,
    blurLarge: 16,
    
    // Parallax speeds
    parallaxSlow: 0.2,
    parallaxNormal: 0.5,
    parallaxFast: 0.8,
  } as const
  
  // Intersection observer thresholds
  export const intersectionThresholds = {
    // Basic thresholds
    immediate: 0,
    slight: 0.1,
    quarter: 0.25,
    half: 0.5,
    mostlyVisible: 0.75,
    fullyVisible: 1,
    
    // Multiple thresholds for granular control
    granular: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    
    // Component-specific thresholds
    card: 0.2,
    hero: 0.3,
    text: 0.1,
    image: 0.25,
  } as const
  
  // Scroll-based animation constants
  export const scrollAnimations = {
    // Parallax speeds
    parallax: {
      slow: 0.2,
      normal: 0.5,
      fast: 0.8,
      dramatic: 1.2,
    },
    
    // Scroll triggers
    triggers: {
      early: '75% bottom',
      normal: '50% bottom',
      late: '25% bottom',
      onScreen: 'top bottom',
    },
    
    // Stagger timings for scroll reveals
    stagger: {
      fast: 0.05,
      normal: 0.1,
      slow: 0.2,
      dramatic: 0.3,
    },
  } as const
  
  // Loading animation constants
  export const loadingAnimations = {
    spinner: {
      duration: 1,
      iterations: Infinity,
    },
    pulse: {
      duration: 1.5,
      iterations: Infinity,
      scale: [1, 1.2, 1],
      opacity: [1, 0.7, 1],
    },
    dots: {
      duration: 0.8,
      iterations: Infinity,
      stagger: 0.2,
    },
    bars: {
      duration: 0.8,
      iterations: Infinity,
      stagger: 0.1,
    },
  } as const
  
  // Performance constants
  export const performanceSettings = {
    // Frame rate targets
    targetFPS: 60,
    minFPS: 30,
    
    // Animation complexity thresholds
    lowComplexity: 10,    // Max concurrent animations
    mediumComplexity: 25,
    highComplexity: 50,
    
    // Reduced motion alternatives
    reducedMotion: {
      duration: 0.01,       // Nearly instant
      disableParallax: true,
      disableAutoplay: true,
      simplifyTransitions: true,
    },
  } as const
  
  // Theme transition constants
  export const themeTransitions = {
    duration: 0.3,
    easing: easingCurves.smooth,
    properties: [
      'background-color',
      'border-color',
      'color',
      'fill',
      'stroke',
      'opacity',
      'box-shadow',
    ],
  } as const
  
  // Utility functions
  export const getAnimationCSS = (
    duration: keyof typeof animationDuration,
    easing: keyof typeof easingCurves = 'easeOut'
  ) => ({
    transitionDuration: `${animationDuration[duration]}s`,
    transitionTimingFunction: `cubic-bezier(${easingCurves[easing].join(', ')})`,
  })
  
  export const createStaggerDelay = (index: number, baseDelay: number = animationDelay.staggerNormal) => {
    return index * baseDelay
  }
  
  export const getReducedMotionSettings = (enabled: boolean = true) => {
    if (!enabled) return performanceSettings.reducedMotion
    return {
      duration: animationDuration.normal,
      disableParallax: false,
      disableAutoplay: false,
      simplifyTransitions: false,
    }
  }
  
  // CSS custom properties for animations
  export const animationCSSVars = {
    '--animation-duration-fast': `${animationDuration.fast}s`,
    '--animation-duration-normal': `${animationDuration.normal}s`,
    '--animation-duration-slow': `${animationDuration.slow}s`,
    '--animation-easing-smooth': `cubic-bezier(${easingCurves.smooth.join(', ')})`,
    '--animation-easing-bounce': `cubic-bezier(${easingCurves.bounce.join(', ')})`,
    '--animation-distance-slide': `${animationDistance.slideMedium}px`,
    '--animation-scale-hover': animationDistance.scaleHover.toString(),
    '--animation-scale-tap': animationDistance.scaleTap.toString(),
  } as const