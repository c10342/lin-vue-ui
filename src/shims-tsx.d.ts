
// 为JSX组件模块补充类型声明
import Vue, { VNode } from 'vue';

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    type Element = VNode
    // tslint:disable no-empty-interface
    type ElementClass = Vue
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}
