import locale from './locale/index';

import 'src/fonts/iconfont.css';

const testComps = require.context(
  '../packages',
  true,
  /^\.(\/\w+)\/index\.(js|ts)$/
);

const reg = /^\.\/(\w+)\/index\.(js|ts)$/;

const componentObjs = {};
testComps.keys().forEach((key:string) => {
  const componentEntity = testComps(key).default;
  const result = reg.exec(key);
  if (result) {
    componentObjs[result[1]] = componentEntity;
  }
  // const result = reg.exec(key)![1];
  // componentObjs[result] = componentEntity;
});

interface Opts{
  locale?:string,
  // 映射 ==》 {[key:string]:unknown}
  i18n?:Record<string, unknown>
}

const install = (Vue, opts:Opts = {}) => {
  locale.use(opts.locale);
  locale.i18n(opts.i18n);
  Object.keys(componentObjs).forEach((key) => {
    Vue.use(componentObjs[key]);
  });
};

// 判断是否是直接引入文件,如果是，就不用调用 Vue.use()
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  locale: locale.use,
  i18n: locale.i18n,
  install,
  ...componentObjs
};
