import Dropdown from './src/dropdown';

(Dropdown as any).install = (Vue) => Vue.component(Dropdown.name, Dropdown);

export default Dropdown;
