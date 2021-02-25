<template>
  <div class="lin-magnifier">
    <div
      :style="smallStyle"
      ref="smallBox"
      class="lin-magnifier-small"
      @mousemove="onMousemove"
      @mouseout="onMouseout"
      @mouseover="onMouseover"
    >
      <slot name="small">
        <img :src="smallPic" alt />
      </slot>
      <div
        :style="moveStyle"
        ref="moveMask"
        v-show="showMoveMask"
        class="lin-magnifier-move-slot"
      >
        <slot name="move">
          <div
            :style="{ 'background-color': maskColor }"
            class="lin-magnifier-move"
          ></div>
        </slot>
      </div>
    </div>
    <div
      :style="bigBoxStyle"
      ref="bigBox"
      class="lin-magnifier-big"
      v-show="showBigImg"
    >
      <div :style="bigImgStyle" class="lin-magnifier-big-slot">
        <slot name="big">
          <img class="lin-magnifier-big-img" :src="bigPic" />
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref } from 'vue-property-decorator';

@Component({
  name: 'LinMagnifier'
})
export default class LinMagnifier extends Vue {
  // 添加了required: true后，明明穿了参数 但是报 Missing required prop，js写法就没问题，不知道是不是因为这个属性是动态的，所以才报错
  // @Prop({ type: String, required: true })
  // smallPic!: string;

  // @Prop({ type: String, required: true })
  // bigPic!: string;

  @Prop({ type: String })
  smallPic!: string;

  @Prop({ type: String })
  bigPic!: string;

  @Prop({
    type: Object,
    default: () => ({
      width: 0,
      height: 0
    })
  })
  smallStyle!: Record<string, any>;

  @Prop({
    type: Object,
    default: () => ({
      width: 0,
      height: 0
    })
  })
  bigStyle!: Record<string, any>;

  @Prop({ type: String })
  maskColor!: string;

  showMoveMask = false;
  showBigImg = false;
  moveStyle = { left: '0', top: '0' };
  bigImgStyle = { left: '0', top: '0' };

  @Ref('smallBox') smallBox!: HTMLElement;
  @Ref('moveMask') moveMask!: HTMLElement;
  @Ref('bigBox') bigBox!: HTMLElement;

  get bigBoxStyle () {
    return {
      ...this.bigStyle,
      left: `${parseFloat(this.smallStyle.width) + 10}px`
    };
  }

  // mounted() {
  //   this.smallBox = this.$refs.smallBox;
  //   this.moveMask = this.$refs.moveMask;
  //   this.bigBox = this.$refs.bigBox;
  // }

  onMouseover () {
    this.showMoveMask = true;
    this.showBigImg = true;
    this.$emit('show');
  }

  onMouseout () {
    this.showMoveMask = false;
    this.showBigImg = false;
    this.$emit('hide');
  }

  onMousemove (event) {
    const { smallBox } = this;
    const { moveMask } = this;
    const { bigBox } = this;
    let x =
      event.clientX -
      smallBox.getBoundingClientRect().left -
      moveMask.offsetWidth / 2;

    let y =
      event.clientY -
      smallBox.getBoundingClientRect().top -
      moveMask.offsetHeight / 2;
    if (x < 0) {
      x = 0;
    } else if (x > smallBox.offsetWidth - moveMask.offsetWidth) {
      x = smallBox.offsetWidth - moveMask.offsetWidth;
    }
    if (y < 0) {
      y = 0;
    } else if (y > smallBox.offsetHeight - moveMask.offsetHeight) {
      y = smallBox.offsetHeight - moveMask.offsetHeight;
    }

    this.moveStyle = {
      left: `${x}px`,
      top: `${y}px`
    };
    this.bigImgStyle = {
      left: `${(-x * bigBox.offsetWidth) / smallBox.offsetWidth}px`,
      top: `${(-y * bigBox.offsetHeight) / smallBox.offsetHeight}px`
    };

    this.$emit('move', event);
  }
}
</script>
