import LoadingConstruct from './construct';

let instance:LoadingConstruct|null = null;

let timer:number|null = null;

export default {
  open (options) {
    if (!instance) {
      instance = new LoadingConstruct();
    }

    if (!options.target) {
      options.target = document.body;
    }
    instance.open({ ...options });

    if (options.time) {
      if (timer) {
        clearTimeout(timer);
      }
      timer = window.setTimeout(() => {
        instance?.close();
      }, options.time);
    }

    return instance;
  },
  close () {
    if (instance) {
      if (timer) {
        clearTimeout(timer);
      }
      instance.close();
      instance = null;
    }
  }
};
