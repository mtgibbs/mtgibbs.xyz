module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          darkest: '#260c19',
          dark: '#40142a',
          DEFAULT: '#73244c',
          light: '#992f65',
          lightest: '#bf3b7e',
        },
        magenta: {
          darkest: '#601024',
          dark: '#7a142d',
          DEFAULT: '#ad1d41',
          light: '#d3234f',
          lightest: '#f9295d',
        },
        red: {
          darkest: '#5a0e10',
          dark: '#a71a1f',
          DEFAULT: '#db2229',
          light: '#ff2727',
          lightest: '#ff2727',
        },
        orange: {
          darkest: '#a63510',
          dark: '#c03d12',
          DEFAULT: '#f34e18',
          light: '#ff6119',
          lightest: '#ff7019',
        },
        yellow: {
          darkest: '#ac8d2a',
          dark: '#c5a231',
          DEFAULT: '#f9cc3e',
          light: '#ffdd3f',
          lightest: '#ffea3f',
        },
        black: {
          DEFAULT: '#2f302d',
        },
        white: {
          darkest: '#9a9982',
          dark: '#b3b297',
          DEFAULT: '#e7e5c3',
        },
        blue: {
          DEFAULT: '#2E2157',
        }
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
