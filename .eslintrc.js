module.exports = {
  root: true,
  env: {
    node: true,
    jest: true
  },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    // "@vue/prettier"  //暂时不需要检查 老是报错
  ],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
  },
};
