'use strict';
angular.module('<%= moduleName %>')
.service('<%= serviceName %>', function () {

  console.log('Hello from your Service: <%= serviceName %> in module <%= moduleName %>');
  // TODO: do your service thing

<% if(options.template === 'debug') { -%>
  // some initial data
  this.someData = {
    binding: 'Yes! Got that databinding working'
  };

<% } -%>
});
