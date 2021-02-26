import ScrollView from './src/scroll-view';

(ScrollView as any).install = (Vue) => Vue.component(ScrollView.name, ScrollView);

export default ScrollView;
