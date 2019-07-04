require(['render', 'h'], function(render, h) {
  let vDOM = createVDOM(h, {
    name: '',
    list: ['这是一条朴实无华的列表项'],
    fontSize: 12,
  });

  render(document.getElementById('app'), vDOM);

  function createVDOM(h, state) {
    return h('div', null, [
      h('h1', null, 'Virtual DOM 实现'),
      h('p', null, 'Created By Yishan'),
      h('h3', null, '输入绑定'),
      h('div', null, [
        h('input', {
          placeholder: '请输入相关值',
          value: state.name,
          onInput: function(event) {
            state.name = event.target.value;
            let newVDOM = createVDOM(h, state);
            render(document.getElementById('app'), newVDOM, vDOM);
            vDOM = newVDOM;
          },
        }),
        h('p', null, '你输入的是: ' + state.name),
      ]),
      h('h3', null, '列表操作'),
      ...state.list.map(item => h('p', null, item)),
      h(
        'button',
        {
          onClick: function(event) {
            state.list.push('这是一条朴实无华的列表项');
            let newVDOM = createVDOM(h, state);
            render(document.getElementById('app'), newVDOM, vDOM);
            vDOM = newVDOM;
          },
        },
        '+',
      ),
      h(
        'button',
        {
          onClick: function(event) {
            state.list.pop();
            let newVDOM = createVDOM(h, state);
            render(document.getElementById('app'), newVDOM, vDOM);
            vDOM = newVDOM;
          },
        },
        '-',
      ),
      h('p', { style: `font-size: ${state.fontSize}px` }, '这是一条朴素的文字'),
      h(
        'button',
        {
          onClick: function(event) {
            state.fontSize++;
            let newVDOM = createVDOM(h, state);
            render(document.getElementById('app'), newVDOM, vDOM);
            vDOM = newVDOM;
          },
        },
        '文字变大',
      ),
    ]);
  }
});
