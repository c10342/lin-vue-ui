<template>
  <div
    v-show="isShow"
    @click="onItemClick"
    :class="[
      { 'lin-choice-item-active': itemValue === groupValue },
      { 'lin-choice-item-disabled': itemDisabled },
      'lin-choice-item',
    ]"
  >
    <slot>
      {{ itemLabel }}
    </slot>
  </div>
</template>

<script lang="ts">
import {
  Vue,
  Component,
  Prop,
  InjectReactive,
  Watch
} from 'vue-property-decorator';
import { GroupItem, OptionItem } from './type';

@Component({
  name: 'LinChoiceItem'
})
export default class LinChoiceItem extends Vue {
  @Prop({ type: String, default: '' })
  label!: string;

  @Prop({ type: [Object, String, Number] })
  value!: Record<string, any> | string | number;

  @Prop({ type: Boolean, default: false })
  disabled!: boolean;

  @InjectReactive('')
  group!: GroupItem;

  @InjectReactive('')
  option!: OptionItem;

  isShow = true;

  get itemDisabled () {
    if (this.option && this.option.disabled) {
      return true;
    }
    return this.disabled;
  }

  get itemValue () {
    const valueKey = this.group?.valueKey;
    if (valueKey && this.value) {
      return this.value[valueKey];
    }
    return this.value;
  }

  get groupValue () {
    const valueKey = this.group?.valueKey;
    const value = this.group?.value;
    if (valueKey && value) {
      return value[valueKey];
    }
    return value;
  }

  get itemLabel () {
    return this.label ? this.label : this.value;
  }

  get inputValue () {
    if (this.group) {
      return this.group.inputValue;
    }
    return '';
  }

  @Watch('groupValue', { immediate: true })
  onGroupValueChange (newVal) {
    if (this.itemValue === newVal && this.group) {
      this.group.groupLabel = this.itemLabel as string;
    }
  }

  @Watch('inputValue')
  onInputValueChange (newVal) {
    if (typeof newVal === 'string') {
      newVal = newVal.trim();
    }
    this.matchLabel(newVal);
  }

  onItemClick () {
    if (this.group && !this.itemDisabled) {
      this.group.emitInputEvent(this.value);
    }
  }

  matchLabel (value) {
    if (value === '') {
      this.isShow = true;
      return;
    }
    if (this.group && typeof this.group.filterMethod === 'function') {
      this.isShow = this.group.filterMethod(value, this.$props);
    } else {
      this.isShow = this.itemLabel.toString().includes(value);
    }
  }
}
</script>
