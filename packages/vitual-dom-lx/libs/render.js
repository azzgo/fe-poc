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
    if (node.atributes) {
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

    if (Array.isArray(node.childrens)) {
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

    node.elm = element;
    return element;
  }

  function patch(newNode, oldNode) {
    newNode.elm = oldNode.elm;
    if (checkTextNode(newNode) && checkTextNode(oldNode)) {
      patchTextNode(newNode, oldNode);
    } else if (Array.isArray(newNode.childrens)) {
      let newNodeIndex = 0;
      let oldNodeIndex = 0;

      while (
        newNodeIndex < newNode.childrens.length &&
        oldNodeIndex < oldNode.childrens.length
      ) {
        newNode.childrens[newNodeIndex].parrent = newNode;
        patch(newNode.childrens[newNodeIndex], oldNode.childrens[oldNodeIndex]);

        newNodeIndex++;
        oldNodeIndex++;
      }
    }

    function patchTextNode(newNode, oldNode) {
      if (newNode.text === oldNode.text) {
        return;
      } else {
        newNode.parrent.elm.innerHTML = '';
        newNode.parrent.elm.appendChild(document.createTextNode(newNode.text));
      }
    }
  }

  function checkTextNode(currentNode) {
    return currentNode.text != null && !currentNode.childrens;
  }
})();
