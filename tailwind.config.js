module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'magnetic-black': '#1A1A1A',
        'faded-cardboard': '#F5F0E1',
        'static-grey': '#2F3338',
        'signal-orange': '#FF4400',
        'phosphor-amber': '#FFB000',
        'chrome-blue': '#3B5C7D',
        'tracking-red': '#D93636',
        black: {
          DEFAULT: '#1A1A1A',
        },
        white: {
          DEFAULT: '#F5F0E1',
        },
      },
      animation: {
        'glitch': 'glitch 1s linear infinite',
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scanline': 'scanline 10s linear infinite',
        'cursor': 'cursor 1s step-end infinite',
      },
      keyframes: {
        glitch: {
          '2%, 64%': { transform: 'translate(2px,0) skew(0deg)' },
          '4%, 60%': { transform: 'translate(-2px,0) skew(0deg)' },
          '62%': { transform: 'translate(0,0) skew(5deg)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        cursor: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
