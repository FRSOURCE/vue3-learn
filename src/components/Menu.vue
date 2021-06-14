<template>
 <ElMenu class="el-menu-demo" :mode="mode">
  <el-menu-item index="1">Processing Center</el-menu-item>
  <el-submenu index="2">
    <template #title>Workspace</template>
    <el-menu-item index="2-1">item one</el-menu-item>
    <el-menu-item index="2-2">item two</el-menu-item>
    <el-menu-item index="2-3">item three</el-menu-item>
    <el-submenu index="2-4">
      <template #title>item four</template>
      <el-menu-item index="2-4-1">item one</el-menu-item>
      <el-menu-item index="2-4-2">item two</el-menu-item>
      <el-menu-item index="2-4-3">item three</el-menu-item>
    </el-submenu>
  </el-submenu>
  <el-menu-item index="3" disabled>Info</el-menu-item>
  <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">Orders</a></el-menu-item>
 </ElMenu>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import {ElMenu, ElMenuItem, ElSubmenu} from 'element-plus';
import { breakpoints } from '@/shared/breakpoints';

export default defineComponent({
  name: 'Menu',
  components:{
      ElMenu,
      ElMenuItem,
      ElSubmenu,
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

