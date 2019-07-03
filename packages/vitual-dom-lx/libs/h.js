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

      if (typeof childrens === 'string') {
        this.text = childrens
      } else {
        if (Array.isArray(childrens)) {
          this.childrens = childrens.map(this.transFormChildNode)
        } else {
          this.childrens = [this.transFormChildNode(childrens)]
        }
      }
    }

    transFormChildNode(child) {
      if (typeof child === 'string')
        return new VNode(null, null, child);
      return child;
    }
  }
})();
