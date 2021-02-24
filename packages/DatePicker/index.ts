import DatePicker from './src/date-picker';

(DatePicker as any).install = (Vue) => Vue.component(DatePicker.name, DatePicker);

export default DatePicker;
