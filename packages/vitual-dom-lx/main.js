require(['render', 'h'], function(render, h) {
  const vDOM = h('div', null, [
    h('h1', null, 'Virtual DOM 实现'),
    h('p', null, 'Created By Yishan'),
    h('input', { placeholder: '请输入相关值' }),
    h('p', null, '你输入的是: ' + '')
  ]);
  render(document.getElementById('app'), vDOM);
});
