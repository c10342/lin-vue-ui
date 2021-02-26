import SelectorItem from './src/selector-item';

(SelectorItem as any).install = (Vue) => Vue.component(SelectorItem.name, SelectorItem);

export default SelectorItem;
