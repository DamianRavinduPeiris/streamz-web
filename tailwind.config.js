/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'tilt': ['"Tilt Warp"', 'sans-serif'] // replace 'Tilt Warp' with your actual font name
      },
      colors: {
        primary: {"50":"#eff6ff","100":"#dbeafe","200":"#bfdbfe","300":"#93c5fd","400":"#60a5fa","500":"#3b82f6","600":"#2563eb","700":"#1d4ed8","800":"#1e40af","900":"#1e3a8a","950":"#172554"}
      }
      
    },
    
  },
  plugins: [require("daisyui")],
  
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#00b0ff",
          "primary-focus": "#0091ea",
          "primary-content": "#ffffff",
          secondary: "#f50057",
          "secondary-focus": "#c51162",
          "secondary-content": "#ffffff",
          accent: "#ff3d00",
          "accent-focus": "#dd2c00",
          "accent-content": "#ffffff",
          neutral: "#3d4451",
          "neutral-focus": "#2a2e37",
          "neutral-content": "#ffffff",
          "base-100": "#ffffff",
          "base-200": "#f9fafb",
          "base-300": "#d1d5db",
          "base-content": "#1f2937",
          info: "#2094f3",
          success: "#009485",
          warning: "#ff9900",
          error: "#ff5724",
        },
      },
    ],
  },
};
