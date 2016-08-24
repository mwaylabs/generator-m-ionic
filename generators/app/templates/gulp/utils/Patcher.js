'use strict';

var path = require('path');
var fs = require('fs');
var et = require('elementtree'); // also included in gen-m/package.json
var chalk = require('chalk');

/**
 * @param {string} projectRoot  path to project root
 * @param  {object} options     CLI options parsed by minimist, to discover platform
 */
function Patcher (projectRoot, options) {
  this.projectRoot = projectRoot || '.';
  this.platform = this.extractPlatform(options);
  this.configXmlPath = this.getConfigXmlPath(this.projectRoot, this.platform);
}

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
  var CONFIG_LOCATION = {
    android: 'res/xml',
    // retrieve project name which is necessary for ios config.xml path
    ios: this.getProjectName()
  };
  var configXmlPath = path.join(projectRoot, 'platforms', platform, CONFIG_LOCATION[platform], 'config.xml');
  return configXmlPath;
};

/**
 * patches the config.xml based on the inputs
 * @param  {string} externalUrl network url of browsersync server
 */
Patcher.prototype.patchConfigXml = function (externalUrl) {

  // retrieve platform's path to config.xml & parse it
  var configXml = this.parseXml(this.configXmlPath);
  console.log(chalk.green('patching ') + this.configXmlPath);

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

Patcher.prototype.getProjectName = function () {
  var parsedConfigXML = this.parseXml(path.join(this.projectRoot, 'config.xml'));
  var nameTag = parsedConfigXML.find('name');
  return nameTag.text;
};


module.exports = Patcher;
