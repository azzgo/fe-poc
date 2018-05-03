# 技术栈

使用 Express + handlebar + jquery 技术栈，目的是为了兼容 IE8

UI 样式 使用 Bootstrap 3 作为基础样式

## CSS 命名规范

使用 BEM 规则，因为无法使用现代框架，CSS module 等相关技术不能很好引用，需要使用一套可用规范防止 css 样式冲突问题。

BEM 规则（<https://github.com/Tencent/tmt-workflow/wiki/%E2%92%9B-%5B%E8%A7%84%E8%8C%83%5D--CSS-BEM-%E4%B9%A6%E5%86%99%E8%A7%84%E8%8C%83>）：

type-block__element_modifier

使用 块，元素，修饰器 三个实体开发组件

其中块作（block）为 CSS 命名空间使用，比如 .list
元素（element）块的子代元素，参考命名 .list__item
修饰符（modifier）可以理解为一个块的特定状态，标识着它持有一个特定的属性。比如 .list__item_active、.list_select

### CSS 兼容IE8坑

1. css 颜色中的 rgba 不能用，需要换成 #xxxx 的形式
2. ::before 与 ::after 不能在 IE8 上使用，请用别的方法
3. 圆角不能使用，现在使用 IE hack 脚本的方法，不完美，spiking 中
4. 渐变背景不能用
5. flex 布局不能用
