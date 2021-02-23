import ChoiceItem from './src/choice-item';

(ChoiceItem as any).install = (Vue) => Vue.component(ChoiceItem.name, ChoiceItem);

export default ChoiceItem;
