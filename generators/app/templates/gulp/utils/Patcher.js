'use strict';

var path = require('path');
var fs = require('fs');
var et = require('elementtree'); // also included in gen-m/package.json
var chalk = require('chalk');

/**
 * @param {string} projectRoot  path to project root
 * @param  {object} options     CLI options parsed by minimist, to discover platform
 */
var Patcher = function (projectRoot, options) {

  this.platformConfig = {
    android: {
      configLocation: 'res/xml',
      wwwLocation: 'assets/www/'
    },
    ios: {
      // retrieve project name which is necessary for ios config.xml path
      configLocation: this.getProjectName(projectRoot),
      wwwLocation: 'www/'
    },
    browser: {
      configLocation: '',
      wwwLocation: 'www/'
    }
  };

  this.platform = this.extractPlatform(options);
  this.configXmlPath = this.getConfigXmlPath(projectRoot, this.platform);
  this.wwwPath = path.join(projectRoot, 'platforms', this.platform, this.platformConfig[this.platform].wwwLocation);

  console.log(chalk.green(this.platform) + ' routing to: \n\t' + this.configXmlPath + '\n\t' + this.wwwPath);
};

Patcher.prototype.getProjectName = function (projectRoot) {
  var parsedConfigXML = this.parseXml(path.join(projectRoot, 'config.xml'));
  var nameTag = parsedConfigXML.find('name');
  return nameTag.text;
};

Patcher.prototype.parseXml = function (filename) {
  return new et.ElementTree(et.XML(fs.readFileSync(filename, 'utf-8')));
};

/**
 * extracts platform based on minimist options object
 * @param  {object} options minimist options object
 * @return {string}         platform as a string
 */
Patcher.prototype.extractPlatform = function (options) {

  for (var key in options) {
    if (options.hasOwnProperty(key) && typeof options[key] === 'string') {
      if (options[key].indexOf('ios') > - 1) {
        return 'ios';
      }
      if (options[key].indexOf('android') > - 1) {
        return 'android';
      }
      if (options[key].indexOf('browser') > - 1) {
        return 'browser';
      }
    }
  }
};

/**
 * returns configxmlpath based on platform and projectRoot
 * @param  {string} projectRoot path to project root
 * @param  {string} platform name of the platform
 * @return {string}          path as a string
 */
Patcher.prototype.getConfigXmlPath = function (projectRoot, platform) {
  var configXmlPath = path.join(projectRoot, 'platforms', platform, this.platformConfig[platform].configLocation, 'config.xml');
  return configXmlPath;
};

/**
 * patches the config.xml based on the inputs
 * @param  {string} externalUrl network url of browsersync server
 */
Patcher.prototype.patchConfigXml = function (externalUrl) {

  // retrieve platform's path to config.xml & parse it
  var configXml = this.parseXml(this.configXmlPath);
  console.log(chalk.green('patching ') + 'cordova.xml \n\t' + this.configXmlPath + '\n\t' + chalk.green(externalUrl));

  // set content src attrib to externalUrl
  var contentTag = configXml.find('content[@src]');
  contentTag.attrib.src = externalUrl;

  // Add allow-navigation element so it's possible to navigate to externalUrl
  var allowNavTag = et.SubElement(configXml.find('.'), 'allow-navigation');
  allowNavTag.set('href', '*');

  fs.writeFileSync(this.configXmlPath, configXml.write({
    indent: 4
  }), 'utf-8');
};

module.exports = Patcher;
