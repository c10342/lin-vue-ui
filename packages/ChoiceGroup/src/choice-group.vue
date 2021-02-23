<template>
  <div class="lin-choice-group" ref="choiceGroup">
    <div
      ref="choiceGroupInput"
      :class="[
        { 'lin-choice-group-disabled': disabled },
        'lin-choice-group-input-container',
      ]"
      @mouseleave="onMouseLeave"
      @mouseenter="onMouseEnter"
    >
      <input
        @keyup="onInputChange"
        @click="onClick"
        @blur="onBlur"
        @focus="onFocus"
        :readonly="!filterable"
        :placeholder="placeholder || t('LinViewUI.Choice.placeholder')"
        class="lin-choice-group-input"
        type="text"
        :value="innerValue"
      />
      <i
        :class="[
          { 'lin-choice-group-icon-up': isShow },
          'lin-icon-down',
          'lin-choice-group-down-icon',
          'lin-choice-group-icon',
        ]"
        v-if="!showCloseIcon"
      ></i>
      <i
        class="lin-icon-close lin-choice-group-icon lin-choice-group-close-icon"
        v-if="showCloseIcon"
        @click="clearValue"
      ></i>
    </div>
    <transition name="lin-choice-group-fade">
      <div
        :style="{ top }"
        :class="[
          'lin-choice-container-wrapper',
          { 'lin-choice-container-wrapper-up': !isDown },
          { 'lin-choice-container-wrapper-down': isDown },
        ]"
        v-show="isShow"
      >
        <div class="lin-choice-search-wrapper" v-if="showSearchInput">
          <lin-input
            v-model="searchKey"
            :placeholder="
              searchPlaceholder || t('LinViewUI.Choice.searchPlaceholder')
            "
            @keyup.native.enter="onSearch"
          >
            <i class="lin-icon-search" @click.stop="onSearch"></i>
          </lin-input>
        </div>
        <div
          ref="scrollContainer"
          class="lin-choice-container"
          @scroll.stop="onScroll"
        >
          <div ref="scrollContent">
            <slot></slot>
            <div
              class="lin-choice-group-empty"
              v-if="!$slots.default || noData"
            >
              <slot name="empty">
                <p class="lin-choice-group-empty-tip">
                  {{ emptyTip || t("LinViewUI.Choice.emptyTip") }}
                </p>
              </slot>
            </div>
          </div>
          <div class="lin-choice-loading-wrapper" v-show="loading">
            <slot name="loading">
              <span class="lin-choice-loading"></span>
              <span class="lin-choice-loading-tip" v-if="loadingTip">
                {{ loadingTip }}
              </span>
            </slot>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import {
  Vue,
  Component,
  Prop,
  ProvideReactive,
  Watch
} from 'vue-property-decorator';
import LocaleMixin from 'src/mixins/locale';
import documentClick from 'src/mixins/documentClick';
import findChildren from 'src/utils/findChildren';
import Input from 'packages/Input/index';

@Component({
  name: 'LinChoiceGroup',
  mixins: [LocaleMixin, documentClick],
  components: {
    [Input.name]: Input
  }
})
export default class LinChoiceGroup extends Vue {
  @Prop({ type: String })
  placeholder!: string;

  @Prop({ type: [Object, String, Number] })
  value!: Record<string, any> | string | number;

  @Prop({ type: String, default: '' })
  valueKey!: string;

  @Prop({ type: Boolean, default: false })
  clearable!: boolean;

  @Prop({ type: Boolean, default: false })
  disabled!: boolean;

  @Prop({ type: Boolean, default: true })
  isThrottle!: boolean;

  @Prop({ type: Boolean, default: false })
  scroll!: boolean;

  @Prop({ type: Number, default: 500 })
  time!: number;

  @Prop({ type: Boolean, default: false })
  loading!: boolean;

  @Prop({ type: String, default: '' })
  loadingTip!: string;

  @Prop({ type: String })
  emptyTip!: string;

  @Prop({ type: Boolean, default: false })
  finishLoading!: boolean;

  @Prop({ type: [String, Number], default: '' })
  defaultLabelName!: string | number;

  @Prop({ type: Boolean, default: false })
  showSearchInput!: boolean;

  @Prop({ type: String, default: '' })
  searchPlaceholder!: string;

  @Prop({ type: Boolean, default: false })
  filterable!: boolean;

  @Prop({ type: Function, default: '' })
  filterMethod!: (data: any) => boolean;

  @ProvideReactive()
  group = this;

