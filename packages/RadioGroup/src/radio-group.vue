<template>
  <div class="lin-radio-group">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  name: 'LinRadioGroup',
  provide () {
    return {
      RadioGroupInstance: this
    };
  }
})
export default class LinRadioGroup extends Vue {
  @Prop({ type: Object })
  value!:any

  @Prop({ type: Boolean, default: false })
  disabled!:boolean
}
</script>
