'use strict';
angular.module('<%= moduleName %>', [
  'ionic',
  'ngCordova',
  'ui.router',
  // TODO: load other modules selected during generation
])
.config(function ($stateProvider<% if (options.mainModule) {%>, $urlRouterProvider<%} %>) {

  console.log('Allo! Allo from your module: ' + '<%= moduleName %>');
<% if (options.mainModule) { -%>

  $urlRouterProvider.otherwise('/<%= moduleFolder %>');
<%} -%>

  // some basic routing
  $stateProvider
    .state('<%= moduleFolder %>', {
      url: '/<%= moduleFolder %>',
      templateUrl: '<%= moduleFolder %>/templates/<%= fileName %>.html',
      controller: '<%= controllerName %> as ctrl'
    });
  // TODO: do your thing
});
