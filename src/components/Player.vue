<template>
    <div class="player" :style="moveCharacter">
        <img
          v-if="moveDirection === ''"
          class="player__spritesheet" 
          :class="{
            'player__spritesheet--face-down': facingDirection === 'down',
            'player__spritesheet--face-up': facingDirection === 'up',
            'player__spritesheet--face-left': facingDirection === 'left',
            'player__spritesheet--face-right': facingDirection === 'right',
          }" 
          src="../assets/character-staying.png" 
          alt="staying-character"
        >
        <img
          v-else
          class="player__spritesheet" 
          :class="{
            'player__spritesheet--move-down': moveDirection === 'down',
            'player__spritesheet--move-up': moveDirection === 'up',
            'player__spritesheet--move-left': moveDirection === 'left',
            'player__spritesheet--move-right': moveDirection === 'right',
          }" 
          src="../assets/character-run.png" 
          alt="walking-character"
        >
      </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';
import { Player, MapSize } from '@/types';
import { dimension } from '@/variables/variables';
import { toRefs } from '@vueuse/core';

export default defineComponent({
    name: 'Player',
    props: {
        characterCoords: {
            type: Object as PropType<Player>,
            required: true,
        },
        mapSize: {
            type: Object as PropType<MapSize>,
            required: true,
        },
        moveDirection: {
            type: String,
            required: true,
        },
        facingDirection: {
            type: String,
            required: true,
        },
    },
    setup(props) {
        const { characterCoords, mapSize } = toRefs(props);
        const moveCharacter = computed (() => `transform: translate(${ dimension * (characterCoords.value.x - mapSize.value.width / 2) + 'px'}, ${ dimension * (characterCoords.value.y - mapSize.value.height / 2 - 1.25) + 'px'})`
        );
        //add x,y
        return {
            moveCharacter,
        }
    },
})
</script>

<style lang="scss" scoped>
  @import '../variables/variables.scss';

  .player {
    position: absolute;
    overflow: hidden;
    top: calc(50%);
    left: calc(50%);
    width: $dimension;
    height: $dimension * 2;
    z-index: 50;
    transition: transform $animationSpeed ease-in-out;

    &__spritesheet {
      transform: translateX(-75%);

      &--move-down {
        animation: downSpritesheet $animationSpeed steps(6);
      } 

      &--move-up {
        animation: upSpritesheet $animationSpeed steps(6);
      } 

      &--move-left {
        animation: leftSpritesheet $animationSpeed steps(6);
      }

      &--move-right {
        animation: rightSpritesheet $animationSpeed steps(6);
      }

      &--face-down {
        animation: downSpritesheet $animationSpeed steps(6) infinite;
      }

      &--face-up {
        animation: upSpritesheet $animationSpeed steps(6) infinite;
      }

      &--face-left {
        animation: leftSpritesheet $animationSpeed steps(6) infinite;
      }

      &--face-right {
        animation: rightSpritesheet $animationSpeed steps(6) infinite;
      }
    }
  }

  @keyframes downSpritesheet {
    from {
      transform: translateX(-75%);
    }
    to {
      transform: translateX(-100%);
    }
  }

  @keyframes upSpritesheet {
    from {
      transform: translateX(-25%);
    }
    to {
      transform: translateX(-50%);
    }
  }

  @keyframes leftSpritesheet {
    from {
      transform: translateX(-50%);
    }
    to {
      transform: translateX(-75%);
    }
  }

  @keyframes rightSpritesheet {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-25%);
    }
  }
</style>
