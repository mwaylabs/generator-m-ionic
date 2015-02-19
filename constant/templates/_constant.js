'use strict';
angular.module('<%= moduleName %>')
.constant('<%= constantName %>', {
<% if (options.sample === 'start') {%>
  ENV: {
    /*inject-env*/
    /*endinject*/
  },
<% } else { %>
  CONSTANT_1: 'meaningful value',
<% } %>
});
