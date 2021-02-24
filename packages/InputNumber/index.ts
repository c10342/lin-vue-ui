import InputNumber from './src/input-number';

(InputNumber as any).install = (Vue) => Vue.component(InputNumber.name, InputNumber);

export default InputNumber;
