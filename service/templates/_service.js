'use strict';
/**
* @ngdoc service
* @name <%= moduleName %>:<%= serviceName %>
* @description add your description
*/
angular.module('<%= moduleName %>')
.service('<%= serviceName %>', function <%= serviceName %>() {
  console.log('Hello from your Service: <%= serviceName %> in module <%= moduleName %>');
<% if(options.sample === 'start') {%>
  /**
  * @ngdoc method
  * @name someData
  * @description some initial data
  * @methodOf <%= moduleName %>:<%= serviceName %>
  */
  this.someData = {
    binding: 'Yes! Got that databinding working'
  };
<% } %>
  // TODO: do your service thing
});
