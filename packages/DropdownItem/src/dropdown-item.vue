<template>
  <div
    @click="onItemClick"
    :class="[
      { 'lin-dropdown-item-divided': divided },
      { 'lin-dropdown-item-disabled': disabled },
      'lin-dropdown-item',
    ]"
  >
    <span :class="[icon, 'lin-dropdown-item-icon']" v-if="icon"></span>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'LinDropdownItem',
  inject: {
    DropdownInstance: {
      default: null
    }
  }
})
export default class LinDropdownItem extends Vue {
  @Prop({ type: Boolean, default: false })
  disabled!: boolean;

  @Prop({ type: Boolean, default: false })
  divided!: boolean;

  @Prop({ type: [String, Number, Object] })
  command!: any;

  @Prop({ type: String, default: '' })
  icon!: string;

  get hideOnClick () {
    return this.DropdownInstance ? this.DropdownInstance.hideOnClick : true;
  }

  onItemClick () {
    if (this.DropdownInstance) {
      if (this.hideOnClick) {
        this.DropdownInstance.hideList();
      }
      this.DropdownInstance.$emit('command', this.command);
    }
  }
}
</script>
