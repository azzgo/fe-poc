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
    let element = document.createElement(node.nodeName);
    node.elm = element;

    setAttributes(node, element);

    // 判断节点是有子代 DOM 还是只有文字
    if (node.text) {
      element.appendChild(document.createTextNode(node.text));
    } else if (node.childrens) {
      let index = 0;

      while (node.childrens[index]) {
        let currentNode = node.childrens[index];
        if (checkTextNode(currentNode)) {
          element.appendChild(document.createTextNode(currentNode.text));
        } else {
          element.appendChild(createElement(currentNode));
        }
        index++;
      }
    }

    return element;
  }

  function patch(newNode, oldNode) {
    return oldNode.elm.parentNode.replaceChild(createElement(newNode), oldNode.elm);
  }

  function checkTextNode(currentNode) {
    return currentNode.nodeName == null && currentNode.text != null && !currentNode.childrens;
  }

  function setAttributes(node, element) {
    if (node.atributes) {
      for (let attr of Object.keys(node.atributes)) {
        if (attr.match(/^on/)) {
          element.addEventListener(attr.substring(2).toLowerCase(), node.atributes[attr], false);
        }
        else {
          element.setAttribute(attr, node.atributes[attr]);
        }
      }
    }
  }
})();
