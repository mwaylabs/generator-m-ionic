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

  // ROUTING with ui.router
  $stateProvider
    // this state is placed in the <ion-nav-view> in the index.html
    .state('<%= moduleFolder %>', {
      url: '/<%= moduleFolder %>',
<% if (answers.template === 'blank') { -%>
      template: '<ion-view view-title="<%= moduleName %>"></ion-view>',
      // templateUrl: '<%= moduleFolder %>/templates/<someTemplate>.html',
      // controller: 'SomeCtrl as ctrl'
<%} -%>
      // .state('<%= moduleFolder %>', {
      //   url: '/<%= moduleFolder %>',
      //   templateUrl: '<%= moduleFolder %>/templates/<%= fileName %>.html',
      //   controller: '<%= controllerName %> as ctrl'
    });
});
