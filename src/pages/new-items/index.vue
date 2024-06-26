<template>
  <div class="page-home">
    <nut-tabs v-model="value" :animated-time="0">
      <nut-tab-pane title="容器" pane-key="1"> 容器 1 </nut-tab-pane>
      <nut-tab-pane title="物品" pane-key="2"> 容器 2 </nut-tab-pane>
    </nut-tabs>
    <div class="panel-operte">
      <nut-button plain class="btn-add">+</nut-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
const value = ref("1");
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
