/* eslint-disable multiline-ternary */

import './style.scss';

import 'src/fonts/iconfont.css';

import { Mixins, Component, Prop } from 'vue-property-decorator';
import LocaleMixin from 'src/mixins/locale';
import { VNode } from 'vue';
const oneHeight = 26;

@Component({
  name: 'LinSelectorGroup',
  provide () {
    return {
      SelectorGroupInstance: this
    };
  }
})
export default class LinSelectorGroup extends Mixins(LocaleMixin) {
  @Prop({ type: String, default: '' })
  width!: string;

  @Prop({ type: String, default: '40px' })
  labelWidth!: string;

  @Prop({ type: [String, Object, Number, Boolean] })
  value!: string | Record<string, any> | number | boolean;

  @Prop({ type: String, default: '' })
  valueKey!: string;

  @Prop({ type: Function, default: null })
  renderMore!: (h:any, status:any) => VNode;

  @Prop({ type: Function, default: null })
  renderLabel!: (h:any) => VNode;

  @Prop({ type: String, default: '' })
  label!: string;

  @Prop({ type: Boolean, default: false })
  disabled!: boolean;

  isShowBtn = false;
  height = 'auto';
  //   1-收起，2-展开
  status = 1;

  get outWidth () {
    if (this.width) {
      return this.width;
    }
    return (this.$refs.selector as HTMLElement)?.clientWidth || 0;
  }

  mounted () {
    this.$nextTick(() => {
      this.init();
      window.addEventListener('resize', this.onResize);
    });
  }

  beforeDestroy () {
    window.removeEventListener('resize', this.onResize);
  }

  onResize () {
    this.resetStatus();
  }

  resetStatus () {
    // const clientHeight = this.$refs.selectorList.clientHeight;
    const style = (this.$refs.selectorList as HTMLElement).style;
    // console.log(style.height);
    if (style.height === 'auto') {
      this.init();
    } else {
      this.height = 'auto';
      this.$nextTick(() => {
        this.init();
      });
    }
  }

  init () {
    const clientHeight = (this.$refs.selectorList as any).clientHeight;

    if (clientHeight > oneHeight) {
      this.isShowBtn = true;
      this.hide();
    } else {
      this.isShowBtn = false;
      this.show();
    }
  }

  switchMore () {
    if (this.status === 1) {
      this.show();
      this.$emit('show');
    } else {
      this.hide();
      this.$emit('hide');
    }
  }

  show () {
    this.height = 'auto';
    this.status = 2;
  }

  hide () {
    this.height = `${oneHeight}px`;
    this.status = 1;
  }

  render (h) {
    const {
      renderMore,
      width,
      labelWidth,
      height,
      $slots,
      switchMore,
      label,
      status,
      renderLabel,
      t
    } = this;

    return (
      <div
        class="lin-selector-group"
        ref="selector"
        style={{ width: `${width}px` }}
      >
        <label>
          {renderLabel ? (
            renderLabel(h)
          ) : (
            <span class="lin-selector-label" style={{ width: labelWidth }}>
              {label}
            </span>
          )}
        </label>
        <div class="lin-selector-list" ref="selectorList" style={{ height }}>
          {$slots.default}
        </div>
        {this.isShowBtn ? (
          <span class="lin-selector-more-text" ref="more" onClick={switchMore}>
            {renderMore ? (
              renderMore(h, status)
            ) : (
              <span class="lin-selector-more-text-tip">
                {status === 2
                  ? t('LinViewUI.Selector.hide')
                  : t('LinViewUI.Selector.show')}
              </span>
            )}
          </span>
        ) : null}
      </div>
    );
  }
}
