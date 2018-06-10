

IE8 spike 结论

1. babel 需要配置，将es6 和es5 的相关关键字 es3ify 化
2. React的组件不能通过结构拿到，需要使用 React.Component 的方式进行类基础，原因不明
3. generator 不能用，redux saga 启用
4. react router v4, react-redux 最新版均不能使用，原因是生成代码中有 Symbol 元素
5. axios 不能用，因其导出方式的问题，module.exports.default，default 为关键字，es3ify 仅对 export default 进行处理