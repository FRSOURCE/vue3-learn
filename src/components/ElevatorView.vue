<template>
    <div class="elevator-view">
        <div>
            <button @click="$emit('changeMap','map0')">
                -1
            </button>
            <span>Basement</span>
        </div>
        <div>
            <button @click="$emit('changeMap','map1')">
                0
            </button>
            <span>Lobby</span>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
name: 'ElevatorView',
emits: ['changeMap',]
})
</script>

<style lang="scss">

.elevator-view {
    position: absolute;
    display: flex;
    justify-content: center;
    flex-direction: column;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: black;
    z-index: 100;
}

</style>