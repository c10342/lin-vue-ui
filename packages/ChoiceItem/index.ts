import ChoiceItem from './src/choice-item.js';

(ChoiceItem as any).install = (Vue) => Vue.component(ChoiceItem.name, ChoiceItem);

export default ChoiceItem;
