import Badge from './src/badge';

(Badge as any).install = (Vue) => Vue.component(Badge.name, Badge);

export default Badge;
