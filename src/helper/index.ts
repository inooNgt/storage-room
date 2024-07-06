import { getEnv, ENV_TYPE } from "@tarojs/taro";

const ENV = getEnv();
console.log("ENV", ENV);

export const isWeapp = () => {
  return ENV === ENV_TYPE.WEAPP;
};
export const isH5 = () => {
  return ENV === ENV_TYPE.WEB;
};
