!(function() {
  define('h', [], function() {
    return h;
  });

  var key = 0;
  function h(nodeName, atributes, childrens) {
    return new VNode(nodeName, atributes, key++, childrens);
  }

  function VNode(nodeName, atributes, key, childrens) {
    this.nodeName = nodeName;
    this.atributes = atributes;
    if (childrens) {
      if (Array.isArray(childrens)) {
        this.childrens = childrens.map(transFormChildNode);
      } else {
        this.childrens = [transFormChildNode(childrens)];
      }
    }
    this.key = key;
    this.elm = null;

    function transFormChildNode(child) {
      if (typeof child === 'string')
        return new VNode(nodeName, { text: child }, key++, null);
      return child;
    }
  }
})();
