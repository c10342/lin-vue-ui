import FormItem from './src/form-item';

(FormItem as any).install = (Vue) => Vue.component(FormItem.name, FormItem);

export default FormItem;
