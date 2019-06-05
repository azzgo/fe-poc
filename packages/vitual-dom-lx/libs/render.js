!(function() {
  define('render', [], function() {
    return render;
  });

  function render(rootEl, node, oldNode) {
    if (oldNode == null) {
      rootEl.appendChild(createElement(node));
    } else {
      patch(node, oldNode);
    }
  }

  function createElement(node) {
    var element = document.createElement(node.nodeName);
    if (node.atributes) {
      for (let attr of Object.keys(node.atributes)) {
        element.setAttribute(attr, node.atributes[attr]);
      }
    }

    if (Array.isArray(node.childrens)) {
      let index = 0;

      while (node.childrens[index]) {
        let currentNode = node.childrens[index];
        if (checkTextNode(currentNode)) {
          element.appendChild(
            document.createTextNode(currentNode.atributes.text),
          );
        } else {
          element.appendChild(createElement(currentNode));
        }
        index++;
      }
    }
    return element;

    function checkTextNode(currentNode) {
      return (
        currentNode.atributes &&
        currentNode.atributes.text &&
        !currentNode.childrens
      );
    }
  }

  function patch() {}
})();
