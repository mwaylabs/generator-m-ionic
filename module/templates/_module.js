'use strict';
angular.module('<%= module %>', [
  'ionic',
  'ngCordova',
  'ui.router',
  // TODO: load other modules selected during generation
])
.config(function ($stateProvider<% if (options.sample === 'start') {%>, $urlRouterProvider<%} %>) {

  console.log('Allo! Allo from your module: ' + '<%= module %>');
<% if (options.sample === 'start') {%>
  // some basic routing
  $urlRouterProvider.otherwise('/start');
  $stateProvider
    .state('start', {
      url: '/start',
      templateUrl: '<%= fileName %>/templates/start.html',
      controller: 'StartCtrl'
    });
<%} else { %>
  // some basic routing
  $stateProvider
    .state('<%= fileName %>', {
      url: '/<%= fileName %>',
      templateUrl: '<%= fileName %>/templates/start.html',
      controller: 'StartCtrl'
    });
<%} %>
  // TODO: do your thing
});
