# Questions the generator will ask
The generator will ask the following questions in that order:

## Name?
<img width="600" src="https://cloud.githubusercontent.com/assets/1370779/15828173/91abb874-2c0e-11e6-81ee-c2608a751b14.png">

The name of the project will be written to the `config.xml` and thus show up below your app icon when you run the app on a device:
```html
<name>Adventure Island</name>
```
From this name the generator also derives a compatible **angular module name** for the root module of your app:

`app.js`:
```js
angular.module('adventureIsland', [
  // load your modules here
  'main', // starting with the main module
]);

```

This module is then bootstrapped in the `index.html`:
```html
<body ng-app="adventureIsland">
```

## App identifier?
<img width="600" src="https://cloud.githubusercontent.com/assets/1370779/15828919/9ef7fe2c-2c11-11e6-9396-848a1a90c78f.png">

A reverse-domain identifier to identify your app. If you don't know what that is, a good explanation is found in the [psdpdfkit guides](https://pspdfkit.com/guides/ios/current/faq/what-is-a-bundle-id/). For a start you can just **make one up** and change it later.

`config.xml`:
```html
<widget id="com.company.project" ...>
```

## Ionic CSS or Sass?
<img width="600" src="https://cloud.githubusercontent.com/assets/1370779/15851768/828afdce-2c9e-11e6-9fd4-032049de2290.png">

You'll be writing your own styles using Sass in any case. Your choice here is between including the Ionic styles as CSS or Sass.

No matter what choice you make, you can change this later, after project generation with the help of our [Ionic style source](./ionic_style_source.md) guide.

Choosing Sass allows you to change the basic layout of Ionic. Bar heights, colors and more. However the whole Ionic Sass needs to compile with every change you make to your own Sass, which is a little slower than if you just include the compiled CSS version of the Ionic styles. So if Ionic generally suffices for your project as is, go with the CSS version.


## Additional bower packages?
<img width="600" src="https://cloud.githubusercontent.com/assets/1370779/15853161/3d21fbec-2ca4-11e6-9d81-dcec85b4aa2e.png">

The angular, ionic, angular-ui-router and ngCordova bower dependencies will be installed and included by default. Additional packages you select here also get installed and injected into your `index.html`. Refer to their documentations for instructions on how to use them, some are covered in our [Bower component usage](./bower_component_usage.md) guide.

Install new ones using the [Bower CLI](http://bower.io/docs/api/):
```sh
bower install angular-translate --save
```

## Cordova platforms?
<img width="600" src="https://cloud.githubusercontent.com/assets/1370779/18171803/82d59a06-7063-11e6-9455-254a7e322930.png">

Choose the platforms you want to build for. This will only work if you have the platforms' requirements correctly set up. For more information visit [Installation and Prerequisites](./installation_prerequisites.md).

You can add and remove platforms at any time using the Cordova CLI wrapper:
```sh
gulp --cordova "platform add android --save"
```
More detailed instructions are found in the [Development Introduction](./development_intro.md). So if you're not sure, leave these empty for now. A full list of platforms supported by Cordova is found in the [Cordova Documentation](https://cordova.apache.org/docs/en/latest/guide/support/).

## Cordova plugins?
<img width="600" src="https://cloud.githubusercontent.com/assets/1370779/15854446/292c5122-2caa-11e6-95df-db9227f1d8ea.png">

Select the ones you want to install now. Unlike the Cordova platforms, these will not fail without the proper Cordova platform setup.

Just as with the platforms you can add plugins later at any time using the [Cordova CLI wrapper](./development_intro.md#using-the-cordova-cli):
```sh
gulp --cordova "plugin add cordova-plugin-camera --save"
```
Find all available plugins on the [Cordova plugins page](https://cordova.apache.org/plugins/).

## Starter template?
<img width="600" src="https://cloud.githubusercontent.com/assets/1370779/15855054/a47c9050-2cad-11e6-88e3-04d96add5e0a.png">

This choice decides whether your app will be generated with an [Ionic side menu](http://ionicframework.com/docs/api/directive/ionSideMenus/) or [Ionic tab navigation](http://ionicframework.com/docs/api/directive/ionTabs/). Alternatively you may choose to generate a blank module, if you wish to build everything from the ground up.

## Ecosystems?
<img width="600" src="https://cloud.githubusercontent.com/assets/1370779/18129151/ab97cc8c-6f89-11e6-81c9-4e0c8985ea6b.png">

Generator-M-Ionic provides integration into different ecosystems. For more information refer to the [Ecosystems section of our Guides](../../README.md#ecosystems). If you don't know what these are, just leave them empty for now. They can be included at any time.
