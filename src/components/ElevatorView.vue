<template>
  <div class="elevator-view" 
  :class="{
    'elevator-view--darkened': isScreenDarkening
    }"
  >
    <ul class="interface">
      <li v-for="(map, i) in maps" :key="i" class="interface__item">
        <button 
          @click="
            $emit('changeMap', `map${i}`, isButtonClicked),
            buttonClicked(map.name)
          " 
          class="interface__item__btn" :disabled="!map.isActive" 
          :class="{'interface__item__btn--clicked': map.isClicked}"
        >
          {{ i }}
        </button>
        <span class="interface__item__map-name">{{ map.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'ElevatorView',
  emits: ['changeMap'],
  setup () {
    const maps = ref([{name:'Lobby', isActive: true, isClicked: false}, {name:'Basement', isActive: true, isClicked: false}, {name: 'Canteen', isActive: false, isClicked: false}, {name: 'HR room', isActive: false, isClicked: false}, {name: 'Corpo boxes', isActive: false, isClicked: false}, {name: 'Server room', isActive: false, isClicked: false}, {name: 'Graphics department', isActive: false, isClicked: false}, {name: 'Conference room', isActive: false, isClicked: false}, {name: 'Private room', isActive: false, isClicked: false}, {name: 'Boss room', isActive: false, isClicked: false}])
    const isButtonClicked = ref(false);
    const isScreenDarkening = ref(false);

    const buttonClicked = (mapName: string) => {
      if (!isButtonClicked.value) {
        isButtonClicked.value = true;
        maps.value.forEach(map => {
          if (map.name === mapName) {
            map.isClicked = true
            setTimeout(() => {
              map.isClicked = false
              isScreenDarkening.value = true;
              isButtonClicked.value = false;
            }, 400)
          }
        })
      }
    }
    return {
      maps,
      buttonClicked,
      isButtonClicked,
      isScreenDarkening
    }
  }
})
</script>

<style lang="scss">

.elevator-view {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to bottom right,#7d8199, #b3cdd1);
  overflow: auto scroll;
  z-index: 100;
  transition: filter .6s;

  &--darkened {
    filter: brightness(0);
  }
}

.interface {
  display: flex;
  flex-direction: column;
  padding-top: 300px;
  list-style: none;

  &__item {

    &__btn {
      width: 2em;
      height: 2em;
      margin: 5px;
      border: 1px solid black;
      border-bottom: 3px solid black;
      font-size: 2em;
      background-color: lightgrey;
      transition: border-bottom-width transform .3s ease-in-out;

      &--clicked {
        border-bottom-width: 1px;
        transform: translateY(2px);
      }
    }

    &__map-name {
      margin: 5px;
      color: white;
    }
  }
}

</style>