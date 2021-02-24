import DateAxis from './src/date-axis';

(DateAxis as any).install = (Vue) => Vue.component(DateAxis.name, DateAxis);

export default DateAxis;
