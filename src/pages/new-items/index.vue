<template>
  <nut-form
    ref="formRef"
    class="form-item"
    :model-value="formData"
    :show-error-line="false"
    :rules="{
      name: [{ required: true, message: '请填写名称' }],
    }"
  >
    <nut-form-item label="名称" prop="name">
      <nut-input
        v-model="formData.name"
        placeholder="请输入名称"
        type="text"
        @blur="customBlurValidate('name')"
      />
    </nut-form-item>
    <nut-form-item
      label="类型"
      prop="itemType"
      required
      :rules="[{ required: true, message: '请填写类型' }]"
    >
      <nut-input
        v-model="formData.itemType"
        placeholder="请输入类型"
        type="text"
      />
    </nut-form-item>
    <nut-form-item label="所属容器" prop="containerId">
      <nut-cell
        class="cell-cnt"
        :title="formData.containerName"
        @click="showContainer = true"
      ></nut-cell>
      <nut-popup v-model:visible="showContainer" position="bottom">
        <nut-picker
          v-model="conValue"
          :columns="columns"
          title="容器"
          @confirm="selectContainer"
        />
      </nut-popup>
    </nut-form-item>
    <nut-space style="margin: 10px">
      <nut-button
        type="primary"
        size="small"
        @click="submit"
        @cancel="showContainer = false"
        >提交</nut-button
      >
    </nut-space>
  </nut-form>
</template>
<script setup>
import { ref, reactive, computed } from "vue";
import { saveItem } from "@/service/store";
import { useContainerList } from "../index/hooks/container-list";
import router from "@/router/fn";
const formData = reactive({
  name: "",
  itemType: "",
  containerId: "",
  containerName: "",
});

const formRef = ref(null);
const conValue = ref([]);
const showContainer = ref(false);

const { containers } = useContainerList();
console.log("containers: ", containers);

const columns = computed(() =>
  containers.value.map((v) => {
    return { ...v, text: v.name, value: v.Id };
  })
);

const selectContainer = ({ selectedOptions }) => {
  showContainer.value = false;
  formData.containerId = selectedOptions[0]?.value;
  formData.containerName = selectedOptions[0]?.text;
  console.log(
    "selectContainer",
    conValue.value,
    selectedOptions,
    formData.containerName
  );
};

const reset = () => {
  formRef.value?.reset();
};

const submit = () => {
  formRef.value?.validate().then(({ valid, errors }) => {
    if (valid) {
      console.log("success:", formData);
      saveItem(formData);
      router.go(-1);
    } else {
      console.warn("error:", errors);
    }
  });
};
// 失去焦点校验
const customBlurValidate = (prop) => {
  formRef.value?.validate(prop).then(({ valid, errors }) => {
    if (valid) {
      console.log("success:", formData);
    } else {
      console.warn("error:", errors);
    }
  });
};
</script>
<style lang="scss">
.form-item {
  .nut-cell-group__wrap .cell-cnt {
    padding: 0;
  }
}
</style>
