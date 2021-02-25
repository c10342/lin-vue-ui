import RadioGroup from './src/radio-group';

(RadioGroup as any).install = (Vue) => Vue.component(RadioGroup.name, RadioGroup);

export default RadioGroup;
