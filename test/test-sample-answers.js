'use strict';

var assert = require('yeoman-generator').assert;
var sampleAnswers = require('../generators/app/sources/sample-answers.js');

describe('sample-answers', function () {

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

  });
});
