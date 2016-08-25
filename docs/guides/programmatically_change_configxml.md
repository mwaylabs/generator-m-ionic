# Programmatically change the `config.xml`

> The `gulp config` task changes and reads the contents of the `config.xml` programmatically which is essential for Continuous Integration and delivery purposes. Consult our [Continuous Integration Guide](./ci.md) for a full sample use case.

## gulp config

### Set arbitrary attributes in the `<widget>` tag

```sh
# version
gulp config --setWidgetAttr="version=1.0.0.93"
# android-versionCode
gulp config --setWidgetAttr="android-versionCode=93"
# ios-CFBundleVersion
gulp config --setWidgetAttr="ios-CFBundleVersion=3.3.3"
# id / bundle identifier, USE WITH CARE! (see below)
gulp config --setWidgetAttr="id=com.new.bundle"
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
gulp config --setDescription="a small app to make the world a happy place"
# <author>
gulp config --setAuthor="Your Name---your@mail.com---http://yourwebsite.com"
# <name>
gulp config --setName="hello world" # USE WITH CARE! (see below)
```

Output:

```xml
<description>a small app to make the world a happy place</description>
<author email="your@mail.com" href="http://yourwebsite.com">Your Name</author>
<name>hello world</name>
```
**Important**: When **changing the name** or **bundle identifier** of your project, it may lead to problems with the platform projects. If you have your plugins and platforms managed in the `config.xml` you can avoid this by deleting your `plugins/` and `platforms/` folders and installing them again using `gulp --cordova 'prepare'`. For more information consult the [Git integration](./git_integration.md) guide.

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
