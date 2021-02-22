<template>
  <transition name="lin-alert-fade" @after-leave="afterLeave">
    <div
      :class="[
        'lin-alert',
        `lin-alert-${type}`,
        `lin-alert-${effect}`,
        { 'lin-alert-center': center },
      ]"
      v-if="show"
    >
      <slot name="icon">
        <i :class="['lin-alert-icon', icon]" v-if="icon"></i>
      </slot>
      <div class="lin-alert-content">
        <slot name="title">
          <span class="lin-alert-title">{{ title }}</span>
        </slot>
        <slot name="description">
          <span class="lin-alert-description" v-if="description">{{
            description
          }}</span>
        </slot>
      </div>
      <span class="lin-alert-close" v-if="closable" @click="onCloseClick">
        <slot name="close">
          <i class="lin-icon-close"></i>
        </slot>
      </span>
    </div>
  </transition>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'LinAlert'
})
export default class LinAlert extends Vue {
  @Prop({ type: String, default: '' })
  title!: string;

  @Prop({ type: String, default: '' })
  description!: string;

  @Prop({ type: String, default: '' })
  icon!: string;

  @Prop({ type: Boolean, default: false })
  closable!: boolean;

  @Prop({ type: String, default: 'success' })
  type!: string;

  @Prop({ type: String, default: 'light' })
  effect!: string;

  @Prop({ type: Boolean, default: false })
  center!: boolean;

  show = true;

  onCloseClick () {
    this.show = false;
  }

  afterLeave () {
    this.$emit('close');
  }
}
</script>
