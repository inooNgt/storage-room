import { setStorageSync, getStorageSync } from "@tarojs/taro";
import { uuid } from "@/utils/index";

const MENU_KEY = `store.menulist`;

interface Menu {
  Id: string;
  title: string;
  [key: string]: any;
}

const defaultMenuList: Menu[] = [
  {
    title: "可乐鸡翅",
  },
  {
    title: "红烧肉",
  },
  {
    title: "糖醋排骨",
  },
  {
    title: "西红柿炒鸡蛋",
  },
  {
    title: "红烧肉",
  },
  {
    title: "咸鱼烧茄子",
  },
  {
    title: "香煎茄子",
  },
  {
    title: "清蒸鲈鱼",
  },
].map((v) => ({ ...v, Id: uuid() }));

if (!getMenulist()?.length) {
  saveMenuList(defaultMenuList);
}

export function saveMenuList(list: Menu[]) {
  if (!list) return;
  list = [...list];
  list = list.map((item) => ({ ...item, Id: item.Id || uuid() }));
  setStorageSync(MENU_KEY, JSON.stringify(list));
}

export function getMenulist() {
  let list = JSON.parse(getStorageSync(MENU_KEY) || "[]");
  return list || [];
}
