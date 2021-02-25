import Pagination from './src/pagination';

(Pagination as any).install = (Vue) => Vue.component(Pagination.name, Pagination);

export default Pagination;
