<template>
  <div class="lin-form">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
// import {FormItemOption} from './type'

@Component({
  name: 'LinForm',
  provide () {
    return {
      FormInstance: this
    };
  }
})
export default class LinForm extends Vue {
  @Prop({ type: Object, required: true })
  model!: Record<string, any>;

  @Prop({ type: String, default: '80px' })
  labelWidth!: string;

  @Prop({ type: Object, default: () => ({}) })
  rules!: Record<string, any>;

  validate (cb) {
    const tasks = (this.$children as any)
      .filter((item) => item.prop)
      .map((item) => item.validate());

    // 所有任务都通过才算校验通过
    Promise.all(tasks)
      .then((res) => {
        cb(res.every(Boolean));
      })
      .catch(() => cb(false));
  }

  clearValidate () {
    const broad = (children) => {
      children.forEach((child) => {
        if (child.$options.name === 'LinFormItem' && child.clearValidate) {
          child.clearValidate();
        }
        if (child.$children) {
          broad(child.$children);
        }
      });
    };

    broad(this.$children);
  }
}
</script>
