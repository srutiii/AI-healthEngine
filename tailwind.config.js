/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      logo: ["Tac One", "sans-serif"],
      text: ["Nunito"],
    },
    extend: {
      colors: {
        lightBackground: "#fffff4",
        darkBackground: "#344955",
        lightText: "#51829B",
        darkText: " #7ED7C1",
        btn2: "#93C6E7",
        btn1: "#EFBC9B",
      },
      backgroundImage: {
        img1: 'url("https://wallpapers.com/images/featured/healthcare-oco8w27tkw40cp90.jpg")',
        doc: 'url("https://www.aamc.org/sites/default/files/styles/scale_and_crop_1200_x_666/public/workforce-feature.jpg__992x558_q85_crop-smart_subsampling-2_upscale.jpg?itok=xrYKAvV0")',
      },
    },
  },
  plugins: [],
};
