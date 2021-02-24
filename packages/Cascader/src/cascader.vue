<template>
  <div class="lin-cascader" ref="notOutsideContainer">
    <div
      ref="boxContainer"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
      @click="onInputClick"
    >
      <lin-input
        @blur="onBlur"
        @focus="onFocus"
        :value="text"
        :placeholder="myPlaceholder"
        readonly
        class="lin-cascader-input"
      >
        <i class="lin-icon-down" v-if="!showClose && !showPopup"></i>
        <i class="lin-icon-up" v-if="!showClose && showPopup"></i>
        <i class="lin-icon-close" v-if="showClose" @click.stop="clearValue"></i>
      </lin-input>
    </div>
    <transition name="lin-cascader-fade">
      <div
        ref="popupContainer"
        :class="[
          'lin-cascader-popup',
          { 'lin-cascader-popup-up': !isDown },
          ,
          { 'lin-cascader-popup-down': isDown },
        ]"
        v-show="showPopup"
        :style="{ top }"
      >
        <div class="lin-panel-wrapper" v-if="myOptions.length !== 0">
          <lin-panel :options="myOptions" />
        </div>
        <div class="lin-panel-wrapper" v-if="myOptions.length === 0">
          <div class="lin-panel-empty" @click="hidePuop">
            <slot name="empty">
              {{ myEmptyTip }}
            </slot>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Mixins } from 'vue-property-decorator';
import { OptionsItem, ShowFormat, LazyLoad, OptionsListItem } from './type';
import Input from 'packages/Input/index.js';
import DocumentClickMixin from 'src/mixins/documentClick';
import LocaleMixin from 'src/mixins/locale';
import Panel from './panel.vue';

@Component({
  name: 'LinCascader',
  components: {
    [Input.name]: Input,
    [Panel.name]: Panel
  },
  provide () {
    return {
      cascaderInstance: this
    };
  }
})
export default class LinCascader extends Mixins(DocumentClickMixin, LocaleMixin) {
  @Prop({ type: Array, default: () => [] })
  options!: Array<OptionsItem>;

  @Prop({ type: Function })
  showFormat!: ShowFormat;

  @Prop({ type: Array, default: null })
  value!: Array<string>;

  @Prop({ type: Boolean, default: false })
  clearable!: boolean;

  @Prop({ type: String })
  placeholder!: string;

  @Prop({ type: Boolean, default: false })
  lazy!: boolean;

  @Prop({ type: Function })
  lazyLoad!: LazyLoad;

  @Prop({ type: String, default: '/' })
  separator!: string;

  @Prop({ type: String, default: 'label' })
  label!: string;

  @Prop({ type: String, default: 'children' })
  children!: string;

  @Prop({ type: String, default: 'leaf' })
  leaf!: string;

  @Prop({ type: String, default: 'disabled' })
  disabled!: string;

  @Prop({ type: String, default: 'id' })
  valueKey!: string;

  @Prop({ type: String })
  emptyTip!: string;

  myValueArr:any = [];

  showPopup = false;

  isHover = false;

  optionsList:OptionsListItem[] = [];

  top:string|number = 0;

  isDown = false;

  get valueArr () {
    if (this.value !== null) {
      if (Array.isArray(this.value)) {
        return this.value;
      }
      // this.emitInputEvent([]);
      return [];
    }

    return this.myValueArr || [];
  }

  set valueArr (val) {
    if (this.value !== null) {
      this.emitInputEvent(val);
    } else {
      this.myValueArr = val;
    }
  }

  get text () {
    if (this.showFormat) {
      return this.showFormat(this.valueArr);
    }
    if (this.valueArr && this.valueArr.length > 0) {
      let str = '';
      this.valueArr.forEach((item) => {
        str += `${item[this.label]} ${this.separator} `;
      });
      return str.slice(0, -2);
    }
    return '';
  }

  get showClose () {
    return (
      this.clearable &&
      this.isHover &&
      this.valueArr &&
      this.valueArr.length !== 0
    );
  }

  get myPlaceholder () {
    if (this.placeholder) {
      return this.placeholder;
    }
    return this.t('LinViewUI.Cascader.placeholder');
  }

  get myEmptyTip () {
    if (this.emptyTip) {
      return this.emptyTip;
    }
    return this.t('LinViewUI.Cascader.emptyTip');
  }

  get myOptions () {
    if (this.lazy && this.lazyLoad) {
      return this.optionsList;
    }
    return this.options;
  }

  async created () {
    if (this.lazy && this.lazyLoad) {
      this.optionsList = await this.lazyLoad({ level: 0 });
    }
  }

  setPlacement () {
    this.$nextTick(() => {
      // const { popupContainer } = this.$refs;
      const popupContainer = this.$refs.popupContainer as HTMLElement;
      const container = this.$refs.notOutsideContainer as HTMLElement;
      const bottom =
        window.innerHeight - container.getBoundingClientRect().bottom;
      const { top } = container.getBoundingClientRect();
      if (bottom > popupContainer.clientHeight) {
        this.setDownTop();
      } else if (top > popupContainer.clientHeight) {
        this.setUpTop();
      } else {
        this.setDownTop();
      }
    });
  }

  setDownTop () {
    this.isDown = true;
    // const { boxContainer } = this.$refs;
    const boxContainer = this.$refs.boxContainer as HTMLElement;
    this.top = `${boxContainer.clientHeight + 10}px`;
  }

  setUpTop () {
    this.isDown = false;
    // const { popupContainer } = this.$refs;
    const popupContainer = this.$refs.popupContainer as HTMLElement;
    this.top = `${-popupContainer.clientHeight - 10}px`;
  }

  onBlur (event) {
    this.$emit('blur', event);
  }

  onFocus (event) {
    this.$emit('focus', event);
  }

  clearValue () {
    this.valueArr = [];
    this.hidePuop();
  }

  onMouseEnter () {
    this.isHover = true;
  }

  onMouseLeave () {
    this.isHover = false;
  }

  setValue (data, level) {
    let { valueArr } = this;
    valueArr = valueArr.slice(0, level);
    valueArr.push(data);
    this.valueArr = valueArr;
    this.$emit('change', { data, level });
  }

  onInputClick () {
    if (this.showPopup) {
      this.hidePuop();
    } else {
      this.displayPuop();
    }
  }

  displayPuop () {
    this.showPopup = true;
    this.$children.forEach((child) => {
      if (child.$options.name === 'LinPanel') {
        child.$emit('displayPuop', this.valueArr);
      }
    });
    this.setPlacement();
    this.$emit('visible-change', true);
  }

  hidePuop () {
    this.showPopup = false;
    this.$emit('visible-change', false);
  }

  emitInputEvent (val) {
    this.$emit('input', val);
  }

  onDocumentClick (event) {
    // const { notOutsideContainer } = this.$refs;
    const notOutsideContainer = this.$refs.notOutsideContainer as HTMLElement;
    if (!notOutsideContainer.contains(event.target)) {
      this.hidePuop();
    }
  }
}
</script>
