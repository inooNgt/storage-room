import Components from "unplugin-vue-components/webpack";
import NutUIResolver from "@nutui/auto-import-resolver";
import path from "path";
const MODE = process.env.MODE;
console.log("MODE: ", MODE);
const config = {
  projectName: "storage-room",
  date: "2024-6-23",
  designWidth(input) {
    if (input?.file?.replace(/\\+/g, "/").indexOf("@nutui") > -1) {
      return 375;
    }
    return 375;
  },
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
    375: 2 / 1,
  },
  sourceRoot: "src",
  outputRoot: `dist/${MODE}`,
  plugins: ["@tarojs/plugin-html"],
  defineConstants: {},
  copy: {
    patterns: [],
    options: {},
  },
  framework: "vue3",
  compiler: {
    type: "webpack5",
    prebundle: { enable: false },
  },
  alias: {
    src: path.resolve(__dirname, "..", "src"),
    "@/assets": path.resolve(__dirname, "..", "src/assets"),
    "@/store": path.resolve(__dirname, "..", "src/store"),
    "@/helper": path.resolve(__dirname, "..", "src/helper"),
    "@/service": path.resolve(__dirname, "..", "src/service"),
    "@/router": path.resolve(__dirname, "..", "src/router"),
    "@/pages": path.resolve(__dirname, "..", "src/pages"),
    "@/components": path.resolve(__dirname, "..", "src/components"),
    "@/style": path.resolve(__dirname, "..", "src/utils"),
    "@/utils": path.resolve(__dirname, "..", "src/utils"),
  },
  sass: {
    data: `@import "@nutui/nutui-taro/dist/styles/variables.scss";`,
  },
  mini: {
    webpackChain(chain) {
      chain.plugin("unplugin-vue-components").use(
        Components({
          resolvers: [
            NutUIResolver({
              importStyle: "sass",
              taro: true,
            }),
          ],
        })
      );
    },
    postcss: {
      pxtransform: {
        enable: true,
        config: {
          // selectorBlackList: ['nut-']
        },
      },
      url: {
        enable: true,
        config: {
          limit: 1024, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]",
        },
      },
    },
  },
  h5: {
    webpackChain(chain) {
      chain.plugin("unplugin-vue-components").use(
        Components({
          resolvers: [
            NutUIResolver({
              importStyle: "sass",
              taro: true,
            }),
          ],
        })
      );
    },
    publicPath: "/",
    staticDirectory: "static",
    esnextModules: ["nutui-taro", "icons-vue-taro"],
    postcss: {
      autoprefixer: {
        enable: true,
        config: {},
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]",
        },
      },
    },
  },
};

module.exports = function (merge) {
  if (process.env.NODE_ENV === "development") {
    return merge({}, config, require("./dev"));
  }
  return merge({}, config, require("./prod"));
};
