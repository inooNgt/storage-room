<template>
  <cover-view class="tab-bar">
    <cover-view class="tab-bar-border"></cover-view>
    <cover-view
      v-for="(item, index) in list"
      :key="index"
      class="tab-bar-item"
      @tap="switchTabbar(index, item.pagePath)"
    >
      <cover-image
        :src="selected === index ? item.selectedIconPath : item.iconPath"
      />
      <cover-view
        :style="{ color: selected === index ? selectedColor : color }"
        >{{ item.text }}</cover-view
      >
    </cover-view>
  </cover-view>
</template>

<script setup>
import { switchTab } from "@tarojs/taro";
import { computed, ref } from "vue";
const selected = ref(0);

const color = "#999999";
const selectedColor = "#fa2c19";
const list = [
  {
    pagePath: "/pages/index/index",
    selectedIconPath: "../assets/img/home-active.png",
    iconPath: "../assets/img/home-gray.png",
    text: "首页",
  },
  {
    pagePath: "/pages/room/index",
    selectedIconPath: "../assets/img/menu-active.png",
    iconPath: "../assets/img/menu-gray.png",
    text: "小屋",
  },
];

function switchTabbar(index, url) {
  selected.value = index;
  switchTab({ url });
}
</script>

<style lang="scss">
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  background: white;
  display: flex;
  padding-bottom: 20px;
  .tab-bar-border {
    background-color: rgba(0, 0, 0, 0.33);
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 1px;
    transform: scaleY(0.5);
  }
  .tab-bar-item {
    flex: 1;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .tab-bar-item cover-image {
    width: 27px;
    height: 27px;
  }
  .tab-bar-item cover-view {
    font-size: 12px;
  }
}
</style>
