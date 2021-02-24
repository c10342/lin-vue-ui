import Input from './src/input';

(Input as any).install = (Vue) => Vue.component(Input.name, Input);

export default Input;
