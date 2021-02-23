import CollpaseItem from './src/collapse-item';

(CollpaseItem as any).install = (Vue) => Vue.component(CollpaseItem.name, CollpaseItem);

export default CollpaseItem;
