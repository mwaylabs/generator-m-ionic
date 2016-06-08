# Build Vars
>Inject variables into your app's Config constants at build time. For instance build numbers.

Adding the `--buildVars` flag to `gulp watch` or any gulp task that runs `gulp build` implicitly, for instance:
```sh
gulp watch --buildVars="build:12343,key:value"
```
will result in `Config` constants that look like this:
```js
'use strict';
angular.module('main')
.constant('Config', {

  ENV: {
    /*inject-env*/
    // ..
    /*endinject*/
  },

  BUILD: {
    /*inject-build*/
    'build': '12343',
    'keys2': 'value2'
    /*endinject*/
  }

});
```
