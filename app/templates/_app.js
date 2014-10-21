'use strict';
angular.module('<%= answers.appName %>', [
  'ionic',
  'ui.router'<% if (answers.includeConstant) {%>,
  '<%= answers.appName %>.config'
   <% } %>
  // TODO: load other modules selected during generation
])
.config(function ($stateProvider, $urlRouterProvider<% if (answers.includeConstant) {%>, VERSION<% } %>) {

  console.log('Allo! Allo from Angular!');
  <% if (answers.includeConstant) {%>
    console.log('Version',VERSION);
  <% } %>
  // some basic routing
  $urlRouterProvider.otherwise('/start');
  $stateProvider
    .state('start', {
      url: '/start',
      templateUrl: 'partials/start.html',
      controller: 'StartCtrl'
    });

  // TODO: do your thing
});
