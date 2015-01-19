'use strict';
angular.module('<%= module %>', [
  'ui.router'
])
.config(function ($stateProvider, $urlRouterProvider) {

  console.log('Allo! Allo from your module: ' + '<%= module %>');
  <% if (options.sample === 'start') {%>
  // some basic routing
  $urlRouterProvider.otherwise('/start');
  $stateProvider
    .state('start', {
      url: '/start',
      templateUrl: 'partials/start.html',
      controller: 'StartCtrl'
    });
  <%} else { %>
  // some basic routing
  $stateProvider
    .state('<%= fileName %>', {
      url: '/<%= fileName %>',
      templateUrl: 'partials/<%= fileName %>.html',
      controller: 'StartCtrl'
    });
  <%} %>

  // TODO: do your thing
});
