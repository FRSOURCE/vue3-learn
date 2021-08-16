<template>
  <div class="box">
    <div class="board-wrapper">
      <div 
        ref="board"
        class="board" 
        @keydown.down.prevent="moveDown()" 
        @keydown.up.prevent="moveUp()" 
        @keydown.left.prevent="moveLeft()" 
        @keydown.right.prevent="moveRight()"
        @keydown.space.prevent="interact()"
        tabindex="0" 
        :style="[moveBoard, mapURL, mapDimension]"
      >
        <Player :characterCoords="characterCoords" :mapSize="mapSize" :moveDirection="moveDirection" :facingDirection="facingDirection"/>
        <MapElements :mapElements="mapElements" :mapSize="mapSize"/>
      </div>
    </div>
    <div  class="navigation" :style="[navigationTop]">
      <div >
        <div class="navigation__row">
          <ElButton class="mb-10" @click="moveUp()" icon="el-icon-caret-top" />
        </div>
        <div class="navigation__row">
          <ElButton @click="moveLeft()" icon="el-icon-caret-left" />
          <ElButton @click="moveDown()" icon="el-icon-caret-bottom" />
          <ElButton @click="moveRight()" icon="el-icon-caret-right" />
        </div>
      <ElButton class="mb-10" @click="moveUp()" icon="el-icon-thumb" />
      </div>
      <!-- <ElButton  icon="el-icon-thumb" /> -->
    </div>
    <ElevatorView v-if="isElevatorView" @changeMap="changeMap" />
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
    const chosenMap = ref('map1');
    const map = computed(() => {
      switch (chosenMap.value) {
        case 'map0':
          return maps.map0;
        case 'map1':
          return maps.map1;
        default:
          console.log('Wrong map');
          return undefined;
      }
    });

    let mapSize = ref({width: map.value.mapSize.width, height: map.value.mapSize.height});
    const characterCoords = ref({x: map.value.startingCharacterCoords.x, y: map.value.startingCharacterCoords.y});
    const mapElements = ref(map.value.mapElements);
    mapElements.value.forEach((element :MapElement) => {
      element.calculatedWidth = element.width * dimension;
        element.calculatedHeight = element.height * dimension;
    })

    let entrance = map.value.entrance;
    let obstacle = map.value.obstacle;
    let mapName = map.value.mapName;

    const board = ref<HTMLDivElement>();
    let moveDirection = ref('');
    let facingDirection = ref('down');
    const isElevatorView = ref(false);

    const moveDown = () => {
      if (!obstacle.every((obs :Obstacle) => obs.y !== characterCoords.value.y + 1 || obs.x !== characterCoords.value.x)) return;
      if (characterCoords.value.y !== mapSize.value.height - 1 && moveDirection.value === '') {
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
      if ((characterCoords.value.y !== 2 && moveDirection.value === '') || (characterCoords.value.y !== 1 && moveDirection.value === '' && chosenMap.value === 'map0')) {
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
      if (characterCoords.value.x !== mapSize.value.width - 2 && moveDirection.value === '') {
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

    const interact = () => {
      //
    }

    const openCloseDoor = () => {
      mapElements.value.forEach((door :MapElement) => {
        if (door.category === 'door') {
          if ((characterCoords.value.x === door.x && characterCoords.value.y === door.y)
            || (characterCoords.value.x === door.x && characterCoords.value.y === door.y + 1)
            || (characterCoords.value.x === door.x && characterCoords.value.y === door.y - 1)) {
            door.animationClass['doors__spritesheet--opening'] = true;
            door.animationClass['doors__spritesheet--closing'] = false;
          } else {
            door.animationClass['doors__spritesheet--opening'] = false;
            door.animationClass['doors__spritesheet--closing'] = true;
          }
        }

        if (door.category === 'elevator') {
          if ((characterCoords.value.x === door.x && characterCoords.value.y === door.y) ||
            (characterCoords.value.x === door.x + 1 && characterCoords.value.y === door.y)
            || (characterCoords.value.x === door.x && characterCoords.value.y === door.y + 1)
            || (characterCoords.value.x === door.x + 1 && characterCoords.value.y === door.y + 1)) {
            door.animationClass['elevator--opening'] = true;
            door.animationClass['elevator--closing'] = false;
          } else {
            door.animationClass['elevator--opening'] = false;
            door.animationClass['elevator--closing'] = true;
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
          setTimeout(() => {
            openMapChooseView();
          }, animationSpeed);
        }
      })
    };

    const openMapChooseView = () => {
      isElevatorView.value = true;
    }
    const translateValue = computed(() =>{
      if(window.innerWidth > mapSize.value.width*dimension) return -dimension * (characterCoords.value.x - (mapSize.value.width - 1) / 2) + 'px' ;
      return (-mapSize.value.width*dimension/4) -dimension * (characterCoords.value.x - (mapSize.value.width - 1) / 2) + 'px';
    });

    const moveBoard = computed (() => `transform: translate(${translateValue.value}, ${ -dimension * (characterCoords.value.y - (mapSize.value.height - 1) / 2) + 'px'})`
    );

    const mapURL = ref({
        'background-image': `url(${require('../assets/' + mapName)})`,
    });

    const mapDimension = ref(`height: ${(mapSize.value.height * dimension) + 'px'}; width: ${(mapSize.value.width * dimension) + 'px'}`);

    const navigationTop = ref(`top: ${(mapSize.value.height * dimension) + 'px'};`);

    const changeMap = (mapName: string, isButtonClicked: boolean): void => {
      if (!isButtonClicked) {
        chosenMap.value = mapName;

        mapSize.value = {width: map.value.mapSize.width, height: map.value.mapSize.height};
        characterCoords.value = {x: map.value.startingCharacterCoords.x, y: map.value.startingCharacterCoords.y};
        mapElements.value = map.value.mapElements;
        mapElements.value.forEach((element :MapElement) => {
          element.calculatedWidth = element.width * dimension;
          element.calculatedHeight = element.height * dimension;
        })

        entrance = map.value.entrance;
        obstacle = map.value.obstacle;
        mapName = map.value.mapName;

        mapURL.value = {
          'background-image': `url(${require('../assets/' + mapName)})`
        }
        mapDimension.value = (`height: ${(mapSize.value.height * dimension) + 'px'}; width: ${(mapSize.value.width * dimension) + 'px'}`);

        if(board.value) board.value.focus();
        setTimeout(() => {
          isElevatorView.value = false
        }, 1500);
      }
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
      mapDimension,
      navigationTop,
      interact,
      changeMap
    }
  }
});
</script>


<style lang="scss">
  @import '../variables/variables.scss';

  .box {
    position: relative;
    display:flex;
    justify-content: center;
    overflow-y: hidden;
  }

  .board {
    display: flex;
    justify-content: center;
    background-position: center;
    background-repeat: no-repeat;
    transition: transform $animationSpeed ease-in-out;
    margin: 0 auto;

    &-wrapper {
      width: 90vw;
      overflow: hidden;
    }
  }
  
  .navigation{
    position: fixed;
    left: 0;
    margin: 0 0 10px 10px;
    display: flex;

    &__row{
      display:flex;
      justify-content: center;
    }
    
  }

  .object-higher {
    z-index: 60;
  }

  .object-lower {
    z-index: 40;
  }

  .mb-10{
    margin-bottom: 10px;
  }
</style>