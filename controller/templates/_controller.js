'use strict';
angular.module('<%= moduleName %>')
.controller('<%= controllerName %>', function (<% if(options.sample === 'start') { %><%= serviceName %>, <%= configName %><% } %>) {

<% if (options.sample === 'start') {-%>
  // bind data from service
  this.someData = <%= serviceName %>.someData;
  this.ENV = <%= configName %>.ENV;
  this.BUILD = <%= configName %>.BUILD;

<% } -%>
  console.log('Hello from your Controller: <%= controllerName %> in module <%= moduleName%>:. This is your controller:', this);
  // TODO: do your controller thing

});
