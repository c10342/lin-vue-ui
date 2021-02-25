<template>
  <label
    class="lin-radio"
    :class="{'lin-radio-is-checked': label === model,'lin-radio-is-disabled':isDisable}"
  >
    <span class="lin-radio-input">
      <span class="lin-radio-inner"></span>
      <input
        :disabled="isDisable"
        class="lin-radio-original"
        type="radio"
        :value="label"
        :name="name"
        v-model="model"
      />
    </span>
    <span class="lin-radio-label">
      <slot></slot>
      <!-- 如果没有传内容，我们就把label当成内容 -->
      <template v-if="!$slots.default">{{label}}</template>
    </span>
  </label>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import dispatch from 'src/utils/dispatch';

@Component({
  name: 'LinRadio',
  inject: {
    RadioGroupInstance: {
      default: ''
    }
  }
})
export default class LinRadio extends Vue {
  @Prop({ type: [String, Number, Boolean], default: '' })
  label!:string|number|boolean

  @Prop({ type: Object })
  value!:any

   @Prop({ type: String, default: '' })
  name!:string

   @Prop({ type: Boolean, default: false })
  disabled!:boolean

   get model () {
     return this.isGroup ? this.RadioGroupInstance.value : this.value;
   }

   set model (value) {
     if (this.isGroup) {
       this.RadioGroupInstance.$emit('input', value);
     } else {
       this.$emit('input', value);
     }
     dispatch(this, {
       eventName: 'validate',
       componentName: 'LinFormItem'
     });
   }

   get isGroup () {
     return !!this.RadioGroupInstance;
   }

   get isDisable () {
     if (this.isGroup) {
       if (this.RadioGroupInstance.disabled) {
         return true;
       }
     }
     return this.disabled;
   }
}
</script>
