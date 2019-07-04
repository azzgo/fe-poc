!(function() {
  define('h', [], function() {
    return h;
  });

  define('hUtils', [], function() {
    return {
      checkIsTextNode: checkIsTextNode,
      checkIsNode: checkIsNode,
      checkIsElementNode: checkIsElementNode,
    };
  });

  function h(nodeName, atributes, childrens) {
    return new VNode(nodeName, atributes, childrens);
  }

  class VNode {
    constructor(nodeName, atributes, childrens) {
      this.nodeName = nodeName;
      this.atributes = atributes;
      this.childrens = childrens;
      this.elm = null;
      this.parentVNode = null;

      if (!childrens) {
        return;
      }

      if (typeof childrens === 'string') {
        if (!nodeName) {
          this.childrens = childrens;
        } else {
          this.childrens = [new VNode(null, null, childrens)];
        }
      } else if (Array.isArray(childrens)) {
        this.childrens = childrens.map(item =>
          this.transFormChildNode(item, this),
        );
      } else {
        this.childrens = [this.transFormChildNode(childrens, this)];
      }
    }

    transFormChildNode(child, currentNode) {
      let newVNode;
      if (typeof child === 'string') {
        newVNode = new VNode(null, null, child);
      } else {
        newVNode = child;
      }

      newVNode.parentVNode = currentNode;
      return newVNode;
    }
  }

  /**
   * @param {VNode} currentNode
   */
  function checkIsNode(currentNode) {
    return currentNode instanceof VNode;
  }

  /**
   * @param {VNode} currentNode
   */
  function checkIsTextNode(currentNode) {
    if (!checkIsNode(currentNode)) {
      return false;
    }
    return currentNode.nodeName == null && typeof currentNode.childrens === 'string';
  }

  /**
   * @param {VNode} currentNode
   */
  function checkIsElementNode(currentNode) {
    if (!checkIsNode(currentNode)) {
      return false;
    }

    return !!currentNode.nodeName;
  }
})();
