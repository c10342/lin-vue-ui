<template>
  <div class="lin-checkbox-group">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'LinCheckboxGroup',
  provide () {
    return {
      CheckboxGroup: this
    };
  }
})
export default class LinCheckboxGroup extends Vue {
  @Prop({ type: Array })
  value!:Array<any>

  @Prop({ type: Boolean, default: false })
  disabled!:boolean
}
</script>
