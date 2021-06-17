<template>
 <ElMenu :mode="mode" router>
  <el-menu-item index="/">Subpage 1</el-menu-item>
  <el-menu-item index="/about">Subpage 2</el-menu-item>
  <el-menu-item>Button 1</el-menu-item>
  <el-menu-item>Button 2</el-menu-item>
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
  setup() {
    const isSm = breakpoints.smaller("sm");
    const mode = computed(() => {
      if (isSm.value) {
        return "vertical";
      } else {
        return "horizontal";
      }
    })
    return {
      mode,
    }
  },
});
</script>

