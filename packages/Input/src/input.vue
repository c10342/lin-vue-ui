<template>
  <div
    class="lin-input"
    :class="{ 'lin-input-suffix-content': showSuffix || $slots.default }"
  >
    <!-- 如果传了show-password, 判断是否需要切换 密码的显示 如果不传，不判断 -->
    <input
      @blur="onBlur"
      @focus="onFocus"
      autocomplete="off"
      class="lin-input-inner"
      :class="{ 'lin-input-is-disabled': disabled }"
      :placeholder="placeholder"
      :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
      :disabled="disabled"
      :value="value"
      @keyup="handleInput"
      v-bind="inputAttr"
    />
    <span class="lin-input-suffix" v-if="showSuffix && !$slots.default">
      <i
        class="lin-input-icon lin-icon-close"
        v-if="clearable && value"
        @click="clear"
      ></i>
      <i
        class="lin-input-icon lin-icon-password"
        v-if="showPassword"
        @click="handlePassword"
        :class="{ 'lin-icon-view-active': passwordVisible }"
      ></i>
    </span>
    <span v-if="$slots.default" class="lin-input-suffix">
      <slot></slot>
    </span>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import dispatch from 'src/utils/dispatch';
import { Obj } from './type';

@Component({
  name: 'LinInput'
})
export default class LinInput extends Vue {
  @Prop({ type: String, default: '' })
  placeholder!: string;

  @Prop({ type: String, default: 'text' })
  type!: string;

  @Prop({ type: String, default: '' })
  name!: string;

  @Prop({ type: Boolean, default: false })
  disabled!: boolean;

  @Prop({ type: String, default: '' })
  value!: string;

  @Prop({ type: Boolean, default: false })
  clearable!: boolean;

  @Prop({ type: Boolean, default: false })
  showPassword!: boolean;

  @Prop({ type: Number, default: -1 })
  maxlength!: number;

  @Prop({ type: Number, default: -1 })
  minlength!: number;

  // 用于控制是否显示密码框
  passwordVisible = false;

  get showSuffix () {
    return this.clearable || this.showPassword;
  }

  get inputAttr () {
    const obj: Obj = {};
    if (this.maxlength !== -1) {
      obj.maxlength = this.maxlength;
    }
    if (this.minlength !== -1) {
      obj.minlength = this.minlength;
    }
    if (this.name) {
      obj.name = this.name;
    }
    return {
      ...obj,
      ...this.$attrs
    };
  }

  handleInput (e) {
    this.emitInputEvent(e.target.value);
  }

  clear () {
    // 把内容清空
    this.emitInputEvent('');
    this.$emit('clear');
  }

  emitInputEvent (data) {
    this.$emit('input', data);
    dispatch(this, {
      eventName: 'validate',
      componentName: 'LinFormItem'
    });
  }

  handlePassword () {
    this.passwordVisible = !this.passwordVisible;
  }

  onBlur (e) {
    this.$emit('blur', e);
  }

  onFocus (e) {
    this.$emit('focus', e);
  }
}
</script>
