# Switch 开关

[[toc]]

---

## 基础用法

使用`v-model`进行双向数据绑定即可。

:::demo

```vue
<template>
  <lin-switch v-model="value1" />
</template>

<script>
export default {
  data() {
    return {
      value1: false,
    };
  },
};
</script>
```

:::

## 背景颜色

使用`activeColor`和`inactiveColor`属性即可设置开关的背景颜色。

:::demo

```vue
<template>
  <lin-switch v-model="value2" active-color="green" inactive-color="red" />
</template>

<script>
export default {
  data() {
    return {
      value2: false,
    };
  },
};
</script>
```

:::

## 禁用状态

使用`disabled`属性即可设置开关为不可用状态。

:::demo

```vue
<template>
  <lin-switch v-model="value3" disabled />
</template>

<script>
export default {
  data() {
    return {
      value3: false,
    };
  },
};
</script>
```

:::

## 原生属性

目前可以绑定原生属性的只有`name`。

:::demo

```vue
<template>
  <lin-switch v-model="value4" name="userName" />
</template>

<script>
export default {
  data() {
    return {
      value4: false,
    };
  },
};
</script>
```

:::

## 属性

| 参数            | 说明                  | 类型    | 可选值 | 默认值 |
| --------------- | --------------------- | ------- | ------ | ------ |
| value / v-model | 绑定值                | Boolean | —      | false  |
| activeColor     | switch 打开时的背景色 | String  | —      | —      |
| inactiveColor   | switch 关闭时的背景色 | String  | —      | —      |
| name            | 原生属性 name         | String  | —      | —      |
| disabled        | 是否禁用              | Boolean | —      | false  |
