import Form from './src/form';

(Form as any).install = (Vue) => Vue.component(Form.name, Form);

export default Form;
