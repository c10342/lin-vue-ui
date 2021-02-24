<template>
  <div
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @click.stop
    class="lin-dropdown"
    ref="notOutsideContainer"
  >
    <div class="lin-dropdown-label" @click="onLabelClick" ref="dropdownLabel">
      <slot></slot>
    </div>
    <transition name="lin-dropdown-fade">
      <div
        v-show="isShow"
        :class="[
          'lin-dropdown-container',
          { 'lin-dropdown-container-down': isDown },
          { 'lin-dropdown-container-up': !isDown },
        ]"
        :style="{ top }"
        ref="dropdownContainer"
      >
        <slot name="dropdown"></slot>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Prop } from 'vue-property-decorator';
import DocumentClickMixin from 'src/mixins/documentClick';

@Component({
  name: 'LinDropdown',
  provide () {
    return {
      dropdown: this
    };
  }
})
export default class LinDropdown extends Mixins(DocumentClickMixin) {
  @Prop({ type: String, default: 'hover' })
  trigger!: string;

  @Prop({ type: Boolean, default: true })
  hideOnClick!: boolean;

  isShow = false;

  top = '0';

  isDown = true;

  mounted () {
    this.setPlacement();
  }

  onMouseEnter () {
    if (this.trigger === 'hover') {
      this.showList();
    }
  }

  onMouseLeave () {
    if (this.trigger === 'hover') {
      this.hideList();
    }
  }

  onLabelClick () {
    if (this.trigger === 'click') {
      this.toggleList();
    }
  }

  showList () {
    if (!this.isShow) {
      this.isShow = true;
      this.setPlacement();
      this.$emit('visible-change', true);
    }
  }

  setDownTop () {
    this.isDown = true;
    // const { dropdownLabel } = this.$refs;
    const dropdownLabel = this.$refs.dropdownLabel as HTMLElement;
    this.top = `${dropdownLabel.clientHeight + 8}px`;
  }

  setUpTop () {
    this.isDown = false;
    // const { dropdownContainer } = this.$refs;
    const dropdownContainer = this.$refs.dropdownContainer as HTMLElement;
    this.top = `${-(dropdownContainer.clientHeight + 10)}px`;
  }

  setPlacement () {
    this.$nextTick(() => {
      // const { dropdownContainer } = this.$refs;
      // const { notOutsideContainer } = this.$refs;
      const dropdownContainer = this.$refs.dropdownContainer as HTMLElement;
      const notOutsideContainer = this.$refs.notOutsideContainer as HTMLElement;
      const bottom =
        window.innerHeight - notOutsideContainer.getBoundingClientRect().bottom;
      const { top } = notOutsideContainer.getBoundingClientRect();
      if (bottom > dropdownContainer.clientHeight) {
        this.setDownTop();
      } else if (top > dropdownContainer.clientHeight) {
        this.setUpTop();
      } else {
        this.setDownTop();
      }
    });
  }

  hideList () {
    if (this.isShow) {
      this.isShow = false;
      this.$emit('visible-change', false);
    }
  }

  toggleList () {
    if (this.isShow) {
      this.hideList();
    } else {
      this.showList();
    }
  }

  onDocumentClick (event) {
    // const { notOutsideContainer } = this.$refs;
    const notOutsideContainer = this.$refs.notOutsideContainer as HTMLElement;
    if (!notOutsideContainer.contains(event.target)) {
      this.hideList();
    }
  }
}
</script>
