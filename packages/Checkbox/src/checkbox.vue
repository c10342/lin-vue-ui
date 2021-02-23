<template>
  <label
    class="lin-checkbox"
    :class="{
      'lin-checkbox-is-checked': isChecked,
      'lin-checkbox-is-disabled': isDisabled,
    }"
  >
    <span class="lin-checkbox-input">
      <span class="lin-checkbox-inner"></span>
      <input
        type="checkbox"
        class="lin-checkbox-original"
        :name="name"
        v-model="model"
        :value="label"
        :disabled="isDisabled"
      />
    </span>
    <span class="lin-checkbox-label">
      <slot></slot>
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>

<script lang="ts">
import { Vue, Component, InjectReactive, Prop } from 'vue-property-decorator';
import dispatch from 'src/utils/dispatch';
import { CheckboxGroupItem } from './type';

@Component({
  name: 'LinCheckbox'
})
export default class LinCheckbox extends Vue {
  @Prop({ type: Boolean, default: false })
  value!: boolean;

  @Prop({ type: String, default: '' })
  name!: string;

  @Prop({ type: String, default: '' })
  label!: string;

  @Prop({ type: Boolean, default: false })
  disabled!: boolean;

  @InjectReactive('CheckboxGroup')
  CheckboxGroup!: CheckboxGroupItem ;

  mounted () {
    console.log('mounted', this.CheckboxGroup);
  }

  get isGroup () {
    return !!this.CheckboxGroup;
  }

  get model () {
    return this.CheckboxGroup ? this.CheckboxGroup.value : this.value;
  }

  set model (value) {
    if (this.isGroup) {
      this.CheckboxGroup?.$emit('input', value);
    } else {
      this.$emit('input', value);
    }
    dispatch(this, {
      eventName: 'validate',
      componentName: 'LinFormItem'
    });
  }

  get isChecked () {
    // 如果是group包裹，判断 label是否在model中
    // 如果没有group包裹，直接使用model
    return this.isGroup ? (this.model as any[]).includes(this.label) : this.model;
  }

  get isDisabled () {
    if (this.isGroup) {
      if (this.CheckboxGroup?.disabled) {
        return true;
      }
    }
    return this.disabled;
  }
}
</script>
