<template>
    <div 
        v-for="(item, i) in mapElements" 
        :key="i"
        :style="spriteBoxStyle[i]" 
        :class="{
          'object-higher': item.isObjectHigher,
          'object-lower': !item.isObjectHigher,
        }"
      >
        <img 
          :class="item.animationClass" 
          :src="require('../assets/' + item.fileName)" 
          :alt="item.alt"
        >
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, toRefs } from 'vue';
import { MapElements, SpriteBoxStyle, MapSize } from '@/types';
import { dimension, animationSpeed } from '@/variables/variables';

export default defineComponent({
    name: 'MapElements',
    props: {
        mapElements: {
            type: Array as PropType<MapElements>,
            required: true,
        },
        mapSize: {
            type: Object as PropType<MapSize>,
            required: true,
        },
    },
    setup(props) {
        const { mapElements, mapSize } = toRefs(props);

        const spriteBoxStyle: SpriteBoxStyle = [];
    
        mapElements.value.forEach(element => {
            spriteBoxStyle.push({
                position: 'absolute',
                top: `calc(50% - ${((mapSize.value.height - 1) / 2 - element.y - element.yOffset) * dimension + 'px'})`,
                left: `calc(50% - ${((mapSize.value.width - 1) / 2 - element.x - element.xOffset) * dimension + 'px'})`,
                display: 'flex',
                'align-items': 'center',
                overflow: 'hidden',
                width: element.width + 'px',
                height: element.height + 'px',
                transform: 'translate(-50%,-50%)',
                transition: `transform ${animationSpeed / 1000 + 's'} ease-in-out`,
            })
        });

        return {
            spriteBoxStyle,
        }
    },
})
</script>

<style lang="scss" scoped>
@import '../variables/variables.scss';

.doors {

    &__spritesheet {
      &--opening {
        animation: closeDoor $animationSpeed steps(5);
        transform: translateX(-80%);
      }

      &--closing {
        animation: openDoor $animationSpeed steps(5);
        transform: translateX(0);
      }
    }
  }

  .quest-arrow {

    &__spritesheet {
      animation: animateArrow 1s infinite alternate ease-in-out;
    }
  }

  .animation-0_100-7 {
    animation: closeDoor $animationSpeed * 2.5 steps(7) infinite;
  }

  @keyframes closeDoor {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-100%);
    }
  }

  @keyframes openDoor {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes animateArrow {
    from {
      transform: translateY(-25%);
    }
    to {
      transform: translateY(25%);
    }
  }

</style>