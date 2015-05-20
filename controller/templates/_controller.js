'use strict';
angular.module('<%= moduleName %>')
.controller('<%= controllerName %>', function (<% if(options.sample === 'start') { %>Start, Config<% } %>) {

<% if (options.sample === 'start') {-%>
  // bind data from service
  this.someData = Start.someData;
  this.ENV = Config.ENV;
  this.BUILD = Config.BUILD;

<% } -%>
  console.log('Hello from your Controller: <%= controllerName %> in module <%= moduleName%>:. This is your controller:', this);
  // TODO: do your controller thing

});
