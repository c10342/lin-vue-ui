import Vue from 'vue';

import Message from './message.vue';

import './style.scss';

import { Options, Instance } from './type';

const MessageConstruct = Vue.extend(Message);

const instanceList: Instance[] = [];

function updateTop (index) {
  const length = instanceList.length - 1;
  for (let i = length; i > index; i--) {
    const instance = instanceList[i];
    const prevInstance = instanceList[i - 1];
    instance.top = prevInstance.top;
  }
}

class LinMessage {
  options: Options = {};

  instance: Instance | null = null;

  propsData = {};

  timer:number|null = null;

  constructor (options: Options | null) {
    this.options = options || {};
    this.initProps();
    this.init();
  }

  initProps () {
    const props: (keyof Options)[] = [
      'type',
      'showClose',
      'message',
      'iconClass',
      'dangerouslyUseHTMLString',
      'customClass',
      'center',
      'onClose',
      'offset'
    ];
    const propsData = {};
    props.forEach(prop => {
      if (prop in this.options) {
        propsData[prop] = this.options[prop];
      }
    });
    this.propsData = propsData;
  }

  init () {
    if (this.instance) {
      return;
    }
    this.instance = new MessageConstruct({
      propsData: {
        ...this.propsData
      }
    });
    if (this.instance) {
      instanceList.push(this.instance);
      this.instance.$mount();
      document.body.appendChild(this.instance.$el);
      this.instance.show = true;
      this.saveOffsetTop();
      this.setTimer();
      this.instance.$once('closed', () => {
        this.destory();
      });
    }
  }

  saveOffsetTop () {
    if (this.instance) {
      const index = instanceList.findIndex(
        // eslint-disable-next-line
        instance => instance._uid === this.instance?._uid
      );
      if (index > 0) {
        const prevInstance = instanceList[index - 1];
        const el = prevInstance.$el as HTMLElement;
        const height = el.offsetHeight;
        const top = el.offsetTop;
        this.instance.top = top + height;
      } else {
        this.instance.top = 0;
      }
    }
  }

  setTimer () {
    const { duration } = this.options as Options;
    if (duration !== 0) {
      this.timer = window.setTimeout(() => {
        this.close();
      }, duration || 3000);
    }
  }

  close () {
    if (this.instance && this.instance.show) {
      this.instance.show = false;
    }
  }

  destory () {
    if (this.instance) {
      const index = instanceList.findIndex(
        // eslint-disable-next-line
        instance => instance._uid === this.instance?._uid
      );
      if (index > -1) {
        updateTop(index);
        instanceList.splice(index, 1);
      }
      document.body.removeChild(this.instance.$el);
      this.instance.$destroy();
    }
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.instance = null;
  }
}

function createInstance (options) {
  const toString = Object.prototype.toString;
  if (toString.call(options).includes('Object')) {
    return new LinMessage(options);
  }
  return new LinMessage({
    message: options.toString()
  });
}

function createInstanceByType (options, type) {
  const toString = Object.prototype.toString;
  if (toString.call(options).includes('Object')) {
    return new LinMessage({
      ...options,
      type
    });
  }
  return new LinMessage({
    message: options.toString(),
    type
  });
}

createInstance.success = function success (options) {
  return createInstanceByType(options, 'success');
};

createInstance.info = function info (options) {
  return createInstanceByType(options, 'info');
};

createInstance.error = function error (options) {
  return createInstanceByType(options, 'error');
};

createInstance.warning = function warning (options) {
  return createInstanceByType(options, 'warning');
};

createInstance.closeAll = function closeAll () {
  instanceList.forEach(instance => {
    instance.onCloseClick();
  });
};

export default createInstance;
