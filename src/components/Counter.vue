<template>
    {{ count }}
</template>

<script lang="ts">
import store from "@/store";
import { computed, defineComponent } from "vue"

export default defineComponent({
    name: 'Counter',
    setup() {
        const count = computed(() => store.state.count);
        return { count };
    },
});
</script>
