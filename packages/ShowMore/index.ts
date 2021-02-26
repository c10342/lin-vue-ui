import ShowMore from './src/show-more';

(ShowMore as any).install = (Vue) => Vue.component(ShowMore.name, ShowMore);

export default ShowMore;
