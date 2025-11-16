/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true, // <-- Otomatis memberi margin-x: auto
      padding: '1rem', // <-- Jarak di sisi kiri/kanan di layar kecil
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px', // <-- Lebar maksimum container Anda
        // '2xl': '1536px', // Anda bisa hapus jika 1280px adalah batas maks
      }
    },
    extend: {
      fontFamily : {
        'sans' : ['Poppins', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'primary' : '#62825D',
        'secondary' : '#9EDF9C',

      }
    },
  },
  plugins: [],
}

