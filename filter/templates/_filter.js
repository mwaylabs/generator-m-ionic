'use strict';
/**
 * @ngdoc filter
 * @name .filter:<%= filterName %>
 * @function
 */
angular.module('<%= moduleName %>')
.filter('<%= filterName %>', function () {
  return function (input) {
    return '<%= filterName %> filter:' + input;
  };
});
