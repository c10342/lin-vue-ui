import PageHeader from './src/page-header';

(PageHeader as any).install = (Vue) => Vue.component(PageHeader.name, PageHeader);

export default PageHeader;
