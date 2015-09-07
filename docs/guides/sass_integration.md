# SASS integration
> [SASS](http://sass-lang.com/) is tightly integrated into the Generator-M-Ionic's workflow. Learn how to use it to your advantage!

With the creation of every module comes a dedictated `.scss` file in the module's `styles` folder carrying the name of the module.

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
Many developers like to split their SASS into several files (if you don't use stick to the one that is generated with each module). If you do however, the Generator also supports this.

So you can create as many `_file.scss` files as you like and include them in any of your modules' `.scss` files without having to worry about multiple includes. The Generator only compiles files and injects them into your `index.html` when they start with a character that is different from an `_` (underscore).

Let's create a `_test.scss` file:

![_test.scss](https://cloud.githubusercontent.com/assets/1370779/9638695/5f6e9e44-51a8-11e5-92ec-93f1bb0c19e3.png)

Your `module.scss`:
```scss
@import 'test';
```

The result in the `index.html` is the same as above but the compiled CSS also includes the contents of the imported `_test.scss file.
```html
<!-- build:css main/styles/app.css -->
<!-- inject:css -->
<link rel="stylesheet" href="blank/styles/blank.css">
<link rel="stylesheet" href="main/styles/main.css">
<link rel="stylesheet" href="side/styles/side.css">
<!-- endinject -->
<!-- endbuild -->
```
