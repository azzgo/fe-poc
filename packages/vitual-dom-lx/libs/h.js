!(function() {
  define('h', [], function() {
    return h;
  });

  function h(nodeName, atributes, childrens) {
    return new VNode(nodeName, atributes, null, null, childrens);
  }

  function VNode(nodeName, atributes, text, parrent, childrens) {
    this.nodeName = nodeName;
    this.atributes = atributes;
    this.text = text;
    this.parrent = parrent;
    if (childrens) {
      if (Array.isArray(childrens)) {
        this.childrens = childrens.map(transFormChildNode);
      } else {
        this.childrens = [transFormChildNode(childrens, this)];
      }
    }
    this.key = atributes && atributes.key ? atributes.key : null;
    this.elm = null;

    function transFormChildNode(child, currentNode) {
      if (typeof child === 'string')
        return new VNode(null, null, child, currentNode, null);
      return child;
    }
  }
})();
