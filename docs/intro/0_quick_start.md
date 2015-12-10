# Quick Start
If you are experienced this summary might be all you need. Every topic has a more elaborate introduction in other parts of the documentation. Check out the [README.md](../../README.md).
1. Installation  
Check the Cordova [Platform Requirements](http://cordova.apache.org/docs/en/dev/guide/platforms/index.html)
```sh
# prerequisites
npm i -g yo gulp bower
# generator
npm i -g generator-m-ionic
```
1. Generate project
```sh
mkdir myProject && cd $_
yo m-ionic # needs a completely empty directory (not even git!)
```
1. Run in browser
```sh
gulp watch
# add --no-open to avoid browser opening
gulp watch --no-build
```
3. Git
```sh
# Good point to init git after a first successful run in the browser
git init
git add .
git commit -m 'project setup'
# Instead if you cloned a project from a repository, run
npm install # install node packages
bower install # install bower packages
gulp --cordova 'prepare' # install Cordova platforms and plugins
gulp watch
```
2. Run on the device/emulators, build
```sh
# both implicitly run gulp build which builds the Ionic app into www/
gulp --cordova 'run ios --device'
gulp --cordova 'emulate ios'
# run the version currently in the www/ folder, without a new build
gulp --cordova 'run ios --device' --no-build
# build Options
gulp --cordova 'run ios --device' --minify --force-build
```
4. Add AngularJS components
```sh
yo m-ionic:<component> <name> <moduleName>
```
```sh
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
#   module
```
3. Handle Cordova platforms/plugins
```sh
# platforms
gulp --cordova 'platform ls' # list
gulp --cordova 'platform add android' # add
gulp --cordova 'platform rm android' # remove
# plugins
gulp --cordova 'plugins ls' # list
gulp --cordova 'plugins add org.apache.cordova.camera' # add
gulp --cordova 'plugins rm org.apache.cordova.camera' # remove
```
