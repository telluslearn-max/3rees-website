import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Lumina Primary (Best Buy Blue)
        'lumina-primary': '#0046BE',
        'lumina-primary-glow': 'rgba(0, 70, 190, 0.3)',
        'lumina-primary-light': 'rgba(0, 70, 190, 0.1)',
        
        // Existing Apple colors (keep for compatibility)
        'apple-blue': '#0071e3',
        'apple-blue-hover': '#0077ed',
        'apple-blue-light': '#e8f4fd',
        'apple-dark': '#1d1d1f',
        'apple-gray': '#f5f5f7',
        'apple-gray-100': '#fbfbfd',
        'apple-gray-200': '#86868b',
        'apple-gray-300': '#424245',
        'success': '#34c759',
        'warning': '#ff9500',
        'error': '#ff3b30',
      },
      fontFamily: {
        sans: ['var(--font-inter)', '-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        // Tighter tracking for headlines (Apple style)
        'hero': ['clamp(3rem, 8vw, 6rem)', { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '600' }],
        'hero-md': ['clamp(2.5rem, 6vw, 4.5rem)', { lineHeight: '1.1', letterSpacing: '-0.025em', fontWeight: '600' }],
        'title-1': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '600' }],
        'title-2': ['1.5rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
        'body-pro': ['1.0625rem', { lineHeight: '1.47059', letterSpacing: '-0.022em' }], // 17px Apple standard
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        'bento': '16px',
      },
      borderRadius: {
        '4xl': '32px',
        '5xl': '40px',
        '6xl': '48px',
        '7xl': '56px',
      },
      backdropBlur: {
        'liquid': '30px',
      },
      backdropSaturate: {
        'liquid': '180%',
      },
      transitionTimingFunction: {
        'apple': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'bounce': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      keyframes: {
        'specular-sweep': {
          '0%, 100%': { transform: 'translateX(-100%) rotate(45deg)' },
          '50%': { transform: 'translateX(100%) rotate(45deg)' },
        },
        'liquid-pulse': {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.02)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'specular-sweep': 'specular-sweep 4s ease-in-out infinite',
        'liquid-pulse': 'liquid-pulse 2s ease-in-out infinite',
        'fade-up': 'fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
      },
      boxShadow: {
        'liquid': '0 0 0 1px rgba(0, 70, 190, 0.1), 0 20px 40px -10px rgba(0, 70, 190, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
        'liquid-pro': '0 0 0 1px rgba(0, 70, 190, 0.2), 0 30px 60px -15px rgba(0, 70, 190, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
        'glass': '0 4px 24px rgba(0, 0, 0, 0.04)',
        'glass-hover': '0 20px 40px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
};

export default config;