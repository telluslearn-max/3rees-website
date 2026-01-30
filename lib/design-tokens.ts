// lib/design-tokens.ts
// Lumina Retail Design Tokens - Apple 2026 Design Language

export const luminaTokens = {
  // LIQUID GLASS MATERIAL
  glass: {
    blur: '30px',
    saturate: '180%',
    background: 'rgba(255, 255, 255, 0.3)',
    tint: 'rgba(0, 70, 190, 0.05)',
    tintIntense: 'rgba(0, 70, 190, 0.1)',
  },
  
  // SPECULAR STROKE
  stroke: {
    width: '1.5px',
    gradient: 'linear-gradient(135deg, rgba(255,255,255,0.5), rgba(255,255,255,0.05))',
  },
  
  // CONCENTRIC RADIUS SYSTEM
  radius: {
    sm: { outer: 24, padding: 8, inner: 16 },
    md: { outer: 32, padding: 12, inner: 20 },
    lg: { outer: 40, padding: 16, inner: 24 },
    xl: { outer: 48, padding: 20, inner: 28 },
    xxl: { outer: 56, padding: 24, inner: 32 },
  },
  
  // SPRING PHYSICS (Apple Constants)
  spring: {
    standard: { stiffness: 120, damping: 20, mass: 1 },
    pro: { stiffness: 80, damping: 25, mass: 1 },
    gentle: { stiffness: 100, damping: 30, mass: 1 },
    bounce: { stiffness: 300, damping: 10, mass: 1 },
  },
  
  // COLOR SYSTEM
  color: {
    primary: '#0046BE',
    primaryGlow: 'rgba(0, 70, 190, 0.3)',
    primaryLight: 'rgba(0, 70, 190, 0.1)',
    appleBlue: '#0071e3',
    appleDark: '#1d1d1f',
    appleGray: '#f5f5f7',
    appleGray100: '#fbfbfd',
    appleGray200: '#86868b',
    appleGray300: '#424245',
    success: '#34c759',
    warning: '#ff9500',
    error: '#ff3b30',
  },
  
  // ANIMATION TIMING
  timing: {
    specularSweep: 4,
    hover: 0.3,
    pageTransition: 0.5,
    stagger: 0.05,
  },
  
  // SPACING
  spacing: {
    bentoGap: 16,
    section: {
      sm: 'py-16',
      md: 'py-24',
      lg: 'py-32',
    },
  },
} as const;

// Helper functions
export function getConcentricRadius(size: keyof typeof luminaTokens.radius) {
  return luminaTokens.radius[size];
}

export function getSpringConfig(type: keyof typeof luminaTokens.spring) {
  return luminaTokens.spring[type];
}

// Single default export
export default luminaTokens;