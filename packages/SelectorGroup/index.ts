import SelectorGroup from './src/selector-group';

(SelectorGroup as any).install = (Vue) => Vue.component(SelectorGroup.name, SelectorGroup);

export default SelectorGroup;
