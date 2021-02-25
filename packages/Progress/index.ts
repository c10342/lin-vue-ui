import Progress from './src/progress';

(Progress as any).install = (Vue) => Vue.component(Progress.name, Progress);

export default Progress;
