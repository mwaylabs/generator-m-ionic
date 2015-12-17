'use strict';
angular.module('<%= moduleName %>')
.constant('<%= constantName %>', {

<% if (options.template === 'config') { -%>
  // gulp environment: injects environment vars
  ENV: {
    /*inject-env*/
    /*endinject*/
  },

  // gulp build-vars: injects build vars
  BUILD: {
    /*inject-build*/
    /*endinject*/
  }
<% } else { -%>
  CONSTANT_1: 'meaningful value',
<% } -%>

});
