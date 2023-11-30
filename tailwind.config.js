module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{njk,svg}'],
  theme: {
    extend: {
      maxWidth: {
        'screen-3xl': '1600px',
      },
      fontFamily: {
        'sans': ['Inter var', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif']
      },
      colors: {
        "always-black": "#323234",
        "always-white": "#E3DDCF",
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        light: {
          "primary": "#FEE04A",
          "secondary": "#28AF60",
          "base-100": "#F6F4EF", // background color
          "base-content": "#323234", // text color
          "accent": "#E3DDCF",
          "neutral": "#B0AEA6",
        },
        dark: {
          "primary": "#FEE04A",
          "secondary": "#28AF60",
          "base-100": "#323234", // background color
          "base-content": "#E3DDCF", // text color
          "accent": "#B0AEA6",
          "neutral": "#585859",
        },
      },
    ],
    lightTheme: "light",
    darkTheme: "dark",
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    logs: false,
    themeRoot: ":root"
  }
};
