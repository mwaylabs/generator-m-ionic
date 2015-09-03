'use strict';
angular.module('<%= moduleName %>')
.directive('<%= directiveName %>', function () {
  return {
    template: '<div></div>',
    restrict: 'E',
    link: function postLink (scope, element, attrs) {
      element.text('this is the <%= directiveName %> directive', attrs);
    }
  };
});
