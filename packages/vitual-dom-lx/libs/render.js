!function(global) {
  var exports = render


  function render(rootEl, node) {
    rootEl.appendChild(createElement(node))
  }


  function createElement() {
    var element = document.createElement('div')
    element.appendChild(document.createTextNode('hello world'))
    return element
  }
  global.render = exports
}(window)