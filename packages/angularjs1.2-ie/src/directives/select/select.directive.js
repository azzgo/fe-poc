/**
 * @module ysSelector
 * @return {ng.IDirective} directive
 */
module.exports = function () {
  /*@ngInject*/
  return {
    restrict: 'EA',
    require: '^ngModel',
    scope: {
      options: '=',
      isSearch: '@',
      disabled: '@',
      scrollHight: '@',
      placeholder: '@'
    },
    template: require('./select.directive.html'),
    controller: selectController,
    controllerAs: 'vm',
    link: function (scope) {
      var vm = scope.vm;

      init();

      function init () {
        vm.options = scope.options || [];
        vm.isSearch = !!scope.$eval(scope.isSearch);
        vm.disabled = !!scope.$eval(scope.disabled);
        vm.scrollHight = scope.scrollHight || 300;
        vm.placeholder = scope.placeholder || '';
        vm.isOpen = false;
        vm.filter = '';
        vm.activeIndex = -1;
      }
    }
  }
}


function selectController () {
  /*@ngInject*/
  var vm = this;
  vm.toggleOpen = toggleOpen;

  function toggleOpen () {
    vm.isOpen = !vm.isOpen;
  }
}
