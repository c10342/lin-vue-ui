import SelectorGroup from '../../SelectorGroup/index';

declare module 'vue/types/vue' {
  interface Vue {
    SelectorGroupInstance: SelectorGroup;
  }
}
