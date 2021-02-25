<template>
  <div
    :class="['lin-page-header', { 'lin-page-header-border-bottom': border }]"
  >
    <div class="lin-page-header-left">
      <div class="lin-page-header-back" v-if="back">
        <slot name="back">
          <div class="lin-page-header-back-wrapper" @click="$emit('back')">
            <i class="lin-icon-back"></i>
            <span>{{ backTip ||  t('LinViewUI.PageHeader.backTip')}}</span>
          </div>
        </slot>
      </div>
      <div
        :class="[
          'lin-page-header-content',
          { 'lin-page-header-active': active },
        ]"
      >
        <slot>
          {{ title }}
        </slot>
      </div>
    </div>
    <div class="lin-page-header-right" v-if="right">
      <slot name="right">
        <div class="lin-page-header-more" @click="$emit('more')">
          <span>{{t('LinViewUI.PageHeader.more')}}</span>
          <i class="lin-icon-right"></i>
        </div>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Mixins, Component, Prop } from 'vue-property-decorator';
import LocaleMixin from 'src/mixins/locale';

@Component({
  name: 'LinPageHeader'
})
export default class LinPageHeader extends Mixins(LocaleMixin) {
  @Prop({ type: Boolean, default: true })
  back!:boolean

  @Prop({ type: String })
  backTip!:string

  @Prop({ type: String })
  title!:string

  @Prop({ type: Boolean, default: false })
  right!:boolean

  @Prop({ type: Boolean, default: false })
  active!:boolean

  @Prop({ type: Boolean, default: false })
  border!:boolean
}

</script>
