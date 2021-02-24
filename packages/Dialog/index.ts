import Dialog from './src/dialog';

(Dialog as any).install = (Vue) => Vue.component(Dialog.name, Dialog);

export default Dialog;
