import CollapseGroup from './src/collapse-group';

(CollapseGroup as any).install = (Vue) => Vue.component(CollapseGroup.name, CollapseGroup);

export default CollapseGroup;
