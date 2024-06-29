<template>
  <div class="page-new-items">new-items</div>
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
