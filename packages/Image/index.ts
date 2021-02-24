import Image from './src/image';

(Image as any).install = (Vue) => Vue.component(Image.name, Image);

export default Image;
