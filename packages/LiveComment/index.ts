import LiveComment from './src/live-comment';

(LiveComment as any).install = (Vue) => Vue.component(LiveComment.name, LiveComment);

export default LiveComment;
