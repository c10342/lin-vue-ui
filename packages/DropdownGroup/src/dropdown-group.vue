<template>
  <div>
    <div class="lin-dropdown-group-label" v-if="label">{{ label }}</div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'LinDropdownGroup'
})
export default class LinDropdownGroup extends Vue {
  @Prop({ type: String })
  label!: string;
}
</script>
