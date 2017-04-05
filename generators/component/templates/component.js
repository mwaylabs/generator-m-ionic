'use strict';
angular.module('<%= moduleName %>')
.component('<%= componentName %>', {
  templateUrl: '<%= componentTemplateUrl %>',
  restrict: 'EA',
  transclude: true,
  bindings: {
    content: '=',
  },
  controllerAs: 'ctrl',
  controller: function (
    $scope,
    $state
  ) {
    this.currentState = $state.current.name;
  }
});
