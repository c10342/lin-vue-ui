/* eslint-disable @typescript-eslint/no-unused-vars,multiline-ternary */

import './style.scss';
import LocaleMixin from 'src/mixins/locale';

import { Component, Mixins, Prop } from 'vue-property-decorator';

import 'src/fonts/iconfont.css';

@Component({
  name: 'LinPagination'
})
export default class LinPagination extends Mixins(LocaleMixin) {
  @Prop({ type: Number, default: 7 })
  pageCount!: number;

  @Prop({ type: Number, default: 10 })
  pageSize!: number;

  @Prop({ type: Number, default: 0 })
  total!: number;

  @Prop({ type: Number })
  pageIndex!: number;

  @Prop({ type: Boolean, default: false })
  background!: boolean;

  @Prop({ type: String, default: 'prev, pager, next, jumper,total' })
  layout!: string;

  myPageIndex = 1;

  get currentPage () {
    if (this.pageIndex) {
      return this.pageIndex;
    }
    return this.myPageIndex;
  }

  set currentPage (val) {
    if (this.pageIndex) {
      this.$emit('update:pageIndex', val);
    } else {
      this.myPageIndex = val;
    }
  }

  get disabledPrev () {
    return this.currentPage === 1 || this.total === 0;
  }

  get disabledNext () {
    return this.currentPage === this.totalPage || this.total === 0;
  }

  get totalPage () {
    return Math.ceil(this.total / this.pageSize);
  }

  get pageList () {
    if (this.total === 0) {
      return [];
    }
    let left = 1;
    let right = this.totalPage;
    const arr: { index: number | string; type: string }[] = [];
    if (this.totalPage >= this.pageCount) {
      if (
        this.currentPage > Math.ceil(this.pageCount / 2) &&
        this.currentPage < this.totalPage - Math.floor(this.pageCount / 2)
      ) {
        left = this.currentPage - Math.floor(this.pageCount / 2);
        right = this.currentPage + Math.floor(this.pageCount / 2);
      } else if (this.currentPage <= Math.ceil(this.pageCount / 2)) {
        left = 1;
        right = this.pageCount;
      } else {
        left = this.totalPage - (this.pageCount - 1);
        right = this.totalPage;
      }
    }
    while (left <= right) {
      arr.push({ index: left, type: 'number' });
      left++;
    }
    // ellipsis
    if (this.totalPage > this.pageCount) {
      arr[0] = { index: 1, type: 'number' };
      if (this.currentPage > Math.ceil(this.pageCount / 2)) {
        arr[1] = { index: '...', type: 'prev' };
      }
      if (this.currentPage < this.totalPage - Math.floor(this.pageCount / 2)) {
        arr[arr.length - 2] = { index: '...', type: 'next' };
      }
      arr[arr.length - 1] = { index: this.totalPage, type: 'number' };
    }
    return arr;
  }

  get layoutList () {
    let splitArr = this.layout.split(',') || [];
    splitArr = splitArr.map(item => item.trim());
    return splitArr;
  }

  onItemClick (data) {
    let index = 1;
    if (data.type === 'number') {
      index = data.index;
    } else if (data.type === 'prev') {
      index = this.currentPage - 1;
    } else if (data.type === 'next') {
      index = this.currentPage + 1;
    }
    this.currentPage = index;
    this.$emit('currentChange', index);
  }

  prevClick () {
    if (this.disabledPrev) {
      return;
    }
    const index = this.currentPage - 1;
    this.currentPage = index;
    this.$emit('prevClick', index);
  }

  nextClick () {
    if (this.disabledNext) {
      return;
    }
    const index = this.currentPage + 1;
    this.currentPage = index;
    this.$emit('nextClick', index);
  }

  gotoPageByEnter (e) {
    if (e.keyCode !== 13) {
      return;
    }
    const value = e.target.value;
    let index;
    if (!value) {
      index = 1;
    } else if (value < 1) {
      index = 1;
    } else if (value > this.totalPage) {
      index = this.totalPage;
    } else {
      index = value;
    }
    this.currentPage = index * 1;
    e.target.value = index;
  }

  gotoPageByBlur (e) {
    const value = e.target.value;
    let index;
    if (!value) {
      index = 1;
    } else if (value < 1) {
      index = 1;
    } else if (value > this.totalPage) {
      index = this.totalPage;
    } else {
      index = value;
    }
    this.currentPage = index * 1;
    e.target.value = index;
  }

  rendertotal (h) {
    const { total, t } = this;
    return (
      <span class="lin-pagination-total">
        {t('LinViewUI.Pagination.total')}
        {total}
        {t('LinViewUI.Pagination.strip')}
      </span>
    );
  }

  renderprev (h) {
    const { disabledPrev, prevClick } = this;
    return (
      <span
        class={[
          'lin-pagination-item',
          'lin-icon-left',
          { 'lin-pagination-disabled': disabledPrev }
        ]}
        onClick={prevClick}
      ></span>
    );
  }

  renderpager (h) {
    const { pageList, currentPage, onItemClick } = this;
    return (
      <ul class="lin-pagination-pager">
        {pageList.map((item, index) => (
          <li
            class={[
              'lin-pagination-item',
              { 'lin-pagination-active': item.index === currentPage },
              {
                'lin-pagination-ellipsis':
                  item.type === 'prev' || item.type === 'next'
              }
            ]}
            key={index}
            onClick={() => onItemClick(item)}
          >
            {item.index}
            {item.type === 'prev'
              ? (<span class="lin-pagination-icon lin-icon-leftarrow"></span>) : null}
            {item.type === 'next'
              ? (<span class="lin-pagination-icon lin-icon-rightarrow"></span>) : null}
          </li>
        ))}
      </ul>
    );
  }

  rendernext (h) {
    const { disabledNext, nextClick } = this;
    return (
      <span
        class={[
          'lin-pagination-item',
          'lin-icon-right',
          { 'lin-pagination-disabled': disabledNext }
        ]}
        onClick={nextClick}
      ></span>
    );
  }

  renderjumper (h) {
    const { totalPage, gotoPageByEnter, gotoPageByBlur, currentPage, t } = this;
    return (
      <div class="lin-pagintaion-jumpe">
        <span>{t('LinViewUI.Pagination.goto')}</span>
        <input
          min="1"
          max={totalPage}
          onKeyup={gotoPageByEnter}
          onBlur={gotoPageByBlur}
          value={currentPage}
          class="lin-pagintaion-input"
          type="number"
        />
        <span>{t('LinViewUI.Pagination.page')}</span>
      </div>
    );
  }

  render (h) {
    const { background, layoutList } = this;
    return (
      <div
        class={['lin-pagination', { 'lin-pagination-background': background }]}
      >
        {layoutList.map(fnstr => {
          const fn = this[`render${fnstr}`];
          return fn ? fn(h) : null;
        })}
      </div>
    );
  }
}
