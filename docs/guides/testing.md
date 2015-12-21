# Testing
When setting up your project or using the module, controller, service, directive or filter sub-generator, Generator-M-Ionic will automatically generate sample test files for that component. These files can be found in the `test/karma` and `test/protractor` directory respectively. To check if all tests are running properly run:

```sh
gulp karma
# and
gulp protractor
```
**Hint**: `gulp watch` and `gulp protractor` cannot be run at the same time.

If you are new to testing your app with protractor, karma and jasmine. Here are some good places to get started:

Articles on **testing angular**
- AngularJS Developer Guide - [Unit Testing](https://docs.angularjs.org/guide/unit-testing)
- Smashing Magazine - [Unit Testing In AngularJS](http://www.smashingmagazine.com/2014/10/introduction-to-unit-testing-in-angularjs/)
  - careful: uses mocha, chai & sinon but we use jasmine. Still worth a look!

**jasmine** website - http://jasmine.github.io/

**protractor** website - http://angular.github.io/protractor/#/

**karma** website - http://karma-runner.github.io/
