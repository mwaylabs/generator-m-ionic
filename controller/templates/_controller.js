'use strict';
angular.module('<%= moduleName %>')
.controller('<%= controllerName %>', function (<% if(options.template === 'debug') { %><%= serviceName %>, <%= configName %><% } %>) {

<% if (options.template === 'debug') {-%>
  // bind data from services
  this.someData = <%= serviceName %>.someData;
  this.ENV = <%= configName %>.ENV;
  this.BUILD = <%= configName %>.BUILD;

<% } -%>
  console.log('Hello from your Controller: <%= controllerName %> in module <%= moduleName%>:. This is your controller:', this);
  // TODO: do your controller thing

});
