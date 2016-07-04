# Quick Start
If you are experienced with the technologies in this generator, this summary might be all you need to get started. Every topic has a more elaborate introduction in other parts of the documentation. And the [Guides section of the README.md](../../README.md#guides) directs to more advanced topics like Splashscreen and App Icon handling, Testing, Linting, Continuous integration and others.

## Setup  

#### Installation
If your system is not yet configured to run node and the Cordova platforms you desire, you can get everything up and running using the [Installation and Prerequisites](../guides/installation_prerequisites.md) guide. Once you've done that simply run:
```sh
# prerequisites
npm i -g yo gulp bower
# generator
npm i -g generator-m-ionic
```

## Development
A more detailed and advanced introduction to development with Generator-M-Ionic is provided in the [Development Introduction](../guides/development_intro.md) guide and [File structure](../guides/file_structure.md) documentation. The most basic scenario is described here:
#### Generate your project

```sh
mkdir myProject && cd $_
yo m-ionic # needs a completely empty directory (not even git!)
```
Find information on all the questions the generator will ask and what they mean in the [Questions Document](../guides/questions.md).
#### Run in browser with livereload

```sh
gulp watch
# add --no-open to avoid browser opening
gulp watch --no-open
```

#### Run on a device/emulator with livereload
Needs a proper setup of Cordova and the Platform SDKs according to our [Installation and Prerequisites Guide](../guides/installation_prerequisites.md). Both your machine and your device need to be connected to the same network before you run:

```sh
gulp --livereload "run ios"
gulp --livereload "run ios --emulate"
```

More information on how to use livereload is found in the [Development Introduction](../guides/development_intro.md#run-on-a-deviceemulator-with-livereload).

#### Build, run on the device/emulators

```sh
# both implicitly run gulp build which builds the Ionic app into www/
gulp --cordova "run ios"
gulp --cordova "emulate ios"
# run the version currently in the www/ folder, without a new build
gulp --cordova "run ios" --no-build
# build Options
gulp --cordova "run ios" --minify --force-build
# Use specific target (e.g. iPhone-6)
gulp --cordova "emulate ios --target=iPhone-6"
# to list available iOS emulator targets on your machine, run:
./platforms/ios/cordova/lib/list-emulator-images
# emulators will need to be installed in Xcode before ready to use
```

#### Handle Cordova platforms/plugins
```sh
# platforms, use --save to add to config.xml
gulp --cordova "platform ls" # list
gulp --cordova "platform add android --save" # add
gulp --cordova "platform rm android --save" # remove
# plugins, use --save to add to config.xml
gulp --cordova "plugins ls" # list
gulp --cordova "plugins add org.apache.cordova.camera --save" # add
gulp --cordova "plugins rm org.apache.cordova.camera ---save" # remove
```

##  Other topics
#### Git integration
More information in the  [Git integration](../guides/git_integration.md) guide.
```sh
# Good point to git init after a first successful run in the browser
# with gulp watch
git init
git add .
git commit -m "project setup"

# Instead if you cloned a project from a repository, run
npm install # install node packages
bower install # install bower packages
gulp --cordova "prepare" # install Cordova platforms and plugins
gulp watch
```
#### Adding AngularJS components
More detailed explanation in the [Sub-generators](../guides/sub_generators.md) guide.
```sh
# Create a module (using only the main module is usually enough)
yo m-ionic:module <moduleName>

# Create a component in a module
yo m-ionic:<component> <name> <moduleName>
# <module name>
#   defaults to main if omitted
# <name>
#   to your liking
# <components>
#   constant
#   controller
#   directive
#   filter
#   pair - template and controller
#   template
#   service
```
