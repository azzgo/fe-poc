!(function() {
  define('render', ['hUtils'], function(hUtils) {
    return render;

    function render(rootEl, node, oldNode) {
      if (oldNode == null) {
        rootEl.appendChild(createElement(node));
      } else {
        patch(node, oldNode, rootEl);
      }
    }
  
    /**
     * @param {VNode} node 
     * @returns {HTMLElement}
     */
    function createElement(node) {
      if (!hUtils.checkIsNode(node)) {
        throw new Error('错误的 node 节点，检查创建的 vDom 是否正确!');
      }
  
      if (hUtils.checkIsTextNode(node)) {
        node.elm = document.createTextNode(node.childrens)
        return node.elm;
      }
  
      let element = document.createElement(node.nodeName);
      node.elm = element;
  
      setAttributes(node, element);
  
      if (Array.isArray(node.childrens)) {
        let index = 0;
  
        while (node.childrens[index]) {
          let currentNode = node.childrens[index];
          element.appendChild(createElement(currentNode));
          index++;
        }
      }
  
      return element;
    }
  
    function patch(newNode, oldNode, parrentElement) {
      if (newNode && !oldNode) {
        parrentElement.appendChild(createElement(newNode));
        return;
      }

      if (!newNode && oldNode) {
        parrentElement.removeChild(oldNode.elm);
        return;
      }

      // 如果节点不是同一类节点，直接替换，不用继续对比
      if (newNode.nodeName !== oldNode.nodeName) {
        parrentElement.replaceChild(createElement(newNode), oldNode.elm);
        return;
      }

      // 对文本节点进行相关比对
      if (hUtils.checkIsTextNode(newNode) && hUtils.checkIsTextNode(oldNode) && newNode.childrens === oldNode.childrens) {
        newNode.elm = oldNode.elm;
        return;
      }
  
      if (
        hUtils.checkIsTextNode(newNode) && hUtils.checkIsTextNode(oldNode) && newNode.childrens !== oldNode.childrens
        || hUtils.checkIsTextNode(newNode) && !hUtils.checkIsTextNode(oldNode)
        || !hUtils.checkIsTextNode(newNode) && hUtils.checkIsTextNode(oldNode)

      ) {
        newNode.elm = oldNode.elm;
        newNode.elm.nodeValue = newNode.childrens;
        return;
      }

      // 在假定两个节点都不是文本节点，对嵌套节点进行比对
      if (!Array.isArray(newNode.childrens) && !Array.isArray(oldNode.childrens)) {
        if (newNode.atributes) {
          setAttributes(newNode, oldNode.elm, oldNode);
        }
        newNode.elm = oldNode.elm;
        return;
      }

      if (Array.isArray(newNode.childrens) && !Array.isArray(oldNode.childrens)) {
        parrentElement.appendChild(createElement(newNode));
        return;
      }

      if (!Array.isArray(newNode.childrens) && Array.isArray(oldNode.childrens)) {
        parrentElement.removeChild(oldNode.elm);
        return;
      }
  
      if (Array.isArray(newNode.childrens) && Array.isArray(oldNode.childrens)) {
        if (newNode.atributes) {
          setAttributes(newNode, oldNode.elm, oldNode);
        }
  
        // 保证新节点都是有 dom 引用
        newNode.elm = oldNode.elm;

        let index = 0;
        while (index < newNode.childrens.length) {
          patch(newNode.childrens[index], oldNode.childrens[index], newNode.elm);
          index++;
        }

        if (index < oldNode.childrens.length) {
          while(index < oldNode.childrens.length) {
            newNode.elm.removeChild(oldNode.childrens[index].elm)
            index++;
          }
        }

        return;
      }
    }
  
    function setAttributes(node, element, oldNode) {
      if (node.atributes && (!oldNode || !oldNode.atributes)) {
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

      if (node.atributes && oldNode && oldNode.atributes) {
        for (let attr of Object.keys(node.atributes)) {
          if (node.atributes[attr] === oldNode.atributes[attr]) {
            continue;
          }
  
          // 确保函数不一致
          if (
            typeof node.atributes[attr] === 'function' &&
            typeof oldNode.atributes[attr] === 'function' &&
            node.atributes[attr].toString() === oldNode.atributes[attr].toString()
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
  });
})();
