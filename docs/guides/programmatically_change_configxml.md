# Programmatically change `config.xml`

> The `gulp config` task changes the contents of the `config.xml` programmatically which is very convenient in a continuous integration environment.

A more elaborate example of how you can put this to use in a **continuous integration** environment can be found in the [`jenkins.sh`](https://github.com/mwaylabs/generator-m-ionic/blob/master/generators/app/templates/jenkins.sh) of your project.

## gulp config

### Set arbitrary attributes in the `<widget>` tag

```sh
# version
gulp config --setWidgetAttr='version=1.0.0.93'
# android-versionCode
gulp config --setWidgetAttr='android-versionCode=93'
# ios-CFBundleVersion
gulp config --setWidgetAttr='ios-CFBundleVersion=3.3.3'
# id / bundle identifier, USE WITH CARE! (see below)
gulp config --setWidgetAttr='id=com.new.bundle'
```

Output:

```xml
<widget version="1.0.0.93"
  android-versionCode="93"
  ios-CFBundleVersion="3.3.3"
  id="com.new.bundle"
  ...>
```
### Set other tags!

```sh
# <description>
gulp config --setDescription='a small app to make the world a happy place'
# <author>
gulp config --setAuthor='Your Name---your@mail.com---http://yourwebsite.com'
# <name>
gulp config --setName='hello world' # USE WITH CARE! (see below)
```

Output:

```xml
<description>a small app to make the world a happy place</description>
<author email="your@mail.com" href="http://yourwebsite.com">Your Name</author>
<name>hello world</name>
```
**Important**: When **changing the name** or **bundle identifier** of your project, it may lead to problems with the platform projects. If you have your plugins and platforms managed in the `config.xml` you can avoid this by deleting your `plugins/` and `platforms/` folders and installing them again using `gulp --cordova 'prepare'`. For more information see the **Git integration** section of the [README.md](../../README.md).

### Retrieving arbitrary attributes from the `<widget>` tag
In other cases it's sometimes useful to retrieve said information from the `config.xml`. When doing so, it's often necessary to add the `--silent` tag to prevent gulp from outputting unnecessary task information. Thus your output can serve as input to other scripts unaltered.

Let's assume the content's of the `config.xml` we set earlier:
```xml
<widget version="1.0.0.93"
  android-versionCode="93"
  ios-CFBundleVersion="3.3.3"
  id="com.new.bundle"
  ...>
```

This is the output when running the individual tasks:
```sh
# version
gulp config --silent --getWidgetAttr=version
1.0.0.93
# android-versionCode
gulp config --silent --getWidgetAttr=android-versionCode
93
# ios-CFBundleVersion
gulp config --silent --getWidgetAttr=ios-CFBundleVersion
3.3.3
# id
gulp config --silent --getWidgetAttr=id
com.new.bundle
```

## Putting it all together, a live example
At M-Way we like to maintain the version of an app in just one place. For us, this is the `config.xml`. While the app is build, our integration server adds further information.

> In this example we read the app version from the `config.xml`, add the build number and inject each value as a build variable. Effectively being able to display both values without the use of any plugin in the app later.

Assume the `config.xml` looks somewhat like this:
```xml
<widget version="1.0.1"
  id="com.new.bundle"
  ...>
```

This snippet now reads the value, appends the build number, sets the `android-versionCode` to the build number and then injects the version and the build number into the app using the build vars command.

```sh
# BUILD is set by our continuous integration server, let's assume it's 25
# retrieve the version from the config.xml
VERSION="$(gulp config --silent --getWidgetAttr=version)"
# append the build number and save in config.xml
gulp config --setWidgetAttr="version=${VERSION}.${BUILD}"
# set the android-versionCode
gulp config --setWidgetAttr="android-versionCode=${BUILD}"
# inject version and build number into app
gulp --cordova 'prepare' --buildVars="version:${VERSION},build:${BUILD}"
```

Note the **double quotes here**. They allow the content of the strings to be interpolated by the shell and replaced with the proper values.

After this process the `config.xml` contains:
```xml
<widget version="1.0.0.25"
   id="com.new.bundle"
   android-versionCode="25">
```

And the `config-const.js` contains:
```js
'use strict';
angular.module('main')
.constant('Config', {

  // gulp build-vars: injects build vars
  // https://github.com/mwaylabs/generator-m-ionic#gulp-build-vars
  BUILD: {
    /*inject-build*/
    'version': '1.0.0',
    'build': '25'
    /*endinject*/
  }

});
```
