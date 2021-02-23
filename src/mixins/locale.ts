import { t } from 'src/locale/index';

import { Vue, Component } from 'vue-property-decorator';

@Component
export default class LocaleMixin extends Vue {
  t (...args:any) {
    return t.apply(this, args);
  }
}
