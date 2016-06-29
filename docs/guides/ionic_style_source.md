# Switch the Ionic style source
If you want to change the style source of your project after you have generated it with Generator-M-Ionic, there's two options:

1. Re-generate your project and choose the desired style source (CSS or Sass) you like
2. **OR** manually change the style source with the guide below

## Manually change the style source
When changing the style source from Ionic CSS to Sass or vice versa, there's three files that need alteration.

1. `.yo-rc.json` - ionicCss option
2. `gulp/injecting.js` - the `wiredep` and `bower-fonts` task
3. `app/main/styles/main.scss` - ionic includes and settings

### From CSS to Sass
1. In the `.yo-rc.json` change the ionicCss option to false:
  ```json
  "ionicCss": false,
  ```
  This is not necessary but it's good for your `.yo-rc.json` to actually reflect the state of your project.
1. There's two gulp tasks you need to change in the `gulp/injecting.js` file. The `wiredep` and `bower-fonts` task should look like this:
  ```js
  // inject bower components into index.html
  gulp.task('wiredep', function () {

    return gulp.src('app/index.html')
      // exclude ionic scss since we're using ionic sass
      .pipe(wiredep.stream({exclude: ['bower_components/ionic/release/css']}))
      .pipe(gulp.dest('app/'));
  });
  ```
  ```js
  // copy bower fonts
  gulp.task('bower-fonts', function () {
    // to app/main/assets/fonts (path can be set in app/main/styles/main.scss)
    var DEST = 'app/main/assets/fonts';
    var fontFiles = mainBowerFiles({filter: /\.(eot|otf|svg|ttf|woff|woff2)$/i})
      .concat('app/main/assets/fonts/**/*');

    return gulp.src(fontFiles)
      .pipe($.changed(DEST))
      .pipe(gulp.dest(DEST));
  });
  ```
1. **Add** the ionic includes and settings to the `app/main/styles/main.scss` file:
  ```scss
  /*
  To customize the look and feel of Ionic, you can override the variables
  in ionic's _variables.scss file.

  For example, you might change some of the default colors:
  */

  $light:                           #fff !default;
  $stable:                          #f8f8f8 !default;
  $positive:                        #4a87ee !default;
  $calm:                            #43cee6 !default;
  $balanced:                        #66cc33 !default;
  $energized:                       #f0b840 !default;
  $assertive:                       #ef4e3a !default;
  $royal:                           #8a6de9 !default;
  $dark:                            #444 !default;

  // The path for our ionicons font files, relative to the built & temporary main.css
  $ionicons-font-path: "../assets/fonts" !default;

  // Include all of Ionic
  @import "../../bower_components/ionic/scss/ionic";
  ```


### From Sass to CSS
1. In the `.yo-rc.json` change the ionicCss option to true:
  ```json
  "ionicCss": true,
  ```
  This is not necessary but it's good for your `.yo-rc.json` to actually reflect the state of your project.
1. There's two gulp tasks you need to change in the `gulp/building.js` file. The `wiredep` and `bower-fonts` task should look like this:
  ```js
  // inject bower components into index.html
  gulp.task('wiredep', function () {

    return gulp.src('app/index.html')
      // we're not excluding the ionic css here
      .pipe(wiredep.stream())
      .pipe(gulp.dest('app/'));
  });
  ```
  ```js
  // copy bower fonts
  gulp.task('bower-fonts', ['clean'], function () {
    // to do www/fonts (ionic css requires it to be in this folder)
    var DEST = 'www/fonts';
    var fontFiles = mainBowerFiles({filter: /\.(eot|otf|svg|ttf|woff|woff2)$/i});

    return gulp.src(fontFiles)
      .pipe($.changed(DEST))
      .pipe(gulp.dest(DEST));
  });
  ```
1. **Remove** the ionic includes and settings **completely** from the `app/main/styles/main.scss` file (by deleting or uncommenting):
  ```scss
  /*
  To customize the look and feel of Ionic, you can override the variables
  in ionic's _variables.scss file.

  For example, you might change some of the default colors:

  $light:                           #fff !default;
  $stable:                          #f8f8f8 !default;
  $positive:                        #4a87ee !default;
  $calm:                            #43cee6 !default;
  $balanced:                        #66cc33 !default;
  $energized:                       #f0b840 !default;
  $assertive:                       #ef4e3a !default;
  $royal:                           #8a6de9 !default;
  $dark:                            #444 !default;

  // The path for our ionicons font files, relative to the built & temporary main.css
  $ionicons-font-path: "../assets/fonts" !default;

  // Include all of Ionic
  @import "../../bower_components/ionic/scss/ionic";
  */

  ```
