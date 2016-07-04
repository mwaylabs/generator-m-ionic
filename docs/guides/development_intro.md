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
Prepares everything for development and opens your default browser:

When you run `gulp watch` it does this to your `index.html`:
- inject all bower javascript and css files (Angular, Ionic, ...)
- inject all of your app files (compiled css, angular files, ...)

`gulp watch` also livereloads your application when changing/adding/deleting files to immediately show the changes you make in your browser. For your convenience any occurring **ESLint or jsonlint errors** will be presented to you on every livereload.

```sh
gulp watch --no-open
```
If you don't want this task to open your browser every time, just add the `--no-open` option and navigate to `http://localhost:9000` yourself.

## Using the Cordova CLI
The Cordova CLI gets installed locally with the generation of your app (you don't have to install it yourself!). Among many other tasks, the Cordova CLI enables you to **add plugins and platforms** and **run and build** your app on devices or emulators.

For a full list of Cordova CLI commands and their capabilities check out their documentation over at the [Cordova Documentation](https://cordova.apache.org/docs/en/latest/cordova-cli/index.html) or the [CLI GitHub page](https://github.com/apache/cordova-cli/).

Here's a brief overview of the most important capabilities:

#### Cordova CLI wrapper
```sh
gulp --cordova "<run any cordova command>"
```
A wrapper for **local installation** of Cordova CLI that comes with the generator. As opposed to a global installation the local installation allows you to have different projects with different CLI versions, which happens a lot if you have several projects with different schedules. Additionally this gulp wrapper can trigger additional gulp commands, significantly reducing the number of commands it takes to build your app. You'll learn about this in a minute.

How to use it?

```sh
# regular cordova command (when installed globally).
# DON'T USE!
cordova plugin add org.apache.cordova.camera
# cordova command with local wrapper
gulp --cordova "plugin add org.apache.cordova.camera --save"
```

Find more plugins on the [Cordova Website](https://cordova.apache.org/plugins/) or on [ngCordova](http://ngcordova.com/docs/plugins/) and find a full list of supported platforms in the [Cordova Documentation](https://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html).

#### Run on device or emulator with livereload
For development purposes you can run your app on a connected iOS or Android device or an emulator. This requires your system to be setup correctly for the given platform as described in the Cordova [Platform Guides](https://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html). Then:

1. **connect** your device to your machine
2. **network**: your machine and device need to be in the same one
3. **run**:

```sh
gulp --livereload "run ios"
gulp --livereload "run ios --emulate"
```
The livereload command works just like `gulp watch`, hence `gulp --livereload` works with [Environments](./environments.md) and [Build Vars](./build_vars.md) and automatically performs linting, compiles your scss, injects new files and so on.

```sh
gulp --livereload "run ios" --env=prod --buildVars="build:123"
```
When you change anything Cordova related, like adding a plugin, you'll need to restart livereload.
```sh
# make cordova related changes
gulp --cordova "plugin add cordova-plugin-camera"
# restart
gulp --livereload "run ios"
```
**Note:** Sometimes, your livereload app might hang, especially when creating new files. If that happens just leave the `gulp --livereload` command running, close and reopen your app. That should fix it.

#### Build on a device/emulator
In order to test a fully built version of your app on a device or emulator, without having to rely your development machine to run the livereload command, run the following commands:
```sh
gulp --cordova "run ios" # runs gulp build, then cordova run ios
gulp --cordova "run android" # same for android

```
or
```sh
gulp --cordova "emulate ios" # also runs gulp build first
gulp --cordova "emulate android"
```

To emulate a specific device and iOS version (iOS version needs to be installed via Xcode before) run:
```sh
gulp --cordova "run ios --emulate --target='iPad-Air, 8.4'"
gulp --cordova "run ios --emulate --target='iPad-Air, 9.0'"
# to list available iOS emulator targets on your machine, run:
./platforms/ios/cordova/lib/list-emulator-images
```

#### Cordova build, run, emulate, ... under the hood
Running:
```sh
gulp --cordova "run android"
```
is exactly the same as:
```sh
gulp build
gulp --cordova "run android" --no-build
```

In fact if you any of the following Cordova commands: `build <platform>`, `run <platform>`, `emulate <platform>`, `serve` or `prepare <platform>` then under the hood `gulp build` will build your Ionic app into the `www/` folder, then the Cordova command will take it from there.

```sh
gulp --cordova "run ios" --no-build # no gulp build, only cordova run ios
gulp --cordova "run android" --no-build # same for android or any other platform
```

The implicit run of `gulp build` that comes with any of the above mentioned Cordova commands can be disabled by adding the `--no-build` flag. This can be handy if you don't make any changes to the source files or just want to be more verbose to make it more obvious what's happening.

#### Run using Xcode instead of command line
Some people prefer to launch their apps (device or emulator) using the Xcode project that lies in `platforms/ios/`. This is sometimes handy because [ios-deploy](https://github.com/phonegap/ios-deploy) which is used by the Cordova CLI to run your apps via the command line can have its quirks.

In order to view changes that you made in the project run the following:
```sh
gulp --cordova "prepare ios"

# or separately
gulp build
gulp --cordova "prepare ios" --no-build
```
Then run or simulate via Xcode.


## Building options
Your `gulp build` can be minified or forced:
```sh
gulp build
gulp build --force-build # build despite linting errors
gulp build --minify # minifies javascript, CSS, HTML and images.
```

As you usually don't run this command directly, but rather implicitly by running any build-related Cordova task like `gulp --cordova "run ios"` these options can be passed to those Cordova commands as well.
```sh
# this works as well with all cordova build-related commands (as they implicitly run gulp build)
gulp --cordova "run ios" --force-build --minify
```

## Debugging your build

We've all been there: you test the app in the browser and for some reason after the build, everything is different and broken.
```sh
gulp watch-build # opens browser
# and
gulp watch-build --no-open # doesn't open browser
# and
gulp watch-build --no-build # watches current version in www/, no new build
```
are your friends!

These commands build your Ionic app into the `www/` folder and watch that version. So you can make changes in the code and livereload will help you debug and test your build!
