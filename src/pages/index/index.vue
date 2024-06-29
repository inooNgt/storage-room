<template>
  <div class="page-home">
    <nut-tabs v-model="value" :animated-time="0">
      <nut-tab-pane title="容器" pane-key="1"> 容器 1 </nut-tab-pane>
      <nut-tab-pane title="物品" pane-key="2"> 容器 2 </nut-tab-pane>
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
import router, { routeMap } from "@/router/fn";
console.log("router", router, routeMap);

const showAddOption = ref(false);
const value = ref("1");
const addType = ref("");

const menuItems = [
  {
    name: "新增容器",
    value: "new-items",
    type: "1",
  },
  {
    name: "新增物品",
    value: "new-items",
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
