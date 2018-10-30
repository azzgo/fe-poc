# Angular 1.2 Compatible with IE

为了兼容 IE 8 折腾的脚手架

为了尽可能减少依赖（主要是兼容库不好找，%>_<%），并能引入工程管理

目前脚手架相关技术栈

1. angularjs 1.2 + angularjs router 1.2 不使用 ui-router 的原因是我不知道哪个版本是兼容的，而且看起来 ui-router 0.3.x 以下的文档已经废弃了，几乎不能使用
2. browserify， 折腾 webpack 中发现 webpack 会生成很多不兼容代码，而 webpack 1.x 的文档也是烂透了，相关 1.x 的生态也不知道兼不兼容，放弃了 es6 书写工程后，发现 browserify 仅仅引入了 commonjs 的模块化机制，不妨碍在 IE8 上的执行，果断使用
3. gulp 相关生态，构建开发使用
4. lodash 3.x 兼容 IE8，并且因 IE8 上有很多 js 方法不存在，可以方便开发。

