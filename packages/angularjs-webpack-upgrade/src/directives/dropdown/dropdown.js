/**
 * @module
 * @returns {ng.IDirective}
 */
module.exports = function () {
  return {
    require: '^ngModel',
    restrict: 'EA',
    scope: {
      options: '=',
      disabled: '='
    },
    template: require('./dropdown.html'),
    link: function (scope, elm, attr, ngModel) {
      var vm = scope
      init()


      function init () {
        vm.isOpen = false
        vm.filter = ''
        vm.activeOption = -1
        vm.select = select

        vm.toggleOpen = toggleOpen
        vm.filterOptions = filterOptions
        vm.stopPropagation = stopPropagation
        ngModel.$render = function () {
          vm.activeOption = ngModel.$viewValue
        }
      }

      function toggleOpen () {
        vm.isOpen = !vm.isOpen
      }


      function stopPropagation ($event) {
        $event.stopPropagation()
      }

      function filterOptions (filter) {
        return _.filter(vm.options, function (option) {
          return (option + '').indexOf(filter) !== -1
        })
      }

      function select (option) {
        vm.activeOption = option
        ngModel.$setViewValue(option)
        vm.isOpen = false
      }
    }
  }
}
