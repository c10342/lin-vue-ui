import Button from './src/button';

(Button as any).install = (Vue) => Vue.component(Button.name, Button);

export default Button;
