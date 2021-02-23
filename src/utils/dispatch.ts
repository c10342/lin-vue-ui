/**
 * 向上通知
 * @param {Object} options
 */
function dispatch (context, options) {
  const { eventName, params, componentName } = options;

  let parent = context.$parent || context.$root;
  let name = parent.$options.name;

  while (parent) {
    if (componentName) {
      if (name === componentName) {
        parent.$emit(eventName, params);
      }
    } else {
      parent.$emit(eventName, params);
    }
    parent = parent.$parent;
    name = parent?.$options.name;
  }
}

export default dispatch;
