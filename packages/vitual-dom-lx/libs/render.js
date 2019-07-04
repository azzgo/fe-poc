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
    // 如果新节点存在
    if (newNode.nodeName) {
      if (
        newNode.nodeName !== oldNode.nodeName ||
        (newNode.text && newNode.text !== oldNode.text)
      ) {
        oldNode.elm.parentNode.replaceChild(
          createElement(newNode),
          oldNode.elm,
        );
        return;
      }
      // 检查 Attributes
      if (newNode.atributes && oldNode.elm) {
        if (oldNode.atributes) {
          setAttributes(newNode, oldNode.elm, oldNode);
        } else {
          setAttributes(newNode, oldNode.elm);
        }
      }

      // 保证新节点都是有 dom 引用
      newNode.elm = oldNode.elm;
    }

    if (checkTextNode(newNode) && newNode.text !== oldNode.text) {
      oldNode.elm.parentNode.replaceChild(
        document.createTextNode(newNode.text),
        oldNode.elm,
      );
      return;
    }

    if (newNode.childrens && oldNode.childrens) {
      if (newNode.childrens.length === oldNode.childrens.length) {
        let index = 0;
        while (index < newNode.childrens.length) {
          patch(newNode.childrens[index], oldNode.childrens[index]);
          index++;
        }
        newNode.elm = oldNode.elm;
        return;
      } else {
        oldNode.elm.parentNode.replaceChild(
          createElement(newNode),
          oldNode.elm,
        );
        return;
      }
    }
  }

  function checkTextNode(currentNode) {
    return (
      currentNode.nodeName == null &&
      currentNode.text != null &&
      !currentNode.childrens
    );
  }

  function setAttributes(node, element, oldNode) {
    if (node.atributes && !oldNode) {
      for (let attr of Object.keys(node.atributes)) {
        if (attr.match(/^on/)) {
          element.addEventListener(
            attr.substring(2).toLowerCase(),
            node.atributes[attr],
            false,
          );
        } else {
          element.setAttribute(attr, node.atributes[attr]);
        }
      }
    }
    if (node.atributes && oldNode) {
      for (let attr of Object.keys(node.atributes)) {
        if (node.atributes[attr] === oldNode.atributes[attr]) {
          continue;
        }

        // 确保函数不一致
        if (
          typeof node.atributes[attr] === 'function'
          && typeof oldNode.atributes[attr] === 'function'
          && node.atributes[attr].toString() === oldNode.atributes[attr].toString()
          ) {
            continue;
        }
        if (attr.match(/^on/)) {
          element.removeEventListener(
            attr.substring(2).toLowerCase(),
            oldNode.atributes[attr],
            false,
          );
          element.addEventListener(
            attr.substring(2).toLowerCase(),
            node.atributes[attr],
            false,
          );
        } else {
          element.setAttribute(attr, node.atributes[attr]);
        }
      }
    }
  }
})();
