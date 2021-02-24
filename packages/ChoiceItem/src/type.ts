import ChoiceGroup from '../../ChoiceGroup/index';

import ChoiceOption from '../../ChoiceOption/index';

declare module 'vue/types/vue' {
    interface Vue {
        ChoiceGroupInstance: ChoiceGroup;
        ChoiceOptionInstance:ChoiceOption
    }
  }
