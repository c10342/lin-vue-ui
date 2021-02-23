import ChoiceGroup from './src/choice-group';

(ChoiceGroup as any).install = (Vue) => Vue.component(ChoiceGroup.name, ChoiceGroup);

export default ChoiceGroup;
