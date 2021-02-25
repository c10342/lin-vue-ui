import Message from './message.vue';

export interface Options {
  type?: string;
  showClose?: boolean;
  message?: string;
  iconClass?: string;
  dangerouslyUseHTMLString?: boolean;
  customClass?: string;
  center?: boolean;
  onClose?: () => void;
  offset?: number;
  duration?: number;
}

export interface Instance extends Message {
  top: number;
  show: boolean;
  _uid?: string;
  onCloseClick:()=>void
}
