import { t } from 'src/locale/index.js';

import { Vue, Component } from 'vue-property-decorator';

@Component
export default class LocaleMixin extends Vue {
  t (...args) {
    return t.apply(this, args);
  }
}
