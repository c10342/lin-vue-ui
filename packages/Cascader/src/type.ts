import Cascader from './cascader';

interface item{
    value:string,
    label:string,
}

export interface ShowFormat{
    (value:[]):string
}

export interface OptionsListItem{
    value:string|number,
    label:string,
    leaf:number,
    id:string|number
}

export interface LazyLoad{
    (value:{level:number, data?:any}):Array<OptionsListItem>
}

export interface OptionsItem{
    value:string,
    label:string,
    children?:Array<item>
}

declare module 'vue/types/vue' {
    interface Vue {
      cascaderInstance: Cascader;
    }
  }
