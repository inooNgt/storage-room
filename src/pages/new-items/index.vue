<template>
  <nut-form
    ref="formRef"
    :model-value="formData"
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
      <nut-input
        v-model="formData.containerId"
        placeholder="请输入所属容器"
        type="text"
      />
    </nut-form-item>
    <nut-space style="margin: 10px">
      <nut-button type="primary" size="small" @click="submit">提交</nut-button>
    </nut-space>
  </nut-form>
</template>
<script setup>
import { ref } from "vue";
import { saveItem } from "@/service/store";
import router from "@/router/fn";
const formData = ref({
  name: "",
  itemType: "",
  containerId: "",
});

const formRef = ref(null);

const reset = () => {
  formRef.value?.reset();
};

const submit = () => {
  formRef.value?.validate().then(({ valid, errors }) => {
    if (valid) {
      console.log("success:", formData.value);
      saveItem(formData.value);
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
      console.log("success:", formData.value);
    } else {
      console.warn("error:", errors);
    }
  });
};
</script>
