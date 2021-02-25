<template>
  <div class="lin-limit-textarea">
    <textarea
      @keyup="handleInput"
      v-bind="textareaProps"
      class="lin-limit-textarea-input"
      :class="{ 'lin-limit-textarea-over': isOver }"
      :value="value"
    ></textarea>
    <span v-if="maxLen !== -1" class="lin-limit-textarea-text">
      {{
        isOver
          ? t("LinViewUI.LimitTextarea.exceeded")
          : t("LinViewUI.LimitTextarea.enterInput")
      }}
      <span
        class="lin-limit-textarea-num"
        :class="{ 'lin-limit-textarea-num-over': isOver }"
        >{{ num }}</span
      >{{ t("LinViewUI.LimitTextarea.word") }}
    </span>
    <span v-else class="lin-limit-textarea-text">
      {{ t("LinViewUI.LimitTextarea.entered") }}
      <span class="lin-limit-textarea-num">{{ value.toString().length }}</span
      >{{ t("LinViewUI.LimitTextarea.word") }}
    </span>
  </div>
</template>

<script lang="ts">
import { Mixins, Component, Prop } from 'vue-property-decorator';
import LocaleMixin from 'src/mixins/locale';
import { Obj } from './type';

@Component({
  name: 'LinLimitTextarea'
})
export default class LinLimitTextarea extends Mixins(LocaleMixin) {
  @Prop({ type: String })
  placeholder!:string

  @Prop({ type: Number, default: 4 })
  rows!:number

  @Prop({ type: Number, default: -1 })
  maxLen!:number

  @Prop({ type: Boolean, default: false })
  isCut!:boolean

  @Prop({ type: [String, Number], default: '' })
  value!:string|number

  isOver =false
      num=this.maxLen

      get maxlength () {
        if (this.isCut) {
          return this.maxLen;
        }
        return -1;
      }

      get textareaProps () {
        const obj:Obj = {
          placeholder: this.placeholder
            ? this.placeholder
            : this.t('LinViewUI.LimitTextarea.placeholder'),
          rows: this.rows
        };
        if (this.maxlength !== -1) {
          obj.maxlength = this.maxlength;
        }
        return {
          ...this.$attrs,
          ...obj
        };
      }

      handleInput (event) {
        const { value } = event.target;
        if (this.maxLen === -1) {
        // 不限制长度
          this.$emit('input', value);
          this.$emit('change', value);
        } else if (value.length <= this.maxLen || !this.isCut) {
        // 限制长度
          this.$emit('input', value);
          this.$emit('change', value);
          this.setCurrentValue(value);
        }
      }

      setCurrentValue (value) {
        const currentValue = value.toString();
        if (currentValue.length <= this.maxLen) {
          this.isOver = false;
          this.num = this.maxLen - currentValue.length;
        } else {
          if (this.isCut) {
            this.num = currentValue.length - this.maxLen;
            return;
          }
          this.isOver = true;
          this.num = currentValue.length - this.maxLen;
          this.$emit('overText', currentValue);
        }
      }
}
</script>
