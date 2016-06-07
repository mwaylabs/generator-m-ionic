# Questions the generator will ask
The generator will ask the following questions in that order:

## Name?
![image](https://cloud.githubusercontent.com/assets/1370779/15828173/91abb874-2c0e-11e6-81ee-c2608a751b14.png)

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

Which is bootstrapped in the `index.html`:
```html
<body ng-app="adventureIsland">
```

## App identifier?
![image](https://cloud.githubusercontent.com/assets/1370779/15828919/9ef7fe2c-2c11-11e6-9396-848a1a90c78f.png)

A reverse-domain identifier to identify your app. If you don't know what that is, a good explanation is found in the [psdpdfkit guides](https://pspdfkit.com/guides/ios/current/faq/what-is-a-bundle-id/). For a start you can just **make one up** and change it later.

`config.xml`:
```html
<widget id="com.company.project" ...>
```

## Ionic CSS or Sass?
![image](https://cloud.githubusercontent.com/assets/1370779/15851768/828afdce-2c9e-11e6-9fd4-032049de2290.png)

You'll be writing your own styles using Sass in any case. Your choice here is to including the Ionic styles as CSS or Sass. Choosing Sass allows you to change the basic layout of Ionic. Bar heights, colors and more. However the whole Ionic Sass needs to compile with every change you make to your Sass, which is a little slower than if you just include the compiled CSS of the Ionic styles.

You can change this later, after project generation with the help of our [Ionic style source](./ionic_style_source) guide.
