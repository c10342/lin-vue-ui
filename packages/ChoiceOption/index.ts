import ChoiceOption from './src/choice-option';

(ChoiceOption as any).install = (Vue) => Vue.component(ChoiceOption.name, ChoiceOption);

export default ChoiceOption;
