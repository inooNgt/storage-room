import { setStorageSync, getStorageSync } from "@tarojs/taro";

console.log("setStorageSync", setStorageSync);

const CKEY = `store.container`;
const IKEY = `store.item`;
export function saveContainer(data) {
  let list = getContainers();
  list.push(data);
  setStorageSync(CKEY, JSON.stringify(list));
}

export function getContainers() {
  let list = JSON.parse(getStorageSync(CKEY) || "[]");
  return list || [];
}

export function saveItem(data) {
  let list = getItems();
  list.push(data);
  setStorageSync(IKEY, JSON.stringify(list));
}

export function getItems() {
  let list = JSON.parse(getStorageSync(IKEY) || "[]");
  return list || [];
}
