import Radio from './src/radio';

(Radio as any).install = (Vue) => Vue.component(Radio.name, Radio);

export default Radio;
