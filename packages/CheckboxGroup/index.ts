import CheckboxGroup from './src/checkbox-group';

(CheckboxGroup as any).install = (Vue) => Vue.component(CheckboxGroup.name, CheckboxGroup);

export default CheckboxGroup;
