import DropdownItem from './src/dropdown-item';

(DropdownItem as any).install = (Vue) => Vue.component(DropdownItem.name, DropdownItem);

export default DropdownItem;
