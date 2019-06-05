require(['render', 'h'], function(render, h) {
  let vDOM = createVDOM(h, { name: '' });
  render(document.getElementById('app'), vDOM);

  function createVDOM(h, state) {
    return h('div', null, [
      h('h1', null, 'Virtual DOM 实现'),
      h('p', null, 'Created By Yishan'),
      h('input', {
        placeholder: '请输入相关值',
        value: state.name,
        onInput: function(event) {
          state.name = event.target.value;
          render(document.getElementById('app'), createVDOM(h, state), vDOM);
        }
      }),
      h('p', null, '你输入的是: ' + state.name),
    ]);
  }
});
