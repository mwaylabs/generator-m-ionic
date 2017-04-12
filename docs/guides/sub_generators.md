# Sub-generators

As you develop your app you'll want to add additional components. That's where the sub-generators come in.

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

#### AngularJS Components
[AngularJS Components](https://docs.angularjs.org/guide/component) can be handily generated with the following command:

```sh
yo m-ionic:component <componentName>
```

This generates the following four files:
- a component.js file
- a component.html file
- a component.scss file
- a component.sepc.js file

![image](https://cloud.githubusercontent.com/assets/1370779/24964446/95269e4c-1fa1-11e7-977b-6b97293d4458.png)

To include your component somewhere in your app, use the following syntax:
```html
<mini
  content="'some content via attribute'">
  Some <span class="green">transcluded</span> content
</mini>
```

**Note:** You should probably **restart your gulp watch** task.

More details on AngularJS Components can be found here:
- https://docs.angularjs.org/guide/component
- https://toddmotto.com/exploring-the-angular-1-5-component-method/

#### Other AngularJS building blocks
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
