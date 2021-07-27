<template>
  <div class="box">
    <div 
      ref="board"
      class="board" 
      @keydown.down="moveDown()" 
      @keydown.up="moveUp()" 
      @keydown.left="moveLeft()" 
      @keydown.right="moveRight()"
      tabindex="0" 
      :style="moveBoard"
    >
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
      <MapElements :mapElements="mapElements" :mapSize="mapSize"/>
    </div>
    <ElevatorView v-if="isElevatorView"/>
  </div>
</template>

<script>
import { computed, defineComponent, onMounted, ref } from 'vue';
import ElevatorView from '@/components/ElevatorView.vue';
import MapElements from '@/components/MapElements.vue';
import { animationSpeed, dimension } from '@/variables/variables.ts';
import maps from '@/json/maps.json';

export default defineComponent({
  name: 'Board',
  components: {
    ElevatorView,
    MapElements,
  },
  setup() {
    const chosenMap = ref('map1');
    const map = computed(() => {
      switch (chosenMap.value) {
        case 'map1':
          return maps.map1;
        default:
          console.log('Wrong map');
          return undefined;
      }
    });

    const mapSize = {width: map.value.mapSize.width, height: map.value.mapSize.height};
    const characterCoords = {x: ref(map.value.startingCharacterCoords.x), y: ref(map.value.startingCharacterCoords.y)};
    const mapElements = ref(map.value.mapElements);
    mapElements.value.forEach(element => {
      element.width *= dimension;
      element.height *= dimension;
    })

    const entrance = map.value.entrance;
    const obstacle = map.value.obstacle;

    const board = ref(null);
    let moveDirection = ref('');
    let facingDirection = ref('down');
    const isElevatorView = ref(false);
    const moveDown = () => {
      if (!obstacle.every(obs => obs.y !== characterCoords.y.value + 1 || obs.x !== characterCoords.x.value)) return;
      if (characterCoords.y.value !== mapSize.height - 1 && moveDirection.value === '') {
        characterCoords.y.value++;
        moveDirection.value = 'down';
        facingDirection.value = 'down';
        setTimeout(() => {
          moveDirection.value = '';
        }, animationSpeed);
        openCloseDoor();
        changeZPosition();
        checkEntering();
      }
    };

    const moveUp = () => {
      if (!obstacle.every(obs => obs.y !== characterCoords.y.value - 1 || obs.x !== characterCoords.x.value)) return;
      if (characterCoords.y.value !== 2 && moveDirection.value === '') {
        characterCoords.y.value--;
        moveDirection.value = 'up';
        facingDirection.value = 'up';
        setTimeout(() => {
          moveDirection.value = '';
        }, animationSpeed);
        openCloseDoor();
        changeZPosition();
        checkEntering();
      }
    };

    const moveRight = () => {
      if (!obstacle.every(obs => obs.y !== characterCoords.y.value || obs.x !== characterCoords.x.value + 1)) return;
      if (characterCoords.x.value !== mapSize.width - 2 && moveDirection.value === '') {
        characterCoords.x.value++;
        moveDirection.value = 'right';
        facingDirection.value = 'right';
        setTimeout(() => {
          moveDirection.value = '';
        }, animationSpeed);
        openCloseDoor();
        changeZPosition();
        checkEntering();
      }
    };

    const moveLeft = () => {
      if (!obstacle.every(obs => obs.y !== characterCoords.y.value || obs.x !== characterCoords.x.value - 1)) return;
      if (characterCoords.x.value !== 1 && moveDirection.value === '') {
        characterCoords.x.value--;
        moveDirection.value = 'left';
        facingDirection.value = 'left';
        setTimeout(() => {
          moveDirection.value = '';
        }, animationSpeed);
        openCloseDoor();
        changeZPosition();
        checkEntering();
      }
    };

    const openCloseDoor = () => {
      mapElements.value.forEach(door => {
        if (door.category === 'door') {
          if ((characterCoords.x.value === door.x && characterCoords.y.value === door.y)
            || (characterCoords.x.value === door.x + 1 && characterCoords.y.value === door.y) 
            || (characterCoords.x.value === door.x - 1 && characterCoords.y.value === door.y) 
            || (characterCoords.x.value === door.x && characterCoords.y.value === door.y + 1)
            || (characterCoords.x.value === door.x && characterCoords.y.value === door.y - 1)) {
            door.animationClass['doors__spritesheet--opening'] = true;
            door.animationClass['doors__spritesheet--closing'] = false;
          } else if (!door.isClosed) {
            door.animationClass['doors__spritesheet--opening'] = false;
            door.animationClass['doors__spritesheet--closing'] = true;
          }
        }
      });
    };

    onMounted(() => {
      board.value.focus();
    });

    const changeZPosition = () => {
      mapElements.value.forEach(element => {
        if (characterCoords.y.value <= element.y) {
          element.isObjectHigher = true;
        } else {
          element.isObjectHigher = false;
        }
      })
    };

    const checkEntering = () => {
      entrance.forEach(entranceField => {
        if (characterCoords.x.value === entranceField.x && characterCoords.y.value === entranceField.y) {
          changeMap();
        }
      });
    }

    const changeMap = () => {
      isElevatorView.value = true;
    }

    const moveBoard = computed (() => `transform: translate(${ -dimension * (characterCoords.x.value - (mapSize.width - 1) / 2) + 'px'}, ${ -dimension * (characterCoords.y.value - (mapSize.height - 1) / 2) + 'px'})`
    );

    const moveCharacter = computed (() => `transform: translate(${ dimension * (characterCoords.x.value - (mapSize.width - 1) / 2 - 0.5) + 'px'}, ${ dimension * (characterCoords.y.value - (mapSize.height - 1) / 2 - 2) + 'px'})`
    );

    return{
      board,
      dimension,
      moveDown,
      moveUp, 
      moveRight,
      moveLeft,
      moveBoard,
      moveCharacter,
      characterCoords,
      moveDirection,
      facingDirection,
      isElevatorView,
      mapElements,
      mapSize,
    }
  }
});
</script>


<style lang="scss">
  @import '../variables/variables.scss';

  .box {
    position: relative;
    overflow: hidden;
  }

  .board {
    display: flex;
    justify-content: center;
    height: 480px;
    background-image: url('../assets/basement.png');
    background-position: center;
    background-repeat: no-repeat;
    transition: transform $animationSpeed ease-in-out;
  }
  
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

  .object-higher {
    z-index: 60;
  }

  .object-lower {
    z-index: 40;
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