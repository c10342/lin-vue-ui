import Cascader from './src/cascader';

(Cascader as any).install = (Vue) => Vue.component(Cascader.name, Cascader);

export default Cascader;
