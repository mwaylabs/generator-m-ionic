# Git integration
The generator provides a default set of configuration for git:
- `.gitignore` and `.gitattributes` - http://git-scm.com/docs/gitignore

Leaving them as they are generated, you will allow git to exclude all of the 3rd party code from your project. Specifically this means:
- no bower components
- no node modules
- no Cordova platforms and plugins

### After git clone
Since all these files are excluded from git, you need to install all of them when you start with a fresh clone of your project. In order to do so, run the following commands in that order:
```sh
npm install # installs all node modules from the package.json
bower install # install all bower components from the bower.json
gulp --cordova 'prepare' # install all Cordova platforms and plugins from the config.xml
```

### Platforms and plugins in config.xml
Since `cordova 5.0` all platforms and plugins you install can be added to the `config.xml`.

Release notes:
https://cordova.apache.org/news/2015/04/21/tools-release.html

> Added the ability to manage your plugin and platform dependencies in your project’s `config.xml`. When adding plugins or platforms, use the `--save` flag to add them to `config.xml`. Ex: `cordova platform add android --save`. Existing projects can use `cordova plugin save` and `cordova platform save` commands to save all previously installed plugins and platforms into your project’s `config.xml`. Platforms and plugins will be autorestored when `cordova prepare` is run. This allows developers to easily manage and share their dependenceis among different development enviroments and with their coworkers.
>

Since your projects `.gitignore` will completely ignore the `platforms/` and `plugins/` folders, it's important to make sure your `config.xml` contains all the plugins and platforms required by your project. As explained above this can either be achieved by always using the `--save` options when adding/removing platforms:

```sh
gulp --cordova 'platform add ios --save'
gulp --cordova 'plugin remove cordova-plugin-camera --save'
```

or by typing the following commands before you commit:

```sh
gulp --cordova 'platform save'
gulp --cordova 'plugin save'
```
