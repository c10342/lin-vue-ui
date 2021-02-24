import DropdownGroup from './src/dropdown-group';

(DropdownGroup as any).install = (Vue) => Vue.component(DropdownGroup.name, DropdownGroup);

export default DropdownGroup;
