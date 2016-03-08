# Sub-generators

As you develop your app you'll want to add additional components. That's where the subgenerators come in.

#### AngularJS module
**Important**: While we are particularly proud of this feature, please note that using modules is only useful in large projects. We recommend that you only use them, if you know why you want to use them in your project. In our experience for most projects using one module is just fine.

1. `yo m-ionic:module <moduleName>` - create a new module
2. choose your template: `sidemenu`, `tabs` or `blank`
2. add your module to the `app/app.js`:

  ```js
  'use strict';
  angular.module('myProject', [
    // your modules
    'main',
    '<newModuleName>'
  ]);
  ```
3. restart your `gulp watch` task
3. in your browser, depending on the template you chose, navigate to `http://localhost:9000/#`
  - `/<module-name-in-kebap-case>` for `blank` templates
  - `/<module-name-in-kebap-case>/list` for `sidemenu` and `tabs` templates
4. **Done!** - see your new module in action!

#### AngularJS components
A handy and fast way to create different angular components, handling all the boilerplate and test file generation for you.
The `<moduleName>` is optional and defaults to the main module when left blank
```sh
yo m-ionic:constant <constantName> <moduleName>
yo m-ionic:controller <controllerName> <moduleName>
yo m-ionic:directive <directiveName> <moduleName>
yo m-ionic:filter <filterName> <moduleName>
yo m-ionic:pair <pairName> <moduleName> # creates controller & template
yo m-ionic:template <templateName> <moduleName>
yo m-ionic:service <serviceName> <moduleName>
```
If you have `gulp watch` running, gulp will automatically inject your new files into your application and they will be available right away.
