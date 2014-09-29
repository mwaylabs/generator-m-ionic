'use strict';
angular.module('<%= answers.appName %>')
.controller('<%= name %>', function ($scope<% if(options.sample === 'start') { %>, Start<% } %>) {
  console.log('Hello from your <%= name %> controller. This is your scope:', $scope);
<% if(options.sample === 'start') {%>
  // bind data from service
  $scope.someData = Start.someData;
<% } %>
  // TODO: do your controller thing
});
