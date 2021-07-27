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
      :style="[moveBoard, mapURL]"
    >
      <Player :characterCoords="characterCoords" :mapSize="mapSize" :moveDirection="moveDirection" :facingDirection="facingDirection"/>
      <MapElements :mapElements="mapElements" :mapSize="mapSize"/>
    </div>
    <div class="navigation">
      <ElButton @click="moveLeft()" icon="el-icon-caret-left" />
      <ElButton @click="moveUp()" icon="el-icon-caret-top" />
      <ElButton @click="moveRight()" icon="el-icon-caret-right" />
      <ElButton @click="moveDown()" icon="el-icon-caret-bottom" />

      <ElButton  icon="el-icon-thumb" />
    </div>
    <ElevatorView v-if="isElevatorView"/>
  </div>
  
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import ElevatorView from '@/components/ElevatorView.vue';
import MapElements from '@/components/MapElements.vue';
import { animationSpeed, dimension } from '@/variables/variables';
import maps from '@/json/maps.json';
import { ElButton } from 'element-plus';
import Player from '@/components/Player.vue';
import { MapElement, EntranceField, Obstacle } from '@/types';

export default defineComponent({
  name: 'Board',
  components: {
    ElevatorView,
    MapElements,
    ElButton,
    Player,
  },
  setup() {
    //TODO arrow keys should not scroll page
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
    const characterCoords = ref({x: map.value.startingCharacterCoords.x, y: map.value.startingCharacterCoords.y});
    const mapElements = ref(map.value.mapElements);
    mapElements.value.forEach((element :MapElement) => {
      element.width *= dimension;
      element.height *= dimension;
    })

    const entrance = map.value.entrance;
    const obstacle = map.value.obstacle;
    const mapName = map.value.mapName;

    const board = ref<HTMLDivElement>();
    let moveDirection = ref('');
    let facingDirection = ref('down');
    const isElevatorView = ref(false);

    const moveDown = () => {
      if (!obstacle.every((obs :Obstacle) => obs.y !== characterCoords.value.y + 1 || obs.x !== characterCoords.value.x)) return;
      if (characterCoords.value.y !== mapSize.height - 1 && moveDirection.value === '') {
        characterCoords.value.y++;
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
      if (!obstacle.every((obs :Obstacle) => obs.y !== characterCoords.value.y - 1 || obs.x !== characterCoords.value.x)) return;
      if (characterCoords.value.y !== 2 && moveDirection.value === '') {
        characterCoords.value.y--;
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
      if (!obstacle.every((obs :Obstacle) => obs.y !== characterCoords.value.y || obs.x !== characterCoords.value.x + 1)) return;
      if (characterCoords.value.x !== mapSize.width - 2 && moveDirection.value === '') {
        characterCoords.value.x++;
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
      if (!obstacle.every((obs :Obstacle) => obs.y !== characterCoords.value.y || obs.x !== characterCoords.value.x - 1)) return;
      if (characterCoords.value.x !== 1 && moveDirection.value === '') {
        characterCoords.value.x--;
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
      mapElements.value.forEach((door :MapElement) => {
        if (door.category === 'door') {
          if ((characterCoords.value.x === door.x && characterCoords.value.y === door.y)
            || (characterCoords.value.x === door.x + 1 && characterCoords.value.y === door.y) 
            || (characterCoords.value.x === door.x - 1 && characterCoords.value.y === door.y) 
            || (characterCoords.value.x === door.x && characterCoords.value.y === door.y + 1)
            || (characterCoords.value.x === door.x && characterCoords.value.y === door.y - 1)) {
            door.animationClass['doors__spritesheet--opening'] = true;
            door.animationClass['doors__spritesheet--closing'] = false;
          } else {
            door.animationClass['doors__spritesheet--opening'] = false;
            door.animationClass['doors__spritesheet--closing'] = true;
          }
        }
      });
    };

    onMounted(() => {
      if(board.value) board.value.focus();
    });

    const changeZPosition = () => {
      mapElements.value.forEach((element :MapElement) => {
        if (characterCoords.value.y <= element.y) {
          element.isObjectHigher = true;
        } else {
          element.isObjectHigher = false;
        }
      })
    };

    const checkEntering = () => {
      entrance.forEach((entranceField :EntranceField) => {
        if (characterCoords.value.x === entranceField.x && characterCoords.value.y === entranceField.y) {
          changeMap();
        }
      });
    }

    const changeMap = () => {
      isElevatorView.value = true;
    }

    const moveBoard = computed (() => `transform: translate(${ -dimension * (characterCoords.value.x - (mapSize.width - 1) / 2) + 'px'}, ${ -dimension * (characterCoords.value.y - (mapSize.height - 1) / 2) + 'px'})`
    );

    const mapURL = {
        'background-image': `url(${require('../assets/' + mapName)})`,
    }

    return{
      board,
      dimension,
      moveDown,
      moveUp, 
      moveRight,
      moveLeft,
      moveBoard,
      characterCoords,
      moveDirection,
      facingDirection,
      isElevatorView,
      mapElements,
      mapSize,
      mapURL,
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
    background-position: center;
    background-repeat: no-repeat;
    transition: transform $animationSpeed ease-in-out;
  }

  .object-higher {
    z-index: 60;
  }

  .object-lower {
    z-index: 40;
  }
</style>