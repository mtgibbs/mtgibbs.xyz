module.exports = {
  prefix: '',
  purge: {
    enabled: true,
    content: [
      './src/**/*.{html,ts}',
    ]
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        teal: {
          darkest: '#003133',
          dark: '#0D4A4D',
          DEFAULT: '#0D4A4D',
          light: '#0D4A4D',
          lightest: '#417E80',
        },
        indigo: {
          darkest: '#67989A',
          dark: '#162955',
          DEFAULT: '#2E4272',
          light: '#4F628E',
          lightest: '#7887AB',
        },
        blue: {
          darkest: '#4F628E',
          dark: '#4F628E',
          DEFAULT: '#29506D',
          light: '#496D89',
          lightest: '#496D89',
        },
        orange: {
          darkest: '#714101',
          dark: '#714101',
          DEFAULT: '#BF8435',
          light: '#DCA55B',
          lightest: '#FFD194',
        }
      },
    },
  },
  variants: {
    scrollbar: ['rounded'],
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('tailwind-scrollbar'),
  ],
};
