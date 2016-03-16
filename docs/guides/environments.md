# Use Environments
> The environment feature allows you to change sets of API Endpoints, Keys, Tokens, App Behavior Switches, Debugging Options and much more with a single parameter for you gulp tasks.


## How does it work?
Your `main` module per default contains the two files `env-dev.json` and `env-prod.json` located under `app/main/constants/`. Any key value pair you define in those files will be copied into the `Config.ENV` constant located in `app/main/constants/config-const.js`, depending on which environment you choose. So when you're working on dev, all key value pairs from the `main` module's `env-dev.json` will be copied to your `config-const.js`. Same goes for the prod environment respectively. Then simply inject the `Config` constant in any service or controller where you need to use it.

`env-dev.json`
```js
{
  "SERVER_URL": "https://DEVSERVER/api",
  "API_KEY": "*#(&JNF(#I#(FJAPJ981374io(FD**))))",
  "DEBUG_LEVEL": 2,
  "FEATURE_SWITCHES": {
    "LOGIN": true,
    "DASHBOARD": true,
    "ADMINISTRATION": false
  }
}
```

`config-const.js`
```js
'use strict';
angular.module('main')
.constant('Config', {

  // gulp environment: injects environment vars
  ENV: {
    /*inject-env*/
    'SERVER_URL': 'https://DEVSERVER/api',
    'API_KEY': '*#(&JNF(#I#(FJAPJ981374io(FD**))))',
    'DEBUG_LEVEL': 2,
    'FEATURE_SWITCHES': {
      'LOGIN': true,
      'DASHBOARD': true,
      'ADMINISTRATION': false
    }
    /*endinject*/
  },

  // gulp build-vars: injects build vars
  BUILD: {
    /*inject-build*/
    /*endinject*/
  }

});
```

`some-ctrl.js`
```js
'use strict';
angular.module('main')
.controller('SomeCtrl', function ($log, Config) {

  $log.log('Firing against Server:' + Config.ENV.SERVER_URL);
  $log.log('Using API Key:' + Config.ENV.API_KEY);
  $log.log('Debug Level is:' + Config.ENV.DEBUG_LEVEL);

  // TODO: code to include features based on FEATURE_SWITCHES

});

```

## Choosing an environment
When you run `gulp watch` or any other task that runs `gulp build` without specifying an environment it will default to the dev environment:
```shell
gulp watch                # defaults to --env=dev
gulp build                # so does this
gulp --cordova 'run ios'  # and any other command that uses gulp build
```
In order to choose an environment explicitly add the `--env` flag, like this:
```shell
gulp watch --env=prod
gulp build --env=prod
gulp --cordova 'run ios' --env=prod
```
While you're running `gulp watch` you can even **temporarily** switch the environment you're currently working on without having to restart your watch task. Simply type:
```shell
gulp environment --env=<env>
```
Gulp will livereload with your new environment! It's **important** to note that as soon as you are making more changes and a livereload is triggered, your environment switches back to the one that was supplied when `gulp watch` was started. If you want to **permanently** switch your environment you should do so by restarting your `gulp watch` tasks with the desired environment.

## Creating a new environment
If you find yourself faced needing more than a dev and a prod environment simply create a new file: e.g. `app/main/constants/env-env5.json`, fill it with the desired values and then run one the following:
```shell
gulp watch --env=env5
gulp build --env=env5
gulp environment --env=env5
```

## Environments when using several modules
In case your project grows large and you have several modules in your project you will probably find yourself wanting to share environments across all modules. No problem. Every module you create has it's own `Config` constant located in `app/module/constants/config-const.js`. But only your `main` module contains the environment files. The gulp tasks will automatically copy the environments to all of your modules' `Config.ENV` constants. Alternatively just share your main's `Config` constant across all modules and simply remove the other constants.
