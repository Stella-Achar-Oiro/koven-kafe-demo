/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#A26B55',      // Primary Brand Brown (20% usage - logo, headings, key elements)
        secondary: '#CEB0A4',    // Soft Blush / Muted Clay (10% usage - secondary accents)
        accent: '#630900',       // Deep Espresso Brown (5% usage - prices, totals, emphasis)
        highlight: '#993509',    // Burnt Rust / Dark Copper (5% usage - highlights, icons)
        cream: '#F3EFEC',        // Warm Off-White / Cream (60% usage - primary background)
        success: '#52B788',      // Keep utility colors
        warning: '#FFB703',
        error: '#D62828',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
