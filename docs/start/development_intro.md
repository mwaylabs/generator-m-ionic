# Start Development

## Generating your app
1. **create new directory** - and cd into it.

  ```sh
  mkdir myApp && cd $_
  ```
  **IMPORTANT:** Cordova needs an empty directory to work. Please run any other setup (e.g. `git init`) after running `yo m-ionic`.

1. **run the generator**

  ```sh
  yo m-ionic
  ```
  and follow the instructions


## Running in the browser
```sh
gulp watch
```
Prepares everything for development and opens your default browser. Livereloads your application when changing/adding/deleting files to immediately reflect the changes you make. For your convenience any occurring **ESLint or jsonlint errors** will be presented to you on every livereload.

```sh
gulp watch --no-open
```
If you don't want this task to open your browser, just add the `--no-open` option and navigate to `http://localhost:9000` yourself.

## Using the Cordova CLI
The Cordova CLI gets installed locally with the generation of your app (you don't have to install it yourself!). We use it instead of the Ionic CLI. Find out why in our [why you need it](../intro/why_you_need_it.md#alternatives) of our introduction section. Among many other tasks, the Cordova CLI enables you to **add plugins and platforms** and **run and build** your app on devices or emulators.

For a full list of Cordova CLI commands and their capabilities check out their documentation over at the [Cordova Documentation](https://cordova.apache.org/docs/en/latest/cordova-cli/index.html) or the [CLI GitHub page](https://github.com/apache/cordova-cli/).

Here's a brief overview of the most important capabilities:

#### Cordova CLI wrapper
```sh
gulp --cordova '<run any cordova command>'
```
A wrapper for **local installation** of Cordova CLI that comes with the generator. As opposed to a global installation the local installation allows you to have different projects with different CLI versions, which happens a lot if you have several projects with different schedules. Additionally this gulp wrapper can trigger additional gulp commands, significantly reducing the number of commands it takes to build your app. You'll learn about this in a minute.

How to use it?

```sh
# regular cordova command (when installed globally).
# DON'T USE!
cordova plugin add org.apache.cordova.camera
# cordova command with local wrapper
gulp --cordova 'plugin add org.apache.cordova.camera --save'
```

Find more plugins on the [Cordova Website](https://cordova.apache.org/plugins/) or on [ngCordova](http://ngcordova.com/docs/plugins/) and find a full list of supported platforms in the [Cordova Documentation](https://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html).

#### Cordova build, run, emulate, ... under the hood

```sh
gulp --cordova '<build related task>' # runs gulp build, then cordova command
```

If you run one of the commands above or following Cordova commands: `build <platform>`, `run <platform>`, `emulate <platform>`, `serve` or `prepare <platform>` then under the hood `gulp build` will build your Ionic app into the `www/` folder, then the Cordova command will take it from there.

So running:
```sh
gulp --cordova 'run android'
# is exactly the same as
gulp build
gulp --cordova 'run android' --no-build
```
So as you can see the implicit run of `gulp build` that comes with any of the above mentioned Cordova commands can be disabled by adding the `--no-build` flag. This can be handy if you don't make any changes to the source files or just want to be more verbose to make it more obvious what's happening.
```sh
gulp --cordova 'run ios --device' --no-build # no gulp build, only cordova run ios
gulp --cordova 'run android' --no-build # same for android or any other platform
```

#### Run on device or simulator
If you want to run your app on your connected iOS or Android device or a simulator run:
```sh
gulp --cordova 'run ios --device' # runs gulp build, then cordova run ios
gulp --cordova 'run android' # same for android

```
or
```sh
gulp --cordova 'emulate ios'
gulp --cordova 'emulate android'
```

Both commands require your system to be setup correctly for the given platform as described in the Cordova [Platform Guides](https://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html).

To emulate a specific device and iOS version (iOS version needs to be installed via Xcode) run:
```sh
gulp --cordova 'emulate ios --target="iPad-Air, 8.4"'
gulp --cordova 'emulate ios --target="iPad-Air, 9.0"'
# to list available targets on your machine, run:
`./platforms/ios/cordova/lib/list-emulator-images`
```

#### Run using Xcode instead of command line
Some people prefer to launch their apps (device or emulator) using the Xcode project that lies in `platforms/ios/`. This is sometimes handy because [ios-deploy](https://github.com/phonegap/ios-deploy) which is used by the Cordova CLI to run your apps via the command line can have its quirks.

In order to view changes that you made in the project run the following:
```sh
gulp --cordova 'prepare ios'
# or individually
gulp build
gulp --cordova 'prepare ios' --no-build
```
Then run or simulate via Xcode.


## More gulp tasks

```sh
gulp build
gulp build --force-build # build despite linting errors
gulp build --minify # minifies javascript, CSS, HTML and images.

# this works as well with all cordova build-related commands (as they implicitly run gulp build)
gulp --cordova 'run ios --device' --force-build --minify
```
Usually you don't run this command directly, but it will be implicitly run by any build-related Cordova task `gulp watch-build`. It builds your angular app and moves it to the `www/` folder and performs **ESLint or jsonlint** checks.

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
