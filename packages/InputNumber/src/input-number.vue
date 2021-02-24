<template>
  <div
    class="lin-input-number"
    :class="{ 'lin-input-number-disabled': disabled }"
  >
    <span
      class="lin-input-number-reduce lin-input-number-btn"
      :class="{ 'lin-input-number-btn-disabled': disabledReduce }"
      @click="reduce"
      >-</span
    >
    <input
      :disabled="disabled"
      :value="value"
      class="lin-input-number-text"
      type="text"
      @blur="onBlur"
    />
    <span
      class="lin-input-number-plus lin-input-number-btn"
      :class="{ 'lin-input-number-btn-disabled': disabledPlus }"
      @click="plus"
      >+</span
    >
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import dispatch from 'src/utils/dispatch';

@Component({
  name: 'LinInputNumber'
})
export default class LinInputNumber extends Vue {
  @Prop({ type: [Number, String] })
  value!: number | string;

  @Prop({ type: Number, default: NaN })
  min!: number;

  @Prop({ type: Number, default: NaN })
  max!: number;

  @Prop({ type: Number, default: 1 })
  step!: number;

  @Prop({ type: Boolean, default: false })
  disabled!: boolean;

  @Prop({ type: String, default: '' })
  placeholder!: string;

  @Prop({ type: Boolean, default: false })
  stepStrictly!: boolean;

  get disabledReduce () {
    if (this.disabled) {
      return true;
    }
    if (Number.isNaN(this.min)) {
      return false;
    }
    if (this.value === '' || this.value === null || this.value === undefined) {
      return false;
    }
    if (this.value <= this.min) {
      return true;
    }
    return false;
  }

  get disabledPlus () {
    if (this.disabled) {
      return true;
    }
    if (Number.isNaN(this.max)) {
      return false;
    }
    if (this.value === '' || this.value === null || this.value === undefined) {
      return false;
    }
    if (this.value >= this.max) {
      return true;
    }
    return false;
  }

  reduce () {
    if (this.disabledReduce) {
      return;
    }
    const value = (this.value as number) * 1 - this.step;
    this.emitInputEvent(value);
    this.$emit('reduce', value);
  }

  plus () {
    if (this.disabledPlus) {
      return;
    }
    const value = (this.value as number) * 1 + this.step;
    this.emitInputEvent(value);
    this.$emit('plus', value);
  }

  onBlur (e) {
    let value = e.target.value * 1;
    if (this.stepStrictly) {
      if (!Number.isNaN(this.min) && value < this.min) {
        value = this.min + (this.step - (this.min % this.step));
      } else if (!Number.isNaN(this.max) && value > this.max) {
        value = this.max - (this.min % this.step);
      } else {
        value -= value % this.step;
      }
    } else if (!Number.isNaN(this.min) && value < this.min) {
      value = this.min;
    } else if (!Number.isNaN(this.max) && value > this.max) {
      value = this.max;
    }
    this.emitInputEvent(value);
  }

  emitInputEvent (value) {
    this.$emit('input', value);
    dispatch(this, {
      eventName: 'validate',
      componentName: 'LinFormItem'
    });
  }
}
</script>
