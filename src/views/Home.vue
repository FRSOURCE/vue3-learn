<template>
<router-link
  to="/game"
  custom
  v-slot="{ navigate }"
>
  <ElButton @click="navigate">Start Game</ElButton>
</router-link>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import store from '@/store';
import { ElButton } from 'element-plus';

export default defineComponent({
  name: 'Home',
  components: {
    ElButton,
  },
  setup () {
    const difficulty = computed(() => {
      return store.state.user.difficulty;
    });
    return {
      difficulty,
    }
  },
});
</script>
