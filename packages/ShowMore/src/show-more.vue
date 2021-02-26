<template>
  <span class="lin-show-more">
    <span>{{text | filterText(textLen)}}</span>
    <a
      class="lin-show-more-tip"
      @click="showMore"
      v-if="textLen !== -1 && textLen < text.length"
    >{{showText||t('LinViewUI.ShowMore.showText')}}</a>
    <a
      class="lin-show-more-tip"
      @click="showMore"
      v-if="textLen !== -1 && textLen === text.length && allowFold"
    >{{hiddenText||t('LinViewUI.ShowMore.hiddenText')}}</a>
  </span>
</template>

<script lang='ts'>
import { Component, Mixins, Prop } from 'vue-property-decorator';
import LocaleMixin from 'src/mixins/locale';

@Component({
  name: 'LinShowMore',
  filters: {
    filterText (value, textLen) {
      if (textLen !== -1 && textLen < value.length) {
        return `${value.substring(0, textLen)}...`;
      }
      return value;
    }
  }
})
export default class LinShowMore extends Mixins(LocaleMixin) {
  @Prop({ type: Number, default: -1 })
  len!:number

  @Prop({ type: String, default: '' })
  text!:string

  @Prop({ type: String })
  showText!:string

  @Prop({ type: String })
  hiddenText!:string

  @Prop({ type: Boolean })
  allowFold!:boolean

  textLen = this.len

  showMore () {
    this.textLen = this.textLen === this.text.length ? this.len : this.text.length;
  }
}
</script>
