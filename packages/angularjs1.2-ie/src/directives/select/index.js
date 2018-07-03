/**
 * @module ysSelector
 * @return {ng.IDirective} directive
 */
module.exports = function () {
  /*@ngInject*/
  return {
    restrict: 'EA',
    scope: {
      data: '=',
      name: '@'
    },
    template: require('./index.html'),
    postlink: function (scope, element) {
      $(element).find('.selectpicker').selectpicker('refresh')
    }
  }
}
