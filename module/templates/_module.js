'use strict';
angular.module('<%= moduleName %>', [
  'ionic',
  'ngCordova',
  'ui.router',
  // TODO: load other modules selected during generation
])
.config(function ($stateProvider<% if (options.mainModule) {%>, $urlRouterProvider<%} %>) {

  // ROUTING with ui.router
<% if (options.mainModule && answers.template === 'blank') { -%>
  $urlRouterProvider.otherwise('/<%= moduleFolder %>');
<%} else if (options.mainModule) { -%>
  $urlRouterProvider.otherwise('/<%= moduleFolder %>/list');
<%} -%>
  $stateProvider
    // this state is placed in the <ion-nav-view> in the index.html
    .state('<%= moduleName %>', {
      url: '/<%= moduleFolder %>',
<% if (answers.template === 'blank') { -%>
      template: '<ion-view view-title="<%= moduleName %>"></ion-view>',
      // templateUrl: '<%= moduleFolder %>/templates/<someTemplate>.html',
      // controller: 'SomeCtrl as ctrl'
    });
<%} else if (answers.template === 'sidemenu') { -%>
      abstract: true,
      templateUrl: '<%= moduleFolder %>/templates/menu.html',
      controller: '<%= menuCtrlName %> as menu'
    })
      .state('<%= moduleName %>.list', {
        url: '/list',
        views: {
          'pageContent': {
            templateUrl: '<%= moduleFolder %>/templates/list.html',
            // controller: '<someCtrl> as ctrl'
          }
        }
      })
      .state('<%= moduleName %>.listDetail', {
        url: '/list/detail',
        views: {
          'pageContent': {
            templateUrl: '<%= moduleFolder %>/templates/list-detail.html',
            // controller: '<someCtrl> as ctrl'
          }
        }
      })
      .state('<%= moduleName %>.debug', {
        url: '/debug',
        views: {
          'pageContent': {
            templateUrl: '<%= moduleFolder %>/templates/debug.html',
            controller: '<%= debugCtrlName %> as ctrl'
          }
        }
      });
<%} else if (answers.template === 'tabs') { -%>
      abstract: true,
      templateUrl: '<%= moduleFolder %>/templates/tabs.html'
    })
      .state('<%= moduleName %>.list', {
        url: '/list',
        views: {
          'tab-list': {
            templateUrl: '<%= moduleFolder %>/templates/list.html',
            // controller: 'SomeCtrl as ctrl'
          }
        }
      })
      .state('<%= moduleName %>.listDetail', {
        url: '/list/detail',
        views: {
          'tab-list': {
            templateUrl: '<%= moduleFolder %>/templates/list-detail.html',
            // controller: 'SomeCtrl as ctrl'
          }
        }
      })
      .state('<%= moduleName %>.debug', {
        url: '/debug',
        views: {
          'tab-debug': {
            templateUrl: '<%= moduleFolder %>/templates/debug.html',
            controller: '<%= debugCtrlName %> as ctrl'
          }
        }
      });
<% } -%>
});
