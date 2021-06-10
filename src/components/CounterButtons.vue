<template>
    <button type="button" @click="increment">
        Increment
    </button>
    <input v-model.number="number" />
    <button type="button" @click="incrementBy(number)">
        Increment by {{ number }}
    </button>
    <button type="button" @click="reset" :disabled="isCounterResetting">
        <template v-if="isCounterResetting">
            Resetting counter...
        </template>
        <template v-else>Reset</template>
    </button>
</template>

<script lang="ts">
import store from "@/store";
import { defineComponent, ref } from "vue"

export default defineComponent({
    name: 'CounterButtons',
    setup() {
        const number = ref(0);
        const isCounterResetting = ref(false);
        return {
            number,
            isCounterResetting,
            increment: () => store.commit('incrementCount'),
            incrementBy: (v: number) => {
                store.commit('incrementCountBy', v);
            },
            reset: async () => {
                isCounterResetting.value = true;
                const res = await store.dispatch('reset', 5000)
                    .catch(() => undefined);
                if (res === undefined) return;

                try {
                    await store.dispatch('reset', 5000)
                } catch(e) {
                    return;
                }

                isCounterResetting.value = false;
            },
            // reset: () => {
            //     isCounterResetting.value = true;
            //     store.dispatch('reset', 5000)
            //         .then(() => {
            //             isCounterResetting.value = false;
            //         });
            // },
            // reset: () => {
            //     isCounterResetting.value = true;
            //     store.dispatch('reset', {
            //         timeout: 5000,
            //         callback: () => {
            //             isCounterResetting.value = false;
            //         }
            //     });
            // },
        };
    },
});
</script>
