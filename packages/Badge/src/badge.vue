<template>
  <div class="lin-badge">
    <slot></slot>
    <span
    v-if="!isDot"
    :class="['lin-badge-fix','lin-badge-text', `lin-badge-${type}`]">
    {{ text }}
    </span>
    <span v-if="isDot" :class="['lin-badge-fix','lin-badge-dot', `lin-badge-${type}`]"></span>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'LinBadge'
})
export default class LinBadge extends Vue {
  @Prop({ type: [String, Number], default: '' })
  value!:string|number;

  @Prop({ type: Number })
  max!:number;

  @Prop({ type: Boolean, default: false })
  isDot!:boolean;

  @Prop({ type: String, default: 'primary' })
  type!:string

  get text () {
    if (typeof this.value === 'string') {
      return this.value;
    } if (typeof this.value === 'number') {
      if (this.max && this.max < this.value) {
        return `${this.max}+`;
      }
      return this.value;
    }
    return '';
  }
}

</script>
