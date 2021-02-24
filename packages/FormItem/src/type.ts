import Form from '../../Form/index';

declare module 'vue/types/vue' {
  interface Vue {
    FormInstance: Form;
  }
}
