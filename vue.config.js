
const path = require("path");
// //编译是去改变主题色
// const AntDesignThemePlugin = require('antd-theme-webpack-plugin');

// const options = {
//     antDir: path.join(__dirname, './node_modules/ant-design-vue'),
//     stylesDir: path.join(__dirname, './src'),
//     varFile: path.join(__dirname, './node_modules/ant-design-vue/lib/style/themes/default.less'),
//     mainLessFile: path.join(__dirname, ''),
//     themeVariables: ['@primary-color'],
//     generateOnce: false,
// }

// const themePlugin = new AntDesignThemePlugin(options);

const webpack = require("webpack");


module.exports = {
    chainWebpack: config => {
        const svgRule = config.module.rule('svg')

        // 清除已有的所有 loader。
        // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
        svgRule.uses.clear()

        // 添加要替换的 loader
        svgRule
            .use('vue-svg-loader')
            .loader('vue-svg-loader')
    },
    configureWebpack: {
        plugins: [
            // themePlugin
            // Ignore all locale files of moment.js
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        ],
        resolve: {
            alias: {
                "@ant-design/icons/lib/dist$": path.resolve(__dirname, "./src/icons.js")
            }
        }
    },
    css: {
        loaderOptions: {
            less: {
                modifyVars: {   //修改主题从色
                    // 'primary-color': '#1DA57A',
                    // 'link-color': '#1DA57A',
                    // 'border-radius-base': '2px',
                },
                javascriptEnabled: true
            }
        }
    },
    devServer: {
        // overlay: {   //去掉eslint 报错
        //     warnings: false,
        //     errors: false
        // },
        // lintOnSave: false,  //去掉eslint 报错
        proxy: {
            "/api": {
                target: "http://localhost:3088",
                bypass: function (req, res) {
                    if (req.headers.accept.indexOf("html") !== -1) {
                        console.log("Skipping proxy for browse request");
                        return "/index.html";
                    } else if (process.env.MOCK === "local") {  //本地环境的时候
                        const arr = req.path.split("/api/");
                        let pre = "";
                        if (arr.length > 1) {
                            pre = arr[1];
                        }
                        const name = pre.split("/").join("_");
                        // const name = req.path.split("/api/")[1].split("/").join("_");
                        const mock = require(`./mock/${name}`);
                        const result = mock(req.method);
                        //require 是会缓存数据，需要清除缓存
                        delete require.cache[require.resolve(`./mock/${name}`)];
                        return res.send(result);
                    }
                }
            }
        }
    }
}