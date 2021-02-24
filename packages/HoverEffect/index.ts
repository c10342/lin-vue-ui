import HoverEffect from './src/hover-effect';

(HoverEffect as any).install = (Vue) => Vue.component(HoverEffect.name, HoverEffect);

export default HoverEffect;
