/*global describe, it*/
'use strict';

var assert = require('yeoman-generator').assert;
var sampleAnswers = require('../app/sources/sample-answers.js');

describe('sample-answers', function () {

  it('getStandard(options)', function () {
    var answers = sampleAnswers.getStandard({'ios-only': true});
    assert.deepEqual(answers.platforms, ['ios']);
    answers = sampleAnswers.getStandard({'android-only': true});
    assert.deepEqual(answers.platforms, ['android']);
    answers = sampleAnswers.getStandard({'cordova': false});
    assert.deepEqual(answers.platforms, []);
    assert.deepEqual(answers.plugins, []);
  });
});
