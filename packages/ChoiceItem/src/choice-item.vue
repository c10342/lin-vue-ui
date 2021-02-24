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
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

@Component({
  name: 'LinChoiceItem',
  inject: {
    ChoiceGroupInstance: {
      default: ''
    },
    ChoiceOptionInstance: {
      default: ''
    }
  }
})
export default class LinChoiceItem extends Vue {
  @Prop({ type: String, default: '' })
  label!: string;

  @Prop({ type: [Object, String, Number] })
  value!: string | number | Record<string, any>;

  @Prop({ type: Boolean, default: false })
  disabled!: boolean;

  isShow = true;

  get itemDisabled () {
    if (this.ChoiceOptionInstance && this.ChoiceOptionInstance.disabled) {
      return true;
    }
    return this.disabled;
  }

  get itemValue () {
    const valueKey = this.ChoiceGroupInstance?.valueKey;
    if (valueKey && this.value) {
      return this.value[valueKey];
    }
    return this.value;
  }

  get groupValue () {
    const valueKey = this.ChoiceGroupInstance?.valueKey;
    const value = this.ChoiceGroupInstance?.value;
    if (valueKey && value) {
      return value[valueKey];
    }
    return value;
  }

  get itemLabel ():string {
    return this.label ? this.label : (this.value as string);
  }

  get inputValue () {
    if (this.ChoiceGroupInstance) {
      return this.ChoiceGroupInstance.inputValue;
    }
    return '';
  }

  @Watch('groupValue', { immediate: true })
  onGroupValueChange (newVal) {
    if (this.itemValue === newVal && this.ChoiceGroupInstance) {
      this.ChoiceGroupInstance.groupLabel = this.itemLabel;
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
    if (this.ChoiceGroupInstance && !this.itemDisabled) {
      this.ChoiceGroupInstance.emitInputEvent(this.value);
    }
  }

  matchLabel (value) {
    if (value === '') {
      this.isShow = true;
      return;
    }
    if (this.ChoiceGroupInstance && typeof this.ChoiceGroupInstance.filterMethod === 'function') {
      this.isShow = this.ChoiceGroupInstance.filterMethod(value, this.$props);
    } else {
      this.isShow = this.itemLabel.toString().includes(value);
    }
  }
}
</script>
