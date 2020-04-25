/*
 * @Author: yangyuan
 * @Date: 2020-04-13 16:26:21
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-04-25 22:18:53
 * @Description:
 */
const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackPluginCrossorigin = require("html-webpack-plugin-crossorigin");
function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    chainWebpack: config => {
        config.resolve.alias.set("@$", resolve("src"));
        config.plugins.delete("preload");
        config.plugins.delete("prefetch");
    },
    configureWebpack: config => {
        config.devtool = "eval-source-map	";
        config.externals = {
            vue: "Vue",
            // vuex: 'Vuex'
            "vue-router": "VueRouter"
        };
        config.plugins.push(
            new HtmlWebpackPlugin({
                template: "public/index.html",
                filename: path.resolve(__dirname, "sh_msa/index.html"),
                // staticPath: process.env.VUE_APP_STATIC_PATH,
                getTime: new Date().getTime(),
                inject: true,
                attributes: {
                    crossorigin: "anonymous"
                },
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    minifyJS: true
                    // more options:
                    // https://github.com/kangax/html-minifier#options-quick-reference
                }
            })
        );
        config.plugins.push(
            new HtmlWebpackPluginCrossorigin({
                inject: true
            })
        );
        if (process.env.VUE_APP_CURRENTMODE == "production") {
            config.plugins.push(
                new UglifyJsPlugin({
                    uglifyOptions: {
                        compress: {
                            warnings: false,
                            drop_debugger: true,
                            drop_console: true
                        }
                    },
                    sourceMap: false,
                    parallel: true
                })
            );
        }
    },
    //   baseUrl: 'activity', // 部署应用时的根路径(默认'/'),也可用相对路径(存在使用限制)
    outputDir: "sh_msa", // 运行时生成的生产环境构建文件的目录(默认''dist''，构建之前会被清除)
    assetsDir: "./", // 放置生成的静态资源(s、css、img、fonts)的(相对于 outputDir 的)目录(默认'')
    indexPath: "index.html", // 指定生成的 index.html 的输出路径(相对于 outputDir)也可以是一个绝对路径。
    productionSourceMap: false,
    lintOnSave: false,
    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: false,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {},
        // 启用 CSS modules for all css / pre-processor files.
        modules: false
    },
    devServer: {
        // 环境配置
        host: "0.0.0.0",
        port: 8084,
        https: false,
        hotOnly: false,
        open: false, // 配置自动启动浏览器
        proxy: {
            // https://api-pano.vr2shipping.com/home/pageInfo //socket会gg
            "/api": {
                target: "http://api-msa.vr2shipping.com",
                changeOrigin: true,
                pathRewrite: (path, req) => path.replace("/api", "")
            }
        }
    }
};
