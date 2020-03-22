module.exports = {
  presets: ["@vue/cli-plugin-babel/preset", "@vue/babel-preset-jsx"],
  plugins: [
    [
      "import",
      { libraryName: "ant-design-vue", libraryDirectory: "es", style: true }
    ] //  style: true 会加载less 文件  主要是可以按需加载 ant-design-vue 的各个组件，并且自动加载less
  ],
};
