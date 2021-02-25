<template>
  <transition name="message" @after-leave="afterLeave">
    <div
      :class="[
        'lin-message',
        `lin-message-${type}`,
        { 'lin-message-center': center },
        customClass ? customClass : '',
      ]"
      v-show="show"
      :style="{ top: `${offsetTop}px` }"
    >
      <i
        :class="[
          'lin-message-icon',
          iconClass ? iconClass : `lin-icon-${type}`,
        ]"
      ></i>
      <p class="lin-message-content" v-if="!dangerouslyUseHTMLString">
        {{ message }}
      </p>
      <p
        class="lin-message-content"
        v-if="dangerouslyUseHTMLString"
        v-html="message"
      ></p>
      <i
        class="lin-icon-close lin-message-close-icon"
        v-if="showClose"
        @click="onCloseClick"
      ></i>
    </div>
  </transition>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'LinMessage'
})
export default class LinMessage extends Vue {
  @Prop({ type: String, default: 'info' })
  type!: string;

  @Prop({ type: Boolean, default: false })
  showClose!: boolean;

  @Prop({ type: String })
  message!: string;

  @Prop({ type: String })
  iconClass!: string;

  @Prop({ type: Boolean, default: false })
  dangerouslyUseHTMLString!: boolean;

  @Prop({ type: String })
  customClass!: string;

  @Prop({ type: Boolean, default: false })
  center!: boolean;

  @Prop({ type: Function })
  onClose!: () => void;

  @Prop({ type: Number, default: 20 })
  offset!: number;

  show = false;

  top = 0;

  get offsetTop () {
    return this.top + this.offset;
  }

  onCloseClick () {
    if (this.show) {
      this.show = false;
      this.$emit('close');
    }
  }

  afterLeave () {
    this.$emit('closed');
    if (this.onClose) {
      this.onClose();
    }
  }
}
</script>
