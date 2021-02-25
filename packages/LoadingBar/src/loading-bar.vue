<template>
  <div class="lin-loading-bar">
    <div
      :style="{ transform: `translateX(-${100 - totalProgress}%)` }"
      class="lin-loading-bar-progress"
      :class="{ 'lin-loading-bar-error': isError }"
    >
      <div class="lin-loading-bar-peg"></div>
    </div>
    <div class="lin-loading-bar-spinner" v-if="showSpinner">
      <div
        :style="{ 'animation-timing-function': easing }"
        class="lin-loading-bar-icon"
        :class="{ 'lin-loading-bar-icon-error': isError }"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: 'LinLoadingBar'
})
export default class LinLoadingBar extends Vue {
  easing = 'linear';
  isError = false;
  showSpinner = true;
  totalProgress = 0;
  percentNum = 0;
  speed = 5;
}
</script>
