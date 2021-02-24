<template>
  <div :class="[{ 'lin-collapse-group-simple': simple }, 'lin-collapse-group']">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { cloneDeep } from 'lodash';

@Component({
  name: 'LinCollapseGroup',
  provide () {
    return {
      CollapseGroupInstance: this
    };
  }
})
export default class LinCollapseGroup extends Vue {
  @Prop({ type: [Array, String] })
  value!: Array<string | number> | string;

  @Prop({ type: Boolean, default: false })
  accordion!: boolean;

  @Prop({ type: Boolean, default: false })
  simple!: boolean;

  valueData = '';

  get collapseValue () {
    if (typeof this.value === 'string' || Array.isArray(this.value)) {
      return this.value;
    }
    return this.valueData;
  }

  set collapseValue (val) {
    if (typeof this.value === 'string' || Array.isArray(this.value)) {
      this.$emit('input', this.handleData(val));
    } else {
      this.valueData = this.handleData(val);
    }
    this.$emit('onChange', val);
  }

  handleData (data) {
    let da;
    if (this.accordion) {
      if (data.length > 0) {
        da = data[0];
      } else {
        da = '';
      }
    } else {
      da = data;
    }
    return cloneDeep(da);
  }
}
</script>
