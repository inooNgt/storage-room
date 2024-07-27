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
    custom: true,
    selectedColor: "#fa2c19",
    color: "#999999",
    list: [
      {
        pagePath: "pages/index/index",
        selectedIconPath: "./assets/img/home-active.png",
        iconPath: "./assets/img/home-gray.png",
        text: "首页",
      },
      {
        pagePath: "pages/room/index",
        selectedIconPath: "./assets/img/menu-active.png",
        iconPath: "./assets/img/menu-gray.png",
        text: "小屋",
      },
    ],
  },
});
