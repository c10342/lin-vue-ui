<template>
  <transition name="lin-loading-fade" @after-leave="handleAfterLeave">
    <div
      v-show="visible"
      class="lin-loading-mask"
      :class="[{'lin-loading-is-fullscreen':fullscreen}]"
      :style="{'backgroundColor':background || ''}"
    >
      <div class="lin-loading-content">
        <span
          class="lin-loading-icon"
          :style="{'border-top-color':iconColor|| '','border-right-color':iconColor || ''}"
        ></span>
        <span :style="{'color':textColor||''}" class="lin-loading-text" v-if="text">{{text}}</span>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: 'LinLoading'
})
export default class LinLoading extends Vue {
  text:string|null=null
      fullscreen=true
      visible=false
      background:string|null=null
      iconColor:string|null=null
      textColor:string|null=null

      handleAfterLeave () {
        this.$emit('after-leave');
      }
}
</script>
