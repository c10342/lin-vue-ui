import Row from './src/row';

(Row as any).install = (Vue) => Vue.component(Row.name, Row);

export default Row;
