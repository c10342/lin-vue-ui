import LimitTextarea from './src/limit-textarea';

(LimitTextarea as any).install = (Vue) => Vue.component(LimitTextarea.name, LimitTextarea);

export default LimitTextarea;
