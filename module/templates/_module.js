'use strict';
angular.module('<%= moduleName %>', [
  'ionic',
  'ngCordova',
  'ui.router',
  // TODO: load other modules selected during generation
])
.config(function ($stateProvider<% if (options.sample === 'start') {%>, $urlRouterProvider<%} %>) {

  console.log('Allo! Allo from your module: ' + '<%= moduleName %>');
<% if (options.sample === 'start') {%>
  $urlRouterProvider.otherwise('/main');
<%}%>
  // some basic routing
  $stateProvider
    .state('<%= moduleFolder %>', {
      url: '/<%= moduleFolder %>',
      templateUrl: '<%= moduleFolder %>/templates/start.html',
      controller: 'StartCtrl'
    });
  // TODO: do your thing
});
