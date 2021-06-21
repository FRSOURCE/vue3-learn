<template>
  <ElForm @submit.prevent :model="form" label-width="120px">
    <ElFormItem label="Resources">
      <ElRadioGroup :modelValue="form.difficulty" @update:modelValue="setDifficulty($event)">
        <ElRadio label="Junior"></ElRadio>
        <ElRadio label="Mid"></ElRadio>
        <ElRadio label="Senior"></ElRadio>
      </ElRadioGroup>
      <ElButton @click="saveForm" native-type="submit">Save</ElButton>
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
    const form = {difficulty: ref(store.state.difficulty)};
    const setDifficulty = (difficulty: string) => 
      form.difficulty.value = difficulty;
    const saveForm = () => store.commit('setDifficulty', form.difficulty.value);
    return {
      form,
      saveForm,
      setDifficulty,
    }
  },
})
</script>
