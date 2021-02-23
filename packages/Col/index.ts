import Col from './src/col';

(Col as any).install = (Vue) => Vue.component(Col.name, Col);

export default Col;
