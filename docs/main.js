
import Vue from 'vue';
import zhLang from 'src/locale/lang/zh-CN.ts';
import enLang from 'src/locale/lang/en-US.ts';
import LinVueUi from 'lin-view-ui';
import locale from 'src/locale/index.ts';
import App from './App.vue';
import router from './router';
import { getLang, langType } from './utils/lang';
import './assets/styles/index.scss';
import demoBlock from './components/demo-block.vue';

import 'highlight.js/styles/color-brewer.css';

const lang = getLang();

Vue.component('demo-block', demoBlock);

if (lang === langType.en) {
  locale.use(enLang);
} else {
  locale.use(zhLang);
}

Vue.use(LinVueUi);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
