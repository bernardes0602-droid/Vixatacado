export default {
  content: ["./projeto-app/index.html", "./projeto-app/src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        vix: {
          black: "#070709",
          surface: "#111114",
          red: "#c9151b",
          orange: "#f39a12"
        }
      },
      fontFamily: {
        display: ["Barlow Condensed", "sans-serif"],
        sans: ["Inter", "sans-serif"]
      }
    }
  },
  plugins: []
};
