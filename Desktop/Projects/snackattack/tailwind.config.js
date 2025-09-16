/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        color1: '#F9A826',     
        color2: '#FF4D4D ',
        color3: '#ADE8F4',    
        color4: '#FFFAF0',     
        color5: '#0077B6',  
      },
    },
  },
  plugins: [],
};
