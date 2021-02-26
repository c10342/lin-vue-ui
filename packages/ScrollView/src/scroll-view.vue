<template>
  <div
    class="lin-scroll-view"
    :style="{ height: `${height}px` }"
    @scroll="onScroll"
  >
    <div ref="lScrollViewContent">
      <div class="lin-scroll-view-content">
        <slot />
      </div>
      <slot name="loading" v-if="isShowLoading">
        <div class="lin-scroll-view-loading">
          <span class="lin-scroll-view-icon"></span>
          <span class="lin-scroll-view-tip">{{ loadingTip }}</span>
        </div>
      </slot>
      <slot name="no-more" v-if="isShowNoMoreTip">
        <p class="lin-scroll-view-nomore-tip">{{ noMoreTip }}</p>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

@Component({
  name: 'LinScrollView'
})
export default class LinScrollView extends Vue {
  @Prop({ type: Number, default: 700 })
  height!: number;

  @Prop({ type: Boolean, default: true })
  isThrottle!: boolean;

  @Prop({ type: Number, default: 500 })
  time!: number;

  @Prop({ type: Boolean, default: false })
  isEnd!: boolean;

  @Prop({ type: Boolean, default: true })
  showLoading!: boolean;

  @Prop({ type: Boolean, default: true })
  emitScrollEvent!: boolean;

  @Prop({ type: [Object, Array] })
  data!: Record<string, any> | any[];

  @Prop({ type: String, default: '' })
  loadingTip!: string;

  @Prop({ type: String, default: '' })
  noMoreTip!: string;

  contentHeight = 0;

  timer: number | null = null;

  get isShowLoading () {
    if (this.contentHeight <= this.height) {
      return false;
    }
    if (this.showLoading && !this.isEnd) {
      return true;
    }
    return false;
  }

  get isShowNoMoreTip () {
    if (this.contentHeight <= this.height) {
      return false;
    }
    if (this.isEnd && (this.noMoreTip || this.$slots['no-more'])) {
      return true;
    }
    return false;
  }

  @Watch('data')
  onDataChange () {
    if (this.$refs.lScrollViewContent) {
      this.contentHeight = (this.$refs
        .lScrollViewContent as HTMLElement).clientHeight;
    } else {
      this.contentHeight = 0;
    }
  }

  mounted () {
    // this.timer = null;
    this.$nextTick(() => {
      if (this.$refs.lScrollViewContent) {
        this.contentHeight = (this.$refs
          .lScrollViewContent as HTMLElement).clientHeight;
      }
    });
  }

  beforeDestroy () {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  onScroll (e) {
    if (this.isThrottle) {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = window.setTimeout(() => {
        this.handelScroll(e);
      }, this.time);
    } else {
      this.handelScroll(e);
    }
  }

  handelScroll (e) {
    if (!this.isEnd) {
      const { scrollTop } = e.target;
      if (scrollTop + this.height >= this.contentHeight) {
        this.$emit('scrollToEnd', e);
      }
    }
    if (this.emitScrollEvent) {
      this.$emit('scroll', e);
    }
  }
}
</script>
