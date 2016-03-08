# Icons and splash screens

> With Cordova it's easy to change the default app icons and splash screens. This can be done in the `config.xml` as described [here](http://cordova.apache.org/docs/en/latest/config_ref/images.html) and [here](http://cordova.apache.org/docs/en/latest/cordova-plugin-splashscreen/index.html) in the Cordova documentation. Generator-M-Ionic provides a **res/** folder and a **gulp task** to make the configuration easier.

## The `res/` folder
For your convenience, Generator-M-Ionic provides a `res/` folder to put in the icons and splash screen files.

```
res/
  |- android/
    | default/
    | ....
  |- ios/
    | default/
    | ....
```

The Generator-M-Ionic also creates a couple of files and folders. Initially a folder for the android and ios resources with some more example files in them.

## Simple example
For most projects it will suffice to put all the icons and splash screen files in the `res/platform/default` folders and link to them in the `config.xml`.

For the simplest example include this in your `config.xml`:

```xml
<!-- both icons are static in default folder -->
<platform name="android">
  <icon src="res/android/default/icon.png" />
</platform>
<platform name="ios">
  <icon src="res/ios/default/icon.png" />
</platform>
```
And run any of the cordova build related commands (`cordova run, build, emulate, serve, prepare`), for instance:

```sh
gulp --cordova 'run ios --device'
```

This will build the app with a custom app icon for android and ios. If you haven't changed the files that Generator-M-Ionic created for you, cordova will build the app with the following app icons:

**Android**
<img height="100px" src="../../generators/app/templates/res/android/default/icon.png" />
**iOS**
<img height="100px" src="../../generators/app/templates/res/ios/default/icon.png" />


## Different sets of icons and splash screens
At M-Way we often deliver different versions of the same app to our customers: for testing, integration and reviewing purposes. In order to not get confused we also deliver these apps with different app icons and or splash screens.

In order to achieve this, Generator-M-Ionic's gulp tasks include this neat little feature:

> When running any build-related cordova commands, gulp can be told to copy different assets to the `res/*/current/` folder.

This effectively enables you to change the app icons and splash screens when building without touching your source files.

### Using the `res/*/current/` folder
First we start out similar to the last example, however this time the icon's src attribute points to `current/icon.png` inside the platform folder.

```xml
<!-- both icons are dynamically included in current folder -->
<platform name="android">
  <icon src="res/android/current/icon.png" />
</platform>
<platform name="ios">
  <icon src="res/ios/current/icon.png" />
</platform>
```

When you now run any of the build-related cordova commands, you'll notice that this produces the same result as when linking to the icons inside the `default/` folders. When you don't specify anything, gulp will copy the contents of the `default/` folder to the `current/` folder before every build-related task.
```sh
gulp --cordova 'run ios --device'
```
**Android** (default)
<img height="100px" src="../../generators/app/templates/res/android/default/icon.png" />
**iOS** (default)
<img height="100px" src="../../generators/app/templates/res/ios/default/icon.png" />

Now try:
```sh
gulp --cordova 'run ios --device' --res=set1
```

The result for the app icons is, which are the icons that lie in `res/*/set1/`:

**Android** (set1)
<img height="100px" src="../../generators/app/templates/res/android/set1/icon.png" />
**iOS** (set1)
<img height="100px" src="../../generators/app/templates/res/ios/set1/icon.png" />

So by adding the `--res` option you can change from which folder gulp copies the files into the `current/` folder. If you ensure that all your icons and splash screen paths in the `config.xml` link to the `current/` folder, you can control which files will be built into the app when building.

### Notes
- Make sure that you have a valid file for every icon in every set, that you are trying to change dynamically.
- When you set an invalid path in the `--res` option, gulp will not fail. So make sure that the path exists and contains all the correct files.
- the `res/*/current/*` folder is contained in the `.gitignore` thus any changes to it will not interfere with git.

### Mixing static and dynamic resources
No problem! - Simply put the static resources into your `default/` folder and directly link to them. You can link to all the dynamic files using the `current/` folder.

```xml
<!-- dynamic and static mixed -->
<platform name="android">
  <icon src="res/android/default/icon.png" />
</platform>
<platform name="ios">
  <icon src="res/ios/current/icon.png" />
</platform>
```

Now when you run:
```sh
gulp --cordova 'run ios --device' --res=set1
```
only the iOS resources will be changed, while the android resources stay the same. This is also useful for instance when you want to only change the icons, but not the splash screens of your app.
