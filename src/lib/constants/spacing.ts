// Base spacing scale (in rem)
export const spacing = {
    0: '0',
    px: '1px',
    0.5: '0.125rem',  // 2px
    1: '0.25rem',     // 4px
    1.5: '0.375rem',  // 6px
    2: '0.5rem',      // 8px
    2.5: '0.625rem',  // 10px
    3: '0.75rem',     // 12px
    3.5: '0.875rem',  // 14px
    4: '1rem',        // 16px
    5: '1.25rem',     // 20px
    6: '1.5rem',      // 24px
    7: '1.75rem',     // 28px
    8: '2rem',        // 32px
    9: '2.25rem',     // 36px
    10: '2.5rem',     // 40px
    11: '2.75rem',    // 44px
    12: '3rem',       // 48px
    14: '3.5rem',     // 56px
    16: '4rem',       // 64px
    20: '5rem',       // 80px
    24: '6rem',       // 96px
    28: '7rem',       // 112px
    32: '8rem',       // 128px
    36: '9rem',       // 144px
    40: '10rem',      // 160px
    44: '11rem',      // 176px
    48: '12rem',      // 192px
    52: '13rem',      // 208px
    56: '14rem',      // 224px
    60: '15rem',      // 240px
    64: '16rem',      // 256px
    72: '18rem',      // 288px
    80: '20rem',      // 320px
    96: '24rem',      // 384px
  } as const
  
  // Semantic spacing values
  export const semanticSpacing = {
    // Component spacing
    componentXs: spacing[1],     // 4px
    componentSm: spacing[2],     // 8px
    componentMd: spacing[4],     // 16px
    componentLg: spacing[6],     // 24px
    componentXl: spacing[8],     // 32px
    
    // Section spacing
    sectionXs: spacing[8],       // 32px
    sectionSm: spacing[12],      // 48px
    sectionMd: spacing[16],      // 64px
    sectionLg: spacing[20],      // 80px
    sectionXl: spacing[24],      // 96px
    sectionXxl: spacing[32],     // 128px
    
    // Container spacing
    containerXs: spacing[4],     // 16px
    containerSm: spacing[6],     // 24px
    containerMd: spacing[8],     // 32px
    containerLg: spacing[12],    // 48px
    containerXl: spacing[16],    // 64px
    
    // Layout spacing
    layoutXs: spacing[2],        // 8px
    layoutSm: spacing[4],        // 16px
    layoutMd: spacing[6],        // 24px
    layoutLg: spacing[8],        // 32px
    layoutXl: spacing[12],       // 48px
    
    // Grid spacing
    gridGutterXs: spacing[2],    // 8px
    gridGutterSm: spacing[4],    // 16px
    gridGutterMd: spacing[6],    // 24px
    gridGutterLg: spacing[8],    // 32px
    gridGutterXl: spacing[10],   // 40px
  } as const
  
  // Responsive spacing scales
  export const responsiveSpacing = {
    sectionPadding: {
      xs: spacing[8],   // 32px
      sm: spacing[12],  // 48px
      md: spacing[16],  // 64px
      lg: spacing[20],  // 80px
      xl: spacing[24],  // 96px
      '2xl': spacing[32], // 128px
    },
    containerPadding: {
      xs: spacing[4],   // 16px
      sm: spacing[4],   // 16px
      md: spacing[6],   // 24px
      lg: spacing[8],   // 32px
      xl: spacing[8],   // 32px
      '2xl': spacing[8], // 32px
    },
    gridGap: {
      xs: spacing[2],   // 8px
      sm: spacing[3],   // 12px
      md: spacing[4],   // 16px
      lg: spacing[6],   // 24px
      xl: spacing[8],   // 32px
      '2xl': spacing[8], // 32px
    },
  } as const
  
  // Component-specific spacing
  export const componentSpacing = {
    button: {
      paddingX: {
        sm: spacing[3],   // 12px
        md: spacing[4],   // 16px
        lg: spacing[6],   // 24px
        xl: spacing[8],   // 32px
      },
      paddingY: {
        sm: spacing[1.5], // 6px
        md: spacing[2],   // 8px
        lg: spacing[3],   // 12px
        xl: spacing[4],   // 16px
      },
      gap: spacing[2],    // 8px
    },
    card: {
      padding: {
        sm: spacing[3],   // 12px
        md: spacing[4],   // 16px
        lg: spacing[6],   // 24px
        xl: spacing[8],   // 32px
      },
      gap: spacing[4],    // 16px
    },
    input: {
      paddingX: spacing[3], // 12px
      paddingY: spacing[2], // 8px
      gap: spacing[2],      // 8px
    },
    navigation: {
      padding: spacing[4],  // 16px
      gap: spacing[6],      // 24px
      itemGap: spacing[4],  // 16px
    },
    modal: {
      padding: spacing[6],  // 24px
      gap: spacing[4],      // 16px
    },
    tooltip: {
      padding: spacing[2],  // 8px
    },
    badge: {
      paddingX: spacing[2], // 8px
      paddingY: spacing[1], // 4px
    },
    avatar: {
      gap: spacing[2],      // 8px
    },
  } as const
  
  // Animation spacing (for stagger delays and offsets)
  export const animationSpacing = {
    staggerDelay: {
      fast: 0.05,     // 50ms
      normal: 0.1,    // 100ms
      slow: 0.2,      // 200ms
    },
    slideDistance: {
      sm: spacing[4],  // 16px
      md: spacing[8],  // 32px
      lg: spacing[16], // 64px
    },
    hoverLift: {
      sm: spacing[1],  // 4px
      md: spacing[2],  // 8px
      lg: spacing[3],  // 12px
    },
  } as const
  
  // Utility functions
  export const getSpacing = (size: keyof typeof spacing): string => {
    return spacing[size]
  }
  
  export const getResponsiveSpacing = (
    type: keyof typeof responsiveSpacing,
    breakpoint: keyof typeof responsiveSpacing.sectionPadding
  ): string => {
    return responsiveSpacing[type][breakpoint]
  }
  
  export const combineSpacing = (...sizes: Array<keyof typeof spacing>): string => {
    return sizes.map(size => spacing[size]).join(' ')
  }
  
  // CSS custom properties for dynamic spacing
  export const spacingCSSVars = Object.entries(spacing).reduce((vars, [key, value]) => {
    vars[`--spacing-${key}`] = value
    return vars
  }, {} as Record<string, string>)
  
  // Negative spacing values
  export const negativeSpacing = Object.entries(spacing).reduce((negative, [key, value]) => {
    if (key !== '0' && key !== 'px') {
      negative[`-${key}`] = `-${value}`
    }
    return negative
  }, {} as Record<string, string>)