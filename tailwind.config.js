module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'gradient-fade': {
          '0%, 100%': { 'background-position': '0% 50%', opacity: '0.7' },
          '50%': { 'background-position': '100% 50%', opacity: '1' },
        },
      },
      animation: {
        'gradient-fade': 'gradient-fade 6s ease-in-out infinite',
      },
    }
  },
  plugins: [],
}
