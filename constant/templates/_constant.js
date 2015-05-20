'use strict';
angular.module('<%= moduleName %>')
.constant('<%= constantName %>', {

<% if (options.sample === 'start') { -%>
  // gulp environment: injects environment vars
  // https://github.com/mwaylabs/generator-m#gulp-environment
  ENV: {
    /*inject-env*/
    /*endinject*/
  },

  // gulp build-vars: injects build vars
  // https://github.com/mwaylabs/generator-m#gulp-build-vars
  BUILD: {
    /*inject-build*/
    /*endinject*/
  }
<% } else { -%>
  CONSTANT_1: 'meaningful value',
<% } -%>

});
