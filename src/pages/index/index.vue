<template>
  <div class="page-home">
    <nut-tabs v-model="value" :animated-time="0">
      <nut-tab-pane title="容器" pane-key="1">
        <ul>
          <li v-for="ctn in containers" :key="ctn.name">
            {{ ctn.name }}
          </li>
        </ul>
      </nut-tab-pane>
      <nut-tab-pane title="物品" pane-key="2">
        <ul>
          <li v-for="item in itemlist" :key="item.name">
            {{ item.name }}
          </li>
        </ul>
      </nut-tab-pane>
    </nut-tabs>
    <div class="panel-operte">
      <nut-button plain class="btn-add" @click="handleAdd">+</nut-button>
    </div>
    <nut-action-sheet
      v-model:visible="showAddOption"
      :menu-items="menuItems"
      @choose="chooseAddType"
    />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useDidShow } from "@tarojs/taro";
import { getItems } from "@/service/store";
import router, { routeMap } from "@/router/fn";
import { useContainerList } from "./hooks/container-list";
console.log("router", router, routeMap);

const showAddOption = ref(false);
const value = ref("1");
const addType = ref("");

const { containers, updateContainers } = useContainerList();
console.log("containers: ", containers);
console.log("updateContainers: ", updateContainers);
useDidShow(() => {
  updateContainers();
});

console.log("containers: ", containers.value);
const itemlist = ref([]);
const initItemlist = () => {
  itemlist.value = getItems();
};
initItemlist();

const menuItems = [
  {
    name: "新增物品",
    value: "new-items",
    type: "1",
  },
  {
    name: "新增容器",
    value: "new-container",
    type: "2",
  },
];

const handleAdd = () => {
  showAddOption.value = true;
};

const chooseAddType = (item) => {
  addType.value = item.name;
  console.log("chooseAddType", item);
  router.push({
    name: item.value,
  });
};
</script>

<style lang="scss">
.page-home {
  .panel-operte {
    text-align: center;
  }
  .btn-add {
    width: 28px;
    height: 28px;
    padding: 0;
    font-size: 22px;
  }
}
</style>
