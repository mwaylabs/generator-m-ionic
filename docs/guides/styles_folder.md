# Using the `app/module/styles` folder
With the creation of every module comes a dedictate `.scss` file in the module's `styles` folder carrying the name of the module.

![main module's main.scss](https://cloud.githubusercontent.com/assets/1370779/9638373/b7e4dafe-51a6-11e5-9968-abe71d10c1eb.png)

Every modules's `.scss` file gets compiled by the `gulp styles` task which is run automatically by `gulp watch`, `gulp build` or any of the sort. The compiled `.css` files then get injected into your `index.html`.

```html
<!-- build:css main/styles/app.css -->
<!-- inject:css -->
<link rel="stylesheet" href="blank/styles/blank.css">
<link rel="stylesheet" href="main/styles/main.css">
<link rel="stylesheet" href="side/styles/side.css">
<!-- endinject -->
<!-- endbuild -->
```
The above example has three modules: `main`, `side` and `blank`.

**Note**: That all the files are linked in the `index.html` and are concatenated into a single `app.css` upon building the app. Thus when you define a CSS rule it **spans across all modules!**

## Splitting into several files
Many developers like to split their SASS into several files. The generator supports this and only compiles files directly when they don't start with an `_` (underscore).

So you can create as many `_file.scss` files as you like and include them in any of your modules' `.scss` files.

![_test.scss](https://cloud.githubusercontent.com/assets/1370779/9638695/5f6e9e44-51a8-11e5-92ec-93f1bb0c19e3.png)

Your `module.scss`:
```scss
@import 'test';
```

The result in the `index.html` is the same as above.
```html
<!-- build:css main/styles/app.css -->
<!-- inject:css -->
<link rel="stylesheet" href="blank/styles/blank.css">
<link rel="stylesheet" href="main/styles/main.css">
<link rel="stylesheet" href="side/styles/side.css">
<!-- endinject -->
<!-- endbuild -->
```
