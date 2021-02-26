import ScrollBar from './src/scroll-bar';

(ScrollBar as any).install = (Vue) => Vue.component(ScrollBar.name, ScrollBar);

export default ScrollBar;
