import Checkbox from './src/checkbox';

(Checkbox as any).install = (Vue) => Vue.component(Checkbox.name, Checkbox);

export default Checkbox;
