<template>
<ElContainer>
  <Menu/>
  <router-view/>
</ElContainer>
</template>

<script>
import Menu from './components/Menu.vue';
import { ElContainer } from 'element-plus';

export default {
  name: 'App',
  components: {
    Menu,
    ElContainer,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
