'use strict';
angular.module('<%= moduleName %>')
.controller('<%= controllerName %>', function ($scope<% if(options.sample === 'start') { %>, Start<% } %>) {
  console.log('Hello from your Controller: <%= controllerName %> in module <%= moduleName%>:. This is your scope:', $scope);
<% if(options.sample === 'start') {%>
  // bind data from service
  $scope.someData = Start.someData;
<% } %>
  // TODO: do your controller thing
});
