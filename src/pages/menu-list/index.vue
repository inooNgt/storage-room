<template>
  <div class="page-menulist">
    <ul>
      <li v-for="ctn in menulist" :key="ctn.title">
        {{ ctn.title }}
        <span>编辑</span>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { getMenulist } from "@/service/turntable";

const menulist = ref(getMenulist());
console.log("menulist: ", menulist);
</script>

<style lang="scss">
.page-menulist {
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
