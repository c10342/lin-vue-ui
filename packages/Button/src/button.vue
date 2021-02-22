<template>
  <button
    @click="onButtonClick"
    class="lin-button"
    :class="[
      `lin-button-${type}`,
      { 'lin-button-plain': plain },
      { 'lin-button-round': round },
      { 'lin-button-circle': circle },
      { 'lin-button-disabled': disabled },
      { 'lin-button-loading': loading },
      `lin-button-size-${size}`,
    ]"
    :disabled="disabled"
  >
    <lin-spinner
      v-if="loading"
      class="lin-button-spinner"
      :loadingColor="loadingColor"
      :size="loadingSize"
    ></lin-spinner>
    <i v-if="icon" :class="icon"></i>
    <span v-if="$slots.default">
      <slot></slot>
    </span>
  </button>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Spinner from 'packages/Spinner/index.js';

@Component({
  name: 'LinButton',
  components: {
    [Spinner.name]: Spinner
  }
})
export default class LinButton extends Vue {
  @Prop({ type: String, default: 'default' })
  type!: string;

  @Prop({ type: Boolean, default: false })
  plain!: boolean;

  @Prop({ type: Boolean, default: false })
  round!: boolean;

  @Prop({ type: Boolean, default: false })
  circle!: boolean;

  @Prop({ type: Boolean, default: false })
  disabled!: boolean;

  @Prop({ type: String, default: '' })
  icon!: string;

  @Prop({ type: String, default: 'default' })
  size!: string;

  @Prop({ type: Boolean, default: false })
  loading!: boolean;

  @Prop({ type: String, default: '#fff' })
  loadingColor!: string;

  @Prop({ type: String, default: '14px' })
  loadingSize!: string;

  onButtonClick () {
    if (!this.loading) {
      this.$emit('click');
    }
  }
}
</script>
