<template>
  <div :class="[{ 'lin-collapse-item-simple': simple }, 'lin-collapse-item']">
    <div class="lin-collapse-item-header" @click="onHeaderClick">
      <i
        :class="[
          { 'lin-collapse-arrow-down': show },
          'lin-icon-right',
          'lin-collapse-arrow',
        ]"
        v-if="!hideArrow"
      ></i>
      <slot></slot>
    </div>
    <collapse-transition>
      <div class="lin-collapse-item-content" v-show="show">
        <slot name="content"></slot>
      </div>
    </collapse-transition>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, InjectReactive } from 'vue-property-decorator';
import { cloneDeep } from 'lodash';
import collapseTransition from 'src/js/collapseTransition';
import { CollapseGroupItem } from './type';

@Component({
  name: 'LinCollapseItem',
  components: {
    collapseTransition
  }
})
export default class LinCollapseItem extends Vue {
  @Prop({ type: String, required: true })
  name!:string

  @Prop({ type: Boolean, default: false })
  hideArrow!:boolean

  @InjectReactive('')
  collapseGroup!:CollapseGroupItem

  index = 0

  get simple () {
    if (this.collapseGroup) {
      return this.collapseGroup.simple;
    }
    return false;
  }

  get collapseValue () {
    if (this.collapseGroup) {
      const val = this.collapseGroup.collapseValue;
      if (val && typeof val === 'string') {
        return [val];
      } if (Array.isArray(val)) {
        return val;
      }
    }
    return [];
  }

  get accordion () {
    if (this.collapseGroup) {
      return this.collapseGroup.accordion;
    }
    return false;
  }

  get show () {
    if (this.collapseValue.includes(this.name)) {
      return true;
    }
    return false;
  }

  set show (val) {
    if (this.collapseGroup) {
      let data = cloneDeep(this.collapseValue);
      if (this.accordion) {
        if (val === false) {
          data = [];
        } else {
          data = [this.name];
        }
      } else if (val === false) {
        const index = data.findIndex((item) => item === this.name);
        if (index > -1) {
          data.splice(index, 1);
        }
      } else {
        data.push(this.name);
      }
      this.collapseGroup.collapseValue = data;
    }
  }

  onHeaderClick () {
    this.show = !this.show;
  }
}
</script>
