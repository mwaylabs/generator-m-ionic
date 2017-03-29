'use strict';

var assert = require('yeoman-assert');
var sampleAnswers = require('../generators/app/sources/sample-answers.js');

describe('generators/app/sample-answers', function () {

  describe('.getStandard(options)', function () {

    it('ios-only: true', function () {
      var answers = sampleAnswers.getStandard({'ios-only': true});
      assert.deepEqual(answers.platforms, ['ios']);
    });

    it('android-only: true', function () {
      var answers = sampleAnswers.getStandard({'android-only': true});
      assert.deepEqual(answers.platforms, ['android']);
    });

    it('cordova: false', function () {
      var answers = sampleAnswers.getStandard({'cordova': false});
      assert.deepEqual(answers.platforms, []);
      assert.deepEqual(answers.plugins, []);
    });

    it('ionicCss: true', function () {
      var answers = sampleAnswers.getStandard({'ionicCss': true});
      assert(answers.ionicCss);
    });

    it('ionicCss: false', function () {
      var answers = sampleAnswers.getStandard({'ionicCss': false});
      assert(!answers.ionicCss);
    });

    it('localforage: false', function () {
      var answers = sampleAnswers.getStandard({'localforage': false});
      var localforage = answers.bowerPackages.filter(function (value) {
        return value.indexOf('localforage') !== -1;
      });
      assert(!localforage.length);
    });

    it('localforage: true (default)', function () {
      var answers = sampleAnswers.getStandard();
      var localforage = answers.bowerPackages.filter(function (value) {
        return value.indexOf('localforage') !== -1;
      });
      assert(localforage.length);
    });

    it('appmobi: true', function () {
      var answers = sampleAnswers.getStandard({ appmobi: true });
      var appmobi = answers.ecosystems.filter(function (value) {
        return value.indexOf('appmobi') !== -1;
      });
      assert(appmobi.length === 0);
      assert(answers['APP_NAME'] === undefined);
      assert(answers['PROJECT_ID'] === undefined);
      assert(answers['CONFIG_URL'] === undefined);
    });

    it('ionic-cloud: true', function () {
      var answers = sampleAnswers.getStandard({ 'ionic-cloud': true });
      var ionic = answers.ecosystems.filter(function (value) {
        return value.indexOf('ionic-cloud') !== -1;
      });
      assert(ionic.length);
    });

  });
});
