<template>
  <!-- 对话框的遮罩 .self代表只有点击自己才触发 -->
  <transition name="lin-dialog-fade">
    <div
      class="lin-dialog-wrapper"
      v-show="visible"
      @click.self="onWrapperClick"
    >
      <div
        ref="dragContainer"
        @mousedown="onDragClick"
        class="lin-dialog"
        :style="{ width, marginTop: top, ...dialogStyle }"
      >
        <div class="lin-dialog-header">
          <slot name="title">
            <span class="lin-dialog-title">{{
              title || t("LinViewUI.Dialog.title")
            }}</span>
          </slot>
          <button class="lin-dialog-headerbtn" @click="handleClose">
            <i class="lin-icon-close"></i>
          </button>
        </div>
        <div class="lin-dialog-body">
          <!-- 默认插槽 -->
          <slot></slot>
        </div>
        <div class="lin-dialog-footer" v-if="$slots.footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Mixins, Component, Prop, PropSync } from 'vue-property-decorator';
import LocaleMixin from 'src/mixins/locale';
import DragMixin from 'src/mixins/drag';

@Component({
  name: 'LinDialog'
})
export default class LinDialog extends Mixins(LocaleMixin, DragMixin) {
  @Prop({ type: String })
  title!: string;

  @Prop({ type: String, default: '50%' })
  width!: string;

  @Prop({ type: String, default: '15vh' })
  top!: string;

  @Prop({ type: Function })
  beforeClose!: (done: () => void) => void;

  @Prop({ type: Boolean, default: true })
  closeOnClickModa!: boolean;

  @PropSync('visible', { type: Boolean, default: false })
  isVisible!: boolean;

  handleClose () {
    const done = () => {
      // this.$emit('update:visible', false);
      this.isVisible = false;
      this.$emit('close');
    };
    if (this.beforeClose) {
      this.beforeClose(done);
    } else {
      done();
    }
  }

  onWrapperClick () {
    if (this.closeOnClickModa) {
      this.handleClose();
    }
  }
}
</script>
