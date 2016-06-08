'use strict';

var assert = require('yeoman-assert');
var prompts = require('../generators/app/sources/prompts.js');

describe('generators/app/prompts', function () {
  it('prompts have proper formatting with \\n at beginning and end', function () {
    for (var key in prompts) {
      if (prompts.hasOwnProperty(key)) {
        for (var i = 0, prompt; (prompt = prompts[key][i]); i++) {
          assert.equal(prompt.message[0], '\n');
          assert.equal(prompt.message[prompt.message.length - 1], '\n');
        }
      }
    }
  });
});
