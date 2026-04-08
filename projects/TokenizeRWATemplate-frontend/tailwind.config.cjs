/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        neon: {
          teal: '#00ffd5',
          violet: '#a855f7',
          blue: '#3b82f6',
          pink: '#ec4899',
        },
        glass: {
          DEFAULT: 'rgba(255,255,255,0.06)',
          border: 'rgba(255,255,255,0.12)',
          strong: 'rgba(255,255,255,0.10)',
        },
        dark: {
          900: '#070b14',
          800: '#0d1424',
          700: '#111827',
          600: '#1a2235',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'radial-gradient(ellipse at 60% 0%, rgba(0,255,213,0.15) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(168,85,247,0.15) 0%, transparent 60%)',
        'card-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
      },
      animation: {
        'gradient-shift': 'gradient-shift 8s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
        'confetti-fall': 'confetti-fall 3s ease-in forwards',
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        'scale-in': 'scale-in 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards',
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'confetti-fall': {
          '0%': { transform: 'translateY(-100px) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(110vh) rotate(720deg)', opacity: '0' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'neon-teal': '0 0 20px rgba(0,255,213,0.35), 0 0 60px rgba(0,255,213,0.15)',
        'neon-violet': '0 0 20px rgba(168,85,247,0.35), 0 0 60px rgba(168,85,247,0.15)',
        'glass': '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
        'glass-sm': '0 4px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)',
      },
    },
  },
  plugins: [require('daisyui')],
}
