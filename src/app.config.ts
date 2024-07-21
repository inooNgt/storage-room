import { pages } from "./router/index";
export default defineAppConfig({
  pages,
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    custom: false,
    list: [
      {
        pagePath: "pages/turntable/index",
        text: "首页",
      },
      {
        pagePath: "pages/room/index",
        text: "小屋",
      },
    ],
  },
});
