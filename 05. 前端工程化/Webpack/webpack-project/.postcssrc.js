module.exports = {
  plugins: {
    "postcss-pxtorem": {
      rootValue: 75, //750的设计稿
      propList: ["*"],
    },
    "postcss-px-to-viewport": {
      viewportWidth: 750, //750的设计稿
    },
  },
};
