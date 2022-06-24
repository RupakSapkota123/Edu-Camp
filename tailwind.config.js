module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", // or 'media'  or 'class'
  theme: {
    screens: {
      mobile: "420px",
      tablet: "640px",
      laptop: "1024px",
      desktop: "1280px",
    },
    fontFamily: {
      sans: ["Anek Malayalam", "sans-serif"],
    },

    extend: {
      fontSize: {
        "1xs": "11px",
        "2xs": "12px",
        "3xs": "13px",
        "4xs": "14px",
        "5xs": "15px",
        "6xs": "16px",
        "7xs": "18px",
        "1xl": "20px",
        "2xl": "24px",
        "3xl": "28px",
        "4xl": "32px",
      },
      colors: {
        "indigo-950": "#1b1925",
        "indigo-1000": "#100f17",
        "indigo-1100": "#08070f",
      },
      height: {
        "60px": "60px",
        "20rem": "20rem",
        "25rem": "25rem",
      },
      maxWidth: {
        "16rem": "16rem",
      },
      minWidth: {
        "15rem": "15rem",
      },
      maxHeight: {
        "90vh": "90vh",
        "80vh": "80vh",
        "70vh": "70vh",
        "85%": "85%",
      },
      minHeight: {
        "10rem": "10rem",
        "18rem": "18rem",
        "24rem": "24rem",
        "80%": "80%",
      },
      width: {
        "20rem": "20rem",
        "30rem": "30rem",
        "40rem": "40rem",
      },
      padding: {
        "6%": "6%",
        "60px": "60px",
        "20%": "20%",
        "10%": "10%",
      },
      zIndex: {
        9999: "9999",
      },
    },
  },
  default: {
    button: {
      "&:disabled": {
        cursor: "not-allowed",
        opacity: 0.4,
      },
    },
  },
  plugins: [],
};