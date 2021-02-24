import Dropdown from '../../Dropdown/index';

declare module 'vue/types/vue' {
  interface Vue {
    DropdownInstance: Dropdown;
  }
}
