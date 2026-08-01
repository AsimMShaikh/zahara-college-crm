import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#12233F",
        brand: {
          50: "#EEF5FF",
          100: "#DCEBFF",
          200: "#BED7FF",
          500: "#2D6CDF",
          600: "#1F58C5",
          700: "#18459D",
          900: "#102A5C"
        },
        warmth: "#F6B847",
        mist: "#F7F9FC"
      },
      boxShadow: {
        soft: "0 16px 45px -26px rgba(24, 69, 157, 0.30)",
        card: "0 12px 30px -20px rgba(18, 35, 63, 0.24)"
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-sans)", "sans-serif"]
      },
      borderRadius: {
        "4xl": "2rem"
      },
      keyframes: {
        "float-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" }
        }
      },
      animation: {
        "float-slow": "float-slow 5s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
