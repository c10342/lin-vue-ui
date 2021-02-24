import CollapseGroup from '../../CollapseGroup/index';

declare module 'vue/types/vue' {
  interface Vue {
    CollapseGroupInstance: CollapseGroup;
  }
}
