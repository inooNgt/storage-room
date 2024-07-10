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
      label="位置"
      prop="position"
      required
      :rules="[{ required: true, message: '请填写位置' }]"
    >
      <nut-input
        v-model="formData.position"
        placeholder="请输入位置"
        type="text"
      />
    </nut-form-item>
    <nut-space style="margin: 10px">
      <nut-button type="primary" size="small" @click="submit">提交</nut-button>
      <nut-button size="small" @click="reset">重置提示状态</nut-button>
    </nut-space>
  </nut-form>
</template>
<script setup>
import { ref } from "vue";
import { saveContainer, getContainers } from "@/service/store";
import router from "@/router/fn";
console.log("router: ", router);

const formData = ref({
  name: "",
  position: "",
});

const formRef = ref(null);

const reset = () => {
  formRef.value?.reset();
};

const submit = () => {
  formRef.value?.validate().then(({ valid, errors }) => {
    if (valid) {
      console.log("success:", formData.value);
      saveContainer(formData.value);
      console.log("getContainers", getContainers());
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
