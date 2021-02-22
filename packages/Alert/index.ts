import Alert from './src/alert';

(Alert as any).install = (Vue) => Vue.component(Alert.name, Alert);

export default Alert;
