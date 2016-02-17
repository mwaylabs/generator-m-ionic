# Contribution Guidelines

## Before you start
Please make sure you've read our [Mission Statement](./mission_statement.md) and [FAQ](./faq.md).

### Thank you
Second: Thank you for trying to make valuable contributions to help us improve the generator. It's people like you who make the whole open source community what it is! <3.

### Code is a team effort, talk to us!
Unless you're fixing a minor issue (typo, one-liner, small config, ...) please **talk to us** before starting to code right away. We'd hate to see you investing a lot of time only to find out that you built something that we don't need or something that is of interested but not in line with our coding guidelines.
The best way to get us aboard is the following:

1. have a good and precise **idea**
2. create an **issue** and briefly explain what you think
3. wait till we join the **discussion**
4. if we like what you're suggesting you (or somebody else) can start **implementing**
5. when all work is done, create a **pull-request** that is linked to your issue

### Need help, get help
If you're a new contributor or just having trouble getting some feature to work properly we're happy to point you in the right directions.

### Pull-requests
Once you issue a pull-request, we'll work with you until your changes can be merged

- briefly **explain** what you did and link to the issue you are working on
- create only a **few and logical commits** with brief and precise commit messages
- make **only necessary changes**, that belong to a specific issue. If you're working on several issues, create several pull-requests.
- **write test** whenever you can!


## Getting your hands dirty

1. [fork](https://github.com/mwaylabs/generator-m/fork) our repository [ [github help](https://help.github.com/articles/fork-a-repo/) ]
1. clone your fork
1. navigate to your local clone
1. create an issue branch
1. run `gulp watch` to automatically run the tests as you make changes or run `npm test` to run the tests only one time
1. implement your changes
1. generate and test project manually (see table below)
1. submit your pull-request (to merge into dev! not master)

#### gulp watch / npm test
Both will perform eslint and jsonlint checks, tests are run and istanbul for code coverage. The results are printed to the terminal. Detailed information on code coverage on every file can be found in `coverage/lcov-report/index.html`.
Please make sure your code is compliant and code coverage is as high as possible. Your pull-request will be built using travis and the reports will be shown in the pull-request.

#### Manually test generated project
We'll tell you which commands you need to run for your PR to be accepted. Unfortunately we haven't found a good way to automate this. If you have an idea please let us know.

| result | command to test in generated project |
| ------ |  ---- |
| ok | gulp --cordova |
| ok | gulp watch |
| ok | gulp build / gulp watch-build |
| ok | gulp karma |
| ok | gulp protractor |
| ok | gulp contrib-linting |

### CLI options for debugging and development
```sh
yo m-ionic --appName='App Name' # set appName via CLI
yo m-ionic --skip-welcome-message # skips welcome message
yo m-ionic --skip-sdk # skip adding cordova platforms and plugins (sdk-specific tasks) for travis
yo m-ionic --skip-install # for debugging purposes, no npm and bower install
yo m-ionic --skip-prompts # for debugging purposes, run with predefined answers
yo m-ionic --ios-only # in conjunction with --skip-prompts
yo m-ionic --android-only # in conjunction with --skip-prompts
yo m-ionic --no-cordova # in conjunction with --skip-prompts, no platforms/plugins
```

## Inspiration
This guide was inspired by
- the localForage contribution guide - https://github.com/mozilla/localForage/blob/master/CONTRIBUTING.md
- the yeoman contribution guide - http://yeoman.io/contributing/pull-request.html
