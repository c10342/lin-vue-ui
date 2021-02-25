<template>
  <a
    @click="onClick"
    :href="href"
    v-bind="$attrs"
    :class="[
      'lin-link',
      `lin-link-${type}`,
      {
        'lin-link-disabled': disabled,
        'lin-link-underline': underline && !disabled,
      },
    ]"
  >
    <i :class="[icon, 'lin-link-icon']" v-if="icon"></i>
    <span>
      <slot></slot>
    </span>
  </a>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'LinLink'
})
export default class LinLink extends Vue {
  @Prop({ type: String, default: 'default' })
  type!:string

  @Prop({ type: Boolean, default: true })
  underline!:boolean

  @Prop({ type: Boolean, default: false })
  disabled!:boolean

  @Prop({ type: String, default: '' })
  href!:string

  @Prop({ type: String, default: '' })
  icon!:string

  onClick (event) {
    if (!this.href || this.disabled) {
      event.preventDefault();
    }
  }
}
</script>
