import defaultLang from 'src/locale/lang/zh-CN';
import Vue from 'vue';
import deepmerge from 'deepmerge';
import Format from 'src/locale/format';

const format = Format();
let lang = defaultLang;
let merged = false;
let i18nHandler = function i18nHandler (...reset) {
  const vuei18n = Object.getPrototypeOf(this || Vue).$t;
  if (typeof vuei18n === 'function' && !!(Vue as any).locale) {
    if (!merged) {
      merged = true;
      (Vue as any).locale(
        (Vue.config as any).lang,
        deepmerge(lang, (Vue as any).locale((Vue.config as any).lang) || {}, { clone: true })
      );
    }
    return vuei18n.apply(this, [...reset]);
  }
};

export const t = function t (path, options) {
  let value = i18nHandler.apply(this, [path, options]);
  if (value !== null && value !== undefined) return value;

  const array = path.split('.');
  let current = lang;

  for (let i = 0, j = array.length; i < j; i++) {
    const property = array[i];
    value = current[property];
    if (i === j - 1) return format(value, options);
    if (!value) return '';
    current = value;
  }
  return '';
};

export const use = function use (l) {
  // lang = l || lang;
  lang = l || lang;
};

export const i18n = function i18n (fn) {
  // i18nHandler = fn || i18nHandler;
  i18nHandler = fn || i18nHandler;
};

export default { use, t, i18n };
