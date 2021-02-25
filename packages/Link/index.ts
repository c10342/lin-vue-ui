import Link from './src/link';

(Link as any).install = (Vue) => Vue.component(Link.name, Link);

export default Link;
