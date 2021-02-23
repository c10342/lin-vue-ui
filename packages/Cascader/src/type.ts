interface item{
    value:string,
    label:string,
}

export interface ShowFormat{
    (value:[]):string
}

export interface LazyLoad{
    (value:{level:number, data?:any}):Array<{value:string|number, label:string, leaf:number, id:string|number}>
}

export interface OptionsItem{
    value:string,
    label:string,
    children?:Array<item>
}

export interface Cascader{
    valueKey:string
    label:string
    disabled:string
    leaf:string
    children:string
    valueArr:[]
    lazy:boolean
    lazyLoad:LazyLoad
    hidePuop:()=>void
    setValue:(data:any, level:number)=>void
    [key:string]:any
}
