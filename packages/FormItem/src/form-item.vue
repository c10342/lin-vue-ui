<template>
  <div class="lin-form-item">
    <label
      v-if="label"
      class="lin-form-item-label"
      :style="{ width: itemLabelWidth }"
    >
      {{ label }}
    </label>
    <div class="lin-form-item-content">
      <slot></slot>
    </div>
    <transition name="lin-formItem-fade">
      <p
        v-if="errorMsg"
        class="lin-form-item-errormsg"
        :style="{ left: itemLabelWidth }"
      >
        {{ errorMsg }}
      </p>
    </transition>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Schema from 'async-validator';

@Component({
  name: 'LinFormItem',
  inject: ['FormInstance']
})
export default class LinFormItem extends Vue {
  @Prop({ type: String })
  label!: string;

  @Prop({ type: String })
  prop!: string;

  @Prop({ type: String })
  labelWidth!: string;

  errorMsg = '';

  get itemLabelWidth () {
    if (this.label) {
      if (this.labelWidth) {
        return this.labelWidth;
      }
      return this.FormInstance.labelWidth;
    }
    return 0;
  }

  mounted () {
    this.$on('validate', this.validate);
  }

  validate () {
    if (!this.prop) {
      return;
    }
    const value = this.FormInstance.model[this.prop];
    const rules = this.FormInstance.rules[this.prop];
    const schema = new Schema({ [this.prop]: rules });
    // return的是校验结果的Promise
    return schema
      .validate({ [this.prop]: value })
      .then(() => {
        this.errorMsg = '';
        this.FormInstance.$emit('validate', {
          result: true,
          [this.prop]: value
        });
        return true;
      })
      .catch(({ fields }) => {
        this.errorMsg = fields[this.prop][0].message;
        this.FormInstance.$emit('validate', {
          result: false,
          [this.prop]: value,
          ...fields
        });
        return false;
      });
  }

  clearValidate () {
    this.errorMsg = '';
  }
}
</script>
