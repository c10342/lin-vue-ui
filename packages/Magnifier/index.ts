import Magnifier from './src/magnifier';

(Magnifier as any).install = (Vue) => Vue.component(Magnifier.name, Magnifier);

export default Magnifier;
