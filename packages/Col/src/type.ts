
import Row from '../../Row/index';

export interface Style{
    paddingLeft?: string
    paddingRight?:string
}

declare module 'vue/types/vue' {
    interface Vue {
        RowInstance: Row;
    }
  }
