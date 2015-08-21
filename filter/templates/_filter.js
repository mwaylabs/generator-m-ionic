'use strict';
angular.module('<%= moduleName %>')
.filter('<%= filterName %>', function () {
  return function (input) {
    return '<%= filterName %> filter: ' + input;
  };
});
