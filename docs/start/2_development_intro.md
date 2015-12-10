# Start Development

## Running in the browser
```sh
gulp watch
```
Prepares everything for development and opens your default browser. Livereloads your application when changing/adding/deleting files to immediately reflect the changes you make. For your convenience any occurring **ESLint or jsonlint errors** will be presented to you on every livereload.

```sh
gulp watch --no-open
```
If you don't want this task to open your browser, just add the `--no-open` option and navigate to `http://localhost:9000` yourself.

## Running on the device
The Cordova CLI gets installed locally with the generation of your app (you don't have to install it yourself!). Among many other tasks, it enables you to **add plugins and platforms** and **run and build** your app on devices or emulators.

Here's a brief overview of the most important capabilities:

---

```sh
gulp --cordova '<run any cordova command>'
```
A wrapper for **local installation** of Cordova CLI that comes with the generator. As opposed to a global installation the local installation allows you to have different project's with different CLI versions, which happens a lot if you have several project's with different schedules. Additionally this gulp wrapper can trigger additional gulp commands, significantly reducing the number of commands it takes to build your app. You'll learn about this in a minute.

How to use it?

```sh
# regular cordova command (when installed globally). Don't use!
cordova plugin add org.apache.cordova.camera
# cordova command with local wrapper
gulp --cordova 'plugin add org.apache.cordova.camera'
```

For a full list of Cordova CLI commands and their capabilities check out their documentation over at the [Cordova Documentation](https://cordova.apache.org/docs/en/dev/guide/cli/index.html) or the [CLI GitHub page](https://github.com/apache/cordova-cli/).

Find more plugins on the [Cordova Website](https://cordova.apache.org/plugins/) or on [ngCordova](http://ngcordova.com/docs/plugins/) and find a full list of supported platforms [here](https://cordova.apache.org/docs/en/latest/guide/platforms/index.html).

---

```sh
gulp --cordova '<build related task>' # runs gulp build, then cordova command
```

If you run one of the following cordova commands: `build <platform>`, `run <platform>`, `emulate <platform>`, `serve` or `prepare <platform>` then `gulp build` will build your Ionic app into the www folder, before Cordova will take it from there. For instance if you want to test your app on your connected iOS device, run:
```sh
gulp --cordova 'run ios --device' # runs gulp build, then cordova run ios
```
Sometimes you don't want `gulp build` to run every time before the Cordova command is run. In that case simply add the `--no-build` option and `gulp build` will be skipped.
```sh
gulp --cordova 'run ios --device' --no-build # no gulp build, only cordova run ios
```

---

```sh
gulp build
gulp build --force-build # build despite linting errors
gulp build --minify # minifies javascript, CSS, HTML and images.
# this works as well with all cordova build commands
gulp --cordova 'run ios --device' --force-build --minify
```
Usually you don't run this command directly, but it will be implicitly run by `gulp watch-build` and any build-related Cordova tasks (as explained above). It builds your angular app and moves it to the `www/` folder and performs **ESLint or jsonlint** checks.

---

We've all been there: you test the app in the browser and for some reason after the build, everything is different and broken.
```sh
gulp watch-build # opens browser
# and
gulp watch-build --no-open # doesn't open browser
# and
gulp watch-build --no-build # watches current version in www/, no new build
```
are your friends!

These commands build your Ionic app into the `www/` folder and watch that version. So you can make changes in the code an livereload will help you debug and test your build!
