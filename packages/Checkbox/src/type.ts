import CheckboxGroup from '../../CheckboxGroup/index';

declare module 'vue/types/vue' {
    interface Vue {
        CheckboxGroupInstance: CheckboxGroup;
    }
  }
