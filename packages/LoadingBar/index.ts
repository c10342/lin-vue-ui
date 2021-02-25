import LoadingBar from './src/loading-bar';

(LoadingBar as any).install = (Vue) => {
  Vue.prototype.$loadingBar = LoadingBar;
};

export default LoadingBar;
