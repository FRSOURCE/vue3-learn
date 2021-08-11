<template>
<ElContainer>
  <component 
    :class="{
      'menu--open': isMenuOpen, 
      menu: isSm
    }" 
    :is="menuPlacement"
  >
    <Menu @close="closeMenu"/>
  </component>
  <div :class="{
    'inactive-content': isMenuOpen && isSm
  }" @click.capture="closeMenu(), stopPropagationIfOpen($event)" >
    <ElHeader v-if="isSm">
      <ElButton @click.stop="toggleMenu" icon="el-icon-more" circle/>
    </ElHeader>
    <ElMain class="px-0-sm"><router-view/></ElMain>
  </div>
  <!-- <div>
    <VueKit/>
    <Board/> wczytac rozmiar mapy
  </div> -->
  
  
</ElContainer>
</template>

<script lang="ts">
import Menu from './components/Menu.vue';
import { defineComponent, computed, ref } from 'vue';
import { ElContainer, ElMain, ElHeader, ElAside, ElButton } from 'element-plus';
import { breakpoints } from '@/shared/breakpoints';
import VueKit from './components/VueKit.vue';
import Board from '@/components/Board.vue';

export default defineComponent({
  name: 'App',
  components: {
    Menu,
    ElContainer,
    ElMain,
    ElHeader,
    ElAside,
    ElButton,
    VueKit,
    Board,
  },
  setup() {
    const isMenuOpen = ref(false);
    const isSm = breakpoints.smaller("sm");
    const menuPlacement = computed(() => isSm.value ? 'ElAside' : 'ElHeader');
    const toggleMenu = () => isMenuOpen.value = !isMenuOpen.value;
    const closeMenu = () => isMenuOpen.value = false;
    const stopPropagationIfOpen = (event:MouseEvent) =>{
      if(isMenuOpen.value){
        event.stopPropagation();
        event.preventDefault();
      }
    };  
    return {
      menuPlacement,
      isSm,
      isMenuOpen,
      toggleMenu,
      closeMenu,
      stopPropagationIfOpen,
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

.inactive-content{
  filter: blur(5px);
}

.px-0-sm {
  @media (max-width: 920px){
    padding-left: 0;
    padding-right: 0;
  }
}

</style>

<style lang="scss">
.text-right{
  text-align: right;
}
</style>