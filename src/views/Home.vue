<template>
  <div class="home">
    <p>{{ difficulty }}</p>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import store from '@/store';


export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld,
  },
  setup () {
    const difficulty = computed(() => {
      return store.state.difficulty;
    });
    return {
      difficulty,
    }
  },
});
</script>
