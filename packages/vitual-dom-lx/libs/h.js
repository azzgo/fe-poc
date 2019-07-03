!(function() {
  define('h', [], function() {
    return h;
  });

  function h(nodeName, atributes, childrens) {
    return new VNode(nodeName, atributes, childrens);
  }

  class VNode {
    constructor(nodeName, atributes, childrens) {
      this.nodeName = nodeName;
      this.atributes = atributes;
      this.elm = null;
      this.parentVNode = null;

      if (typeof childrens === 'string') {
        this.text = childrens;
      } else if (childrens) {
        if (Array.isArray(childrens)) {
          this.childrens = childrens.map(item =>
            this.transFormChildNode(item, this),
          );
        } else {
          this.childrens = [this.transFormChildNode(childrens, this)];
        }
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
})();
