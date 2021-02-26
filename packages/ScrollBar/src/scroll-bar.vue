<template>
  <div
    :style="{ ...style, width: width }"
    class="lin-scroll-bar"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <div
      @scroll="onWrapperScroll"
      class="lin-scroll-bar-wrapper"
      ref="wrapper"
      :style="style"
    >
      <div class="lin-scroll-bar-content" ref="content">
        <slot></slot>
        <div class="lin-scroll-bar-spinner" v-if="loading">
          <slot name="loading">
            <lin-spinner :text="loadingText" :size="loadingSize" />
          </slot>
        </div>
      </div>
    </div>
    <div
      class="lin-srcoll-bar-barwrapper"
      v-if="showBar"
      @click="onBarWrapperClick"
    >
      <div
        v-show="hoverBar || hover"
        @mousedown="onMouseDown"
        ref="bar"
        class="lin-srcoll-bar-bar"
        :style="{ height: `${barHeight}px`, top: `${barTop}px` }"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import ResizeObserver from 'resize-observer-polyfill';
import Spinner from 'packages/Spinner/index';

@Component({
  name: 'LinScrollBar',
  components: {
    [Spinner.name]: Spinner
  }
})
export default class LinScrollBar extends Vue {
  @Prop({ type: Boolean, default: false })
  hover!:boolean

  @Prop({ type: String, default: '100%' })
  height!:string

  @Prop({ type: String, default: '100%' })
  width!:string

  @Prop({ type: String })
  maxHeight!:string

  @Prop({ type: String })
  minHeight!:string

  @Prop({ type: Boolean, default: false })
  loading!:boolean

  @Prop({ type: String })
  loadingText!:string

  @Prop({ type: String })
  loadingSize!:string

  barHeight= 0
      barTop= 0
      showBar= false
      hoverBar= false

      wrapperHeight = 0;
    contentHeight = 0;
    barWrapperHeight = 0;
    startY = 0;
    observer:ResizeObserver|null = null;
    isMove = false;
    isLeave = false;

    get style () {
      const style:{height?:string, 'max-height'?:string, 'min-height'?:string} = {};
      if (this.height) {
        style.height = this.height;
      }
      if (this.maxHeight) {
        style['max-height'] = this.maxHeight;
      }
      if (this.minHeight) {
        style['min-height'] = this.minHeight;
      }
      return style;
    }

    mounted () {
      this.init();
      this.initObserver();
    }

    beforeDestroy () {
      if (this.observer) {
        this.observer.disconnect();
        this.observer = null;
      }
      document.removeEventListener('mousemove', this.onMousemove);
      document.removeEventListener('mouseup', this.onMouseup);
    }

    initObserver () {
      this.observer = new ResizeObserver(() => {
        this.init();
      });

      this.observer.observe(this.$refs.content as HTMLElement);
    }

    init () {
      this.initDom();
      this.initBar();
    }

    initDom () {
      this.wrapperHeight = (this.$refs.wrapper as HTMLElement).clientHeight;
      this.contentHeight = (this.$refs.content as HTMLElement).clientHeight;
    }

    initBar () {
      const { wrapperHeight } = this;
      const { contentHeight } = this;
      // 求 滚动条的高度
      if (wrapperHeight / contentHeight < 1) {
        this.barHeight = (wrapperHeight / contentHeight) * wrapperHeight;
        this.showBar = true;
      } else {
        this.showBar = false;
      }
      if (this.showBar) {
        const { scrollTop } = this.$refs.wrapper as HTMLElement;
        const percent = scrollTop / contentHeight;
        const barTop = percent * wrapperHeight;
        this.barTop = barTop;
      }
    }

    onWrapperScroll (event) {
      const { contentHeight } = this;
      const { wrapperHeight } = this;
      const { scrollTop } = event.target;
      const percent = scrollTop / (contentHeight - wrapperHeight);
      const barTop = percent * (wrapperHeight - this.barHeight);
      this.barTop = barTop;
      this.$emit('scroll', event);
      if (scrollTop + wrapperHeight >= contentHeight) {
        this.$emit('scrollToBottom', event);
      }
    }

    onMouseDown (event) {
      this.isMove = true;
      document.getElementsByTagName('body')[0].classList.add('user-no-select');
      this.startY = event.clientY;
      document.addEventListener('mousemove', this.onMousemove);
      document.addEventListener('mouseup', this.onMouseup);
    }

    onMousemove (event) {
      // 纵轴坐标
      const topY = event.clientY - this.startY;
      const barTop = (this.$refs.bar as HTMLElement).offsetTop + topY;
      this.updatePosition(barTop);
      this.startY = event.clientY;
    }

    onMouseup () {
      this.isMove = false;
      if (this.isLeave) {
        this.hoverBar = false;
      }
      document
        .getElementsByTagName('body')[0]
        .classList.remove('user-no-select');
      document.removeEventListener('mousemove', this.onMousemove);
      document.removeEventListener('mouseup', this.onMouseup);
    }

    updatePosition (barTop) {
      const { wrapperHeight } = this;
      const { contentHeight } = this;
      const barHeight = (this.$refs.bar as HTMLElement).clientHeight;
      if (barTop >= wrapperHeight - barHeight) {
        barTop = wrapperHeight - barHeight;
      }
      if (barTop <= 0) {
        barTop = 0;
      }
      this.barTop = barTop;
      const percent = barTop / wrapperHeight;
      const contentTop = percent * contentHeight;
      (this.$refs.wrapper as HTMLElement).scrollTop = contentTop;
    }

    onMouseEnter () {
      this.hoverBar = true;
      this.isLeave = false;
    }

    onMouseLeave () {
      this.isLeave = true;
      if (!this.isMove) {
        this.hoverBar = false;
      }
    }

    onBarWrapperClick (event) {
      const { clientY } = event;
      const marginTop = (this.$refs.wrapper as HTMLElement).getBoundingClientRect().top;
      this.updatePosition(clientY - marginTop - this.barHeight / 2);
    }
}
</script>
