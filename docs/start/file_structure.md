# File structure
<pre>
└──  app/ - your application folder
│   └──  bower_components/    - local installation of bower packages
│   └──  main/                - ---main module---
│   │   ├──  assets/          - assets: fonts, images, translation, etc... go here
│   │   ├──  constants/       - angular constants
│   │   ├──  controllers/     - angular controllers
│   │   ├──  directives/      - angular directives
│   │   ├──  filters/         - angular filters
│   │   ├──  services/        - angular services
│   │   ├──  styles/          - scss styles
│   │   ├──  templates/       - angular templates
│   │   └──  main.js          - angular module definition, routing etc...
│   └──  anotherModule/       - ---another  module---
│   │   ├──  ...
│   ├──  app.js               - application module, includes main module, ionic, ui-router etc ...
│   └──  index.html           - angular entry point, injects: app files, bower files, fonts,  ...
├──  gulp/              - gulp tasks
├──  hooks/             - cordova hooks
├──  nodes_modules/     - local installation of node modules
├──  platforms/         - cordova platforms
├──  plugins/           - corodova plugins
├──  res/               - resources folder for splash screens and app icons
├──  test/              - unit and integration tests
├──  www/               - your gulp build goes here, cordova starts building from here
├──  .bowerrc           - bower configuration
├──  .editorconfig      - editor configuration
├──  .eslintignore      - ESLint ignore configuration
├──  .eslintrc          - ESLint configuration
├──  .gitattributes     - git's attribute configuration
├──  .gitignore         - git's ignore configuration
├──  .travis.yml        - travis continuous integration configuration
├──  .yo-rc.json        - yeoman's .yo-rc.json
├──  bower.json         - bower dependencies
├──  config.xml         - cordova's config.xml
├──  gulpfile.js        - entry point to all gulp tasks
├──  jenkins.sh         - shell script for jenkins continuous integration
├──  karma.conf.js      - karma configuration
├──  package.json       - node dependencies configuration
├──  protractor.conf.js - protractor configuration
├──  README.md          - the generator's README.md
</pre>
