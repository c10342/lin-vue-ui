import Backtop from './src/backtop';

(Backtop as any).install = (Vue) => Vue.component(Backtop.name, Backtop);

export default Backtop;
