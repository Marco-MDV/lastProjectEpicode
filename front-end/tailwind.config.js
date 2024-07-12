/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      boxShadow:{
        'inner-custom': 'inset 0 2px 4px rgba(0, 0, 0, 0.32)' 
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.16010154061624648) 100%)',
        'custom-gradient-history':'radial-gradient(circle, rgba(0,0,0,0.23573179271708689) 0%, rgba(0,0,0,0.16010154061624648) 100%);'
      },
      transitionDuration:{
        '800':'800ms'
      },
      keyframes:{
        swiperLeft:{
          '0%':{
            opacity: '0',
            transform: 'translateX(380px)',
          },
          '100%':{
            opacity: '1',
            transform: 'translateX(0)',
          }
        },
        swiperRight:{
          '0%':{
            opacity: '0',
            transform: 'translateX(0)',
          },
          '100%':{
            opacity: '1',
            transform: 'translateX(380px)',
          }
        },
        inverseSwiperRight:{
          '0%':{
            opacity: '1',
            transform: 'translateX(0)',
          },
          '100%':{
            opacity: '0',
            transform: 'translateX(380px)',
          }
        },
        inverseSwiperLeft:{
          '0%':{
            opacity: '0',
            transform: 'translateX(380px)',
          },
          '100%':{
            opacity: '1',
            transform: 'translateX(0)',
          }
        }
      },
      animation:{
        swiperLeft:"swiperLeft 800ms forwards",
        swiperRight:"swiperRight 800ms forwards",
        inverseSwiperRight:"inverseSwiperRight 800ms forwards",
        inverseSwiperLeft:"inverseSwiperLeft 800ms forwards",
      }
    }
  },
  plugins: [
    require('flowbite/plugin')
  ],
  darkMode: "class",
}

