import dispatch from 'src/utils/dispatch.js';

import { Vue, Component } from 'vue-property-decorator';

@Component
export default class ValidateMixin extends Vue {
  created () {
    this.$on('input', () => {
      dispatch(this, {
        eventName: 'validate',
        componentName: 'LinFormItem'
      });
    });
  }
}
