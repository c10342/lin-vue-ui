const exportObj = {};
const testComps = require.context('./', false, /\ts$/);

testComps.keys().forEach((key) => {
  const fileName = key.replace(/(.*\/)*([^.]+).*/gi, '$2');
  if (fileName === 'index') {
    return;
  }
  const componentEntity = testComps(key).default;
  exportObj[fileName] = componentEntity;
});

export default exportObj;
