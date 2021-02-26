<template>
  <div
    class="lin-selecotr-item"
    :class="{'lin-selecotr-active':active,'lin-selecotr-disabled':isDisabled}"
    @click="onClick"
  >
    <slot>{{label}}</slot>
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'LinSelectorItem',
  inject: {
    SelectorGroupInstance: {
      default: ''
    }
  }
})
export default class LinSelectorItem extends Vue {
  @Prop({ type: String, default: '' })
  label!:string

  @Prop({ type: [Object, String, Number], default: '' })
  value!:Record<string, any>|string|number

  @Prop({ type: Boolean, default: false })
  disabled!:boolean

  get active () {
    if (this.SelectorGroupInstance) {
      const { valueKey } = this.SelectorGroupInstance;
      const { toString } = Object.prototype;
      if (toString.call(this.value) === '[object Object]' && valueKey) {
        return this.value[valueKey] === this.SelectorGroupInstance.value[valueKey];
      }
      return this.value === this.SelectorGroupInstance.value;
    }
    return false;
  }

  get isDisabled () {
    if (this.SelectorGroupInstance && this.SelectorGroupInstance.disabled) {
      return true;
    }
    return this.disabled;
  }

  onClick () {
    if (this.SelectorGroupInstance && !this.isDisabled) {
      const value = JSON.parse(JSON.stringify(this.value));
      this.SelectorGroupInstance.$emit('input', value);
      this.SelectorGroupInstance.$emit('onChange', value);
    }
  }
}
</script>
