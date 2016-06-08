# File structure
Your project folder contains a lot of files that were generated for you.

#### Cordova related files and folders
```sh
config.xml  # configuration of your Cordova project
platforms/  # platforms you installed
plugins/    # plugins you installed
www/        # will contain the build of your web app, before Cordova is added
```

#### Gulp tasks and dependencies
```sh
bower.json    # dependencies like Angular & Ionic installed to app/bower_components/
gulpfile.js   # configuration of all the Gulp tasks
gulp/         # more Gulp tasks
package.json  # dependencies like Gulp plugins installed to node_modules/
```

#### Application files
```sh
app/
  └── index.html # single most important file, everything is wired together here
  └── app.js     # include modules YOU create, for now only 'main'
  └── main/      # all other app files, angular files, styles, assets, ...
    ├── assets/      # assets: fonts, images, translation, etc... go here
    ├── constants/   # angular constants
    ├── controllers/ # angular controllers
    ├── directives/  # angular directives
    ├── filters/     # angular filters
    ├── services/    # angular services
    ├── styles/      # scss styles
    ├── templates/   # angular templates
    └── main.js      # routing, angular module dependencies
  └── otherModle/ # possibly more modules
  └── ...
```


#### Files related to quality and testing
```sh
.eslintrc          # ESLint base configuration
.eslintignore      # ESLint ignore configuration
test/
  └── karma           # karma unit test
  └── protractor      # protractor e2e tests
karma.conf.js      # karma configuration
protractor.conf.js # protractor configuration
```


#### Additional files
```sh
res/             # resources folder for splash screens and app icons
.bowerrc         # bower configuration
.editorconfig    # editor configuration
.gitattributes   # git's attribute configuration
.gitignore       # git's ignore configuration
.travis.yml      # travis continuous integration configuration
.yo-rc.json      # yeoman's .yo-rc.json
jenkins.sh       # shell script for jenkins continuous integration
README.md        # the generator's README.md
```
