<template>
  <div class="lin-choice-option">
    <slot name="label">
      <div class="lin-choice-option-label">
        {{ label }}
      </div>
    </slot>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {
  Vue,
  Component,
  Prop
} from 'vue-property-decorator';

@Component({
  name: 'LinChoiceOption',
  provide () {
    return {
      option: this
    };
  }
})
export default class LinChoiceOption extends Vue {
  @Prop({ type: String, default: '' })
  label!:string

  @Prop({ type: Boolean, default: false })
  disabled!:boolean
}
</script>
