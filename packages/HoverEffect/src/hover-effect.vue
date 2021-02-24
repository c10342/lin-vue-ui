<template>
  <button
    @click="onClick"
    :class="['lin-hover-effect',`lin-hover-effect-theme-${theme}`,`lin-hover-effect-type-${type}`]"
  >
    <slot>{{text}}</slot>
  </button>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'LinHoverEffect'
})
export default class LinHoverEffect extends Vue {
  @Prop({ type: String, default: 'primary' })
  type!:string

  @Prop({ type: String, default: 'neon' })
  theme!:string

  @Prop({ type: String })
  text!:string

  onClick () {
    this.$emit('click');
  }
}
</script>
