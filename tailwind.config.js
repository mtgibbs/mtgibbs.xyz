module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'deep-space': '#180022',
        'terminal-amber': '#FFB000',
        purple: {
          darkest: '#1a002b',
          dark: '#3d0066',
          DEFAULT: '#9D00FF',
          light: '#b547ff',
          lightest: '#d18aff',
        },
        magenta: { // Keeping these for now, but not primary
          darkest: '#601024',
          dark: '#7a142d',
          DEFAULT: '#ad1d41',
          light: '#d3234f',
          lightest: '#f9295d',
        },
        red: {
          darkest: '#4a0011',
          dark: '#a80028',
          DEFAULT: '#FF003C',
          light: '#ff4d76',
          lightest: '#ff99b0',
        },
        orange: {
          darkest: '#a63510',
          dark: '#c03d12',
          DEFAULT: '#f34e18',
          light: '#ff6119',
          lightest: '#ff7019',
        },
        yellow: {
          darkest: '#b38f00',
          dark: '#e6b800',
          DEFAULT: '#FFCC00',
          light: '#ffd633',
          lightest: '#ffe066', // Solar Yellow
        },
        black: {
          DEFAULT: '#050505', // Void Black
        },
        white: {
          darkest: '#9a9982',
          dark: '#b3b297',
          DEFAULT: '#e7e5c3',
        },
        blue: {
          DEFAULT: '#2E2157', // Legacy, usage to be checked
        }
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
