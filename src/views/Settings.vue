<template>
  <ElForm @submit.prevent :model="formData" label-width="120px" label-position="top" ref="form">
    <ElFormItem label="Resources">
      <ElRadioGroup :modelValue="formData.difficulty" @update:modelValue="setDifficulty($event)">
        <ElRadio label="Junior"></ElRadio>
        <ElRadio label="Mid"></ElRadio>
        <ElRadio label="Senior"></ElRadio>
      </ElRadioGroup>
    </ElFormItem>
    <ElFormItem>
      <ElButton type="primary" @click="saveForm" native-type="submit">Save</ElButton>
      <ElButton @click="resetForm()">Reset</ElButton>
    </ElFormItem>
  </ElForm>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { ElForm, ElFormItem, ElRadioGroup, ElRadio, ElButton } from 'element-plus';
import store from '@/store';

export default defineComponent({
  name: 'Settings',
  components: {
    ElForm,
    ElFormItem,
    ElRadioGroup,
    ElRadio,
    ElButton,
  },
  setup () {
    const formData = {difficulty: ref(store.state.difficulty)};
    const setDifficulty = (difficulty: string) => { 
      formData.difficulty.value = difficulty;
    }
    const saveForm = () => store.commit('setDifficulty', formData.difficulty.value);
    const form = ref<null | {resetFields: () => void}>(null);
    const resetForm = () => form.value?.resetFields();
    
    return {
      formData,
      saveForm,
      setDifficulty,
      form,
      resetForm,
    }
  },
})
</script>