  groupLabel = '';

  isShow = false;

  isHover = false;

  isDown = true;

  top = '0';

  searchKey = '';

  inputValue = '';

  noData = false;

  isSearch = false;

  timer: number | null = null;

  lock = false;

  lockTimer: number | null = null;

  get showCloseIcon () {
    return this.clearable && this.isHover && this.value && !this.disabled;
  }

  get innerValue () {
    if (this.isSearch) {
      return this.inputValue;
    }
    return this.groupLabel || this.defaultLabelName;
  }

  @Watch('loading')
  onLoadingChange (newVal) {
    if (newVal) {
      this.lock = true;
    } else {
      if (this.lockTimer) {
        clearTimeout(this.lockTimer);
      }
      this.lockTimer = window.setTimeout(() => {
        this.lock = false;
      }, 500);
    }
  }

  mounted () {
    this.setPlacement();
  }

  beforeDestroy () {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    if (this.lockTimer) {
      clearTimeout(this.lockTimer);
    }
  }

  setPlacement () {
    this.$nextTick(() => {
      // const { scrollContainer } = this.$refs;
      const scrollContainer = this.$refs.scrollContainer as HTMLElement;
      // const { choiceGroup } = this.$refs;
      const choiceGroup = this.$refs.choiceGroup as HTMLElement;
      const bottom =
        window.innerHeight - choiceGroup.getBoundingClientRect().bottom;
      const { top } = choiceGroup.getBoundingClientRect();
      if (bottom > scrollContainer.clientHeight) {
        this.setDownTop();
      } else if (top > scrollContainer.clientHeight) {
        this.setUpTop();
      } else {
        this.setDownTop();
      }
    });
  }

  setDownTop () {
    this.isDown = true;
    // const { choiceGroupInput } = this.$refs;
    const choiceGroupInput = this.$refs.choiceGroupInput as HTMLElement;
    this.top = `${choiceGroupInput.clientHeight + 8}px`;
  }

  setUpTop () {
    this.isDown = false;
    // const { scrollContainer } = this.$refs;
    const scrollContainer = this.$refs.scrollContainer as HTMLElement;
    this.top = `${-(scrollContainer.clientHeight + 10)}px`;
  }

  onScroll (event) {
    if (!this.scroll || this.loading || this.lock || this.finishLoading) {
      return;
    }
    if (this.isThrottle) {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = window.setTimeout(() => {
        this.handleScroll(event);
      }, this.time);
    } else {
      this.handleScroll(event);
    }
  }

  handleScroll (event) {
    const { scrollTop } = event.target;
    const height = (this.$refs.scrollContainer as HTMLElement).clientHeight;
    const contentHeight = (this.$refs.scrollContent as HTMLElement)
      .clientHeight;
    if (scrollTop + height >= contentHeight) {
      this.$emit('scrollToBottom', event);
    }
  }

  onMouseLeave () {
    this.isHover = false;
  }

  onMouseEnter () {
    this.isHover = true;
  }

  onBlur (event) {
    this.$emit('blur', event);
  }

  onFocus (event) {
    this.$emit('focus', event);
  }

  onClick () {
    if (this.disabled) {
      return;
    }
    if (this.isShow) {
      this.hideVisible();
    } else {
      this.showVisible();
    }
  }

  clearValue () {
    this.groupLabel = '';
    this.emitInputEvent('');
    this.$emit('clear');
  }

  emitInputEvent (value) {
    this.$emit('input', value);
    this.$emit('change', value);
    this.hideVisible();
  }

  hideVisible () {
    if (this.isShow) {
      this.isShow = false;
      this.isSearch = false;
      this.$emit('visible-change', false);
    }
  }

  showVisible () {
    if (!this.isShow) {
      this.isShow = true;
      this.setPlacement();
      this.inputValue = '';
      this.noData = false;
      this.$emit('visible-change', true);
    }
  }

  onDocumentClick (event) {
    // const { choiceGroup } = this.$refs;
    const choiceGroup = this.$refs.choiceGroup as HTMLElement;
    if (!choiceGroup.contains(event.target)) {
      this.hideVisible();
    }
  }

  onSearch () {
    this.$emit('search', this.searchKey);
  }

  onInputChange (event) {
    this.isSearch = true;
    this.inputValue = event.currentTarget.value;
    this.$nextTick(() => {
      const children = findChildren(this, 'LinChoiceItem');
      this.noData = children.every((child) => !child.isShow);
    });
  }
}
</script>
