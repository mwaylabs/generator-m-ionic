# Build Vars
>Inject variables into your app's Config constants at build time. For instance build numbers which is essential for Continuous Integration and delivery purposes. Consult our [Continuous Integration Guide](./ci.md) for a full sample use case.

Adding the `--buildVars` flag to `gulp watch`, `gulp build` or any gulp task that runs `gulp build` implicitly, for instance:
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
Of course this works nicely in conjunction with [environments](./environments.md) as well.
