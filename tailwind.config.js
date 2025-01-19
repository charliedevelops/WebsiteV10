/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{jsx,tsx}'], // tell tailwind where to look
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontSize: '2.25rem', // Example: 36px
              fontWeight: '700',

              // other styles...
            },
            h2: {
              fontSize: '1.875rem', // Example: 30px
              fontWeight: '600',
              // other styles...
            },
            h3: {
              fontSize: '1.5rem', // Example: 24px
              fontWeight: '600',
              // other styles...
            },
            h4: {
              fontSize: '1.25rem', // Example: 20px
              fontWeight: '600',
              // other styles...
            },

            // Customize other elements as needed
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
