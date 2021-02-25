<template>
  <div class="lin-progress">
    <div class="lin-progress-out" :style="outStyle">
      <div :class="['lin-progress-inner',{[`lin-progress-${type}`]:type}]" :style="innerStyle">
        <div class="lin-progress-inside-text" v-if="isShowInsideText">
          <slot name="text">
            <span class="lin-progress-inside-tip">{{textInside}}</span>
          </slot>
        </div>
      </div>
    </div>
    <div class="lin-progress-outside-text" v-if="isShowOutsideText">
      <slot>
        <span class="lin-progress-outside-tip">{{textOutside}}</span>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Style } from './type';

@Component({
  name: 'LinProgress'
})
export default class LinProgress extends Vue {
  @Prop({ type: Number, default: 0 })
  percent!:number

  @Prop({ type: String, default: '' })
  innerColor!:string

  @Prop({ type: String, default: '' })
  outColor!:string

  @Prop({ type: Number, default: 10 })
  height!:number

  @Prop({ type: Boolean, default: true })
  radius!:boolean

  @Prop({ type: String, default: '' })
  textOutside!:string

  @Prop({ type: String, default: 'primary' })
  type!:string

  @Prop({ type: String, default: '' })
  textInside!:string

  get width () {
    if (this.percent < 0) {
      return '0%';
    }
    if (this.percent > 1) {
      return '100%';
    }
    return `${this.percent * 100}%`;
  }

  get innerStyle () {
    const style:Style = {
      width: this.width
    };
    if (this.innerColor) {
      style.backgroundColor = this.innerColor;
    }

    if (this.radius) {
      style.borderRadius = `${this.height / 2}px`;
    }

    return style;
  }

  get outStyle () {
    const style:Style = {};
    if (this.outColor) {
      style.backgroundColor = this.outColor;
    }
    if (this.height) {
      style.height = `${this.height}px`;
    }
    if (this.radius) {
      style.borderRadius = `${this.height / 2}px`;
    }

    return style;
  }

  get isShowOutsideText () {
    if (this.textOutside || this.$slots.default) {
      return true;
    }
    return false;
  }

  get isShowInsideText () {
    if (this.textInside || this.$slots.text) {
      return true;
    }

    return false;
  }
}
</script>
