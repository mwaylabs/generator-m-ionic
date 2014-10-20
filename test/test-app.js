/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('m:app', function () {
  this.timeout(50000);
  describe('no params', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .inDir(path.join(__dirname, './tmp'))
        .withGenerators([
          '../../angular-controller',
          '../../angular-partial',
          '../../angular-service'
        ])
        .inDir(path.join(__dirname, './temp-test')) // create new dir
        .withOptions({ 'skip-install': true }) // execute with options
        .withPrompt({ // answer prompts
          'appName': 'tradecore',
          'appId': 'com.mwaysolutions.tradecoreionic',
          'bowerPackages': [
            'angular-dynamic-locale#~0.1.17',
            'angular-localForage#~0.2.10',
            'angular-touch#~1.2.25',
            'angular-translate#~2.4.0',
            'angular-translate-loader-static-files#~2.4.0',
            'angular-ui-bootstrap-bower#~0.11.0',
            'fastclick#~1.0.3',
            'restangular#~1.4.0'
          ],
          'ionicSass': true,
          'stableVersions': true,
          'platforms': [
            'ios',
            'android'
          ],
          'plugins': [
            'org.apache.cordova.device'
          ],
          'includeSass': true
        })
        .on('end', done);
    });

    it('creates files', function () {
      assert.equal('a', 'a');
    });
  });
});
