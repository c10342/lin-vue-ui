// import Vue from "vue";
import LoadingBar from './loading-bar.vue';
import './style.scss';
import { LoadingBarOptions } from './type';

class LoadingBarConstructor extends LoadingBar {
  timer: number | null = null;

  removeTimer: number | null = null;

  totalProgress = 0

  percentNum = 0

  speed = 5

  isError = false

  vm:LoadingBar|null = null

  config (options:LoadingBarOptions) {
    Object.keys(options).forEach(key => {
      if (key === 'isError' || key === 'totalProgress') {
        return;
      }
      this[key] = options[key];
    });
  }

  init () {
    this.clearTimer();
    this.totalProgress = 0;
    this.isError = false;
    this.vm = this.$mount();
    document.body.appendChild(this.vm.$el);
    return this;
  }

  start () {
    this.init();

    this.timer = window.setInterval(() => {
      if (this.totalProgress < 90) {
        this.totalProgress += (this.percentNum || Math.random()) * this.speed;
      }
    }, 100);
  }

  end () {
    // timer || this.init();
    if (!this.timer) {
      this.init();
    }
    this.totalProgress = 100;
    this.clearRemoveTimer();
    this.removeTimer = window.setTimeout(() => {
      this.clearTimer();
      if (this.vm) {
        document.body.removeChild(this.vm.$el);
      }
    }, 200);
  }

  error () {
    this.end();
    this.totalProgress = 100;
    this.isError = true;
  }

  clearTimer () {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  clearRemoveTimer () {
    if (this.removeTimer) {
      clearTimeout(this.removeTimer);
      this.removeTimer = null;
    }
  }
}

const LLoadingBar = () => new LoadingBarConstructor();

export default LLoadingBar();

// const LoadingBarConstructor = Vue.extend(LoadingBar);

// let timer = null;

// let removeTimer = null;

// const LLoadingBar = () => new LoadingBarConstructor();

// LoadingBarConstructor.prototype.config = function config (options) {
//   Object.keys(options).forEach((key) => {
//     if (key === 'isError' || key === 'totalProgress') {
//       return;
//     }
//     this[key] = options[key];
//   });
// };

// LoadingBarConstructor.prototype.init = function init () {
//   clearTimeout(timer);
//   this.totalProgress = 0;
//   this.isError = false;
//   this.vm = this.$mount();
//   document.body.appendChild(this.vm.$el);
//   return this;
// };

// LoadingBarConstructor.prototype.start = function start () {
//   this.init();

//   timer = setInterval(() => {
//     if (this.totalProgress < 90) {
//       this.totalProgress += (this.percentNum || Math.random()) * this.speed;
//     }
//   }, 100);
// };

// LoadingBarConstructor.prototype.end = function end () {
//   // timer || this.init();
//   if (!timer) {
//     this.init();
//   }
//   this.totalProgress = 100;
//   clearTimeout(removeTimer);
//   removeTimer = setTimeout(() => {
//     clearTimeout(timer);
//     timer = null;
//     document.body.removeChild(this.vm.$el);
//   }, 200);
// };

// LoadingBarConstructor.prototype.error = function error () {
//   this.end();
//   this.totalProgress = 100;
//   this.isError = true;
// };

// export default LLoadingBar();
