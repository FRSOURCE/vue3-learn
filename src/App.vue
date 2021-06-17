<template>
<ElContainer>
  <ElButton @click="toggleMenu" icon="el-icon-more" v-if="isSm"/>
  <component :class="{'menu--open': isMenuOpen}" class="menu" :is="menuPlacement">
    <Menu @close="toggleMenu"/>
  </component>
  <ElMain><router-view/></ElMain>
</ElContainer>
</template>

<script lang="ts">
import Menu from './components/Menu.vue';
import { defineComponent, computed, ref } from 'vue';
import { ElContainer, ElMain, ElHeader, ElAside, ElButton } from 'element-plus';
import { breakpoints } from '@/shared/breakpoints';

export default defineComponent({
  name: 'App',
  components: {
    Menu,
    ElContainer,
    ElMain,
    ElHeader,
    ElAside,
    ElButton,
  },
  setup() {
    const isMenuOpen = ref(false);
    const isSm = breakpoints.smaller("sm");
    const menuPlacement = computed(() => isSm.value ? 'ElAside' : 'ElHeader');
    const toggleMenu = () => isMenuOpen.value = !isMenuOpen.value;

    return {
      menuPlacement,
      isSm,
      isMenuOpen,
      toggleMenu,
    }
  },
});
</script>

<style lang="scss" scoped>
.menu{
  z-index: 100;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  background-color: #fff;
  transform: translate(-100%);
  transition: 0.5s transform ease-in-out;

  &--open{
    transform: none;
  }
}

</style>

<style lang="scss">
.text-right{
  text-align: right;
}
</style>