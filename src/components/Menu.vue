<template>
  <ElMenu :mode="mode" router @select="$emit('close')">
    <ElMenuItem class="text-right" v-if="isSm">
      <i class="el-icon-close"/>
    </ElMenuItem>
    <ElMenuItem index="/">Home</ElMenuItem>
    <ElMenuItem index="/about">About</ElMenuItem>
    <ElMenuItem index="/settings">Settings</ElMenuItem>
  </ElMenu>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import {ElMenu, ElMenuItem } from 'element-plus';
import { breakpoints } from '@/shared/breakpoints';

export default defineComponent({
  name: 'Menu',
  components:{
      ElMenu,
      ElMenuItem,
  },
  emits : ['close'],
  setup() {
    const isSm = breakpoints.smaller("sm");
    const mode = computed(() => isSm.value? 'vertical': 'horizontal');
    return {
      mode,
      isSm,
    }
  },
});
</script>
