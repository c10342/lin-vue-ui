import Message from './src/message';

(Message as any).install = (Vue) => {
  Vue.prototype.$Message = Message;
};

export default Message;
