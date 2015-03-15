'use strict';
/**
* @ngdoc controller
* @name <%= moduleName %>:<%= controllerName %>
* @requires $scope
* @description add your description
*/
angular.module('<%= moduleName %>')
.controller('<%= controllerName %>', function <%= controllerName %>($scope<% if(options.sample === 'start') { %>, Start, Config<% } %>) {
  console.log('Hello from your Controller: <%= controllerName %> in module <%= moduleName%>:. This is your scope:', $scope);
<% if (options.sample === 'start') {%>
  /**
   * @ngdoc property
   * @name .#someData
   * @propertyOf <%= moduleName %>:<%= controllerName %>
   * @returns {string}
   */
  $scope.someData = Start.someData;
  /**
   * @ngdoc property
   * @name .#env
   * @propertyOf <%= moduleName %>:<%= controllerName %>
   * @returns {string}
   */
  $scope.env = Config.ENV;
<% } %>
  // TODO: do your controller thing
});
