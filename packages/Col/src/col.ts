import './style.scss';
import { Style } from './type';

import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'LinCol',
  inject: {
    RowInstance: {
      default: ''
    }
  }
})
export default class LinCol extends Vue {
  @Prop({ type: String, default: 'div' })
  tag!: string;

  @Prop({ type: Number, default: 24 })
  span!: number;

  @Prop({ type: Number, default: 0 })
  offset!: number;

  @Prop({ type: Number, default: 0 })
  pull!: number;

  @Prop({ type: Number, default: 0 })
  push!: number;

  @Prop({ type: [Number, Object] })
  xs!: number | Record<string, any>;

  @Prop({ type: [Number, Object] })
  sm!: number | Record<string, any>;

  @Prop({ type: [Number, Object] })
  md!: number | Record<string, any>;

  @Prop({ type: [Number, Object] })
  lg!: number | Record<string, any>;

  get gutter () {
    if (this.RowInstance) {
      return this.RowInstance.gutter;
    }
    return 0;
  }

  render (h) {
    const style: Style = {};
    const classList: string[] = [];

    if (this.gutter) {
      style.paddingLeft = `${this.gutter / 2}px`;
      style.paddingRight = style.paddingLeft;
    }

    ['offset', 'push', 'pull', 'span'].forEach(key => {
      if (this[key]) {
        if (key !== 'span') {
          classList.push(`lin-col-${key}-${this[key]}`);
        } else {
          classList.push(`lin-col-${this[key]}`);
        }
      }
    });
    ['xs', 'sm', 'md', 'lg'].forEach(size => {
      if (typeof this[size] === 'number') {
        classList.push(`lin-col-${size}-${this[size]}`);
      } else if (typeof this[size] === 'object') {
        const props = this[size];
        Object.keys(props).forEach(prop => {
          if (prop !== 'span') {
            classList.push(`lin-col-${size}-${prop}-${props[prop]}`);
          } else {
            classList.push(`lin-col-${size}-${props[prop]}`);
          }
        });
      }
    });
    return h(
      this.tag,
      {
        class: ['lin-col', classList],
        style
      },
      this.$slots.default
    );
  }
}
