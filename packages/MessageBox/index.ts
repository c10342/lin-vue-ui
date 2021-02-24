import MessageBox from './src/message-box';

(MessageBox as any).install = (Vue) => {
  Vue.prototype.$MessageBox = MessageBox;
};

export default MessageBox;
