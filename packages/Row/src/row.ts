import './style.scss';
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'LinRow',
  provide () {
    return {
      row: this
    };
  }
})
export default class LinRow extends Vue {
  @Prop({ type: String, default: 'div' })
  tag!: string

  @Prop({ type: Number, default: 0 })
  gutter!: number

  @Prop({ type: String, default: '' })
  type!: string

  @Prop({ type: String, default: '' })
  justify!: string

  @Prop({ type: String, default: '' })
  align!: string

  render (h) {
    const classList:string[] = [];
    if (this.type) {
      classList.push(`lin-row-${this.type}`);
    }
    if (this.justify) {
      classList.push(`lin-row-justify-${this.justify}`);
    }
    if (this.align) {
      classList.push(`lin-row-align-${this.align}`);
    }
    return h(
      this.tag,
      {
        class: ['lin-row', classList]
      },
      this.$slots.default
    );
  }
}
