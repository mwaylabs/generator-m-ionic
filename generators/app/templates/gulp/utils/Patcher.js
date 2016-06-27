'use strict';

var path = require('path');
var fs = require('fs');
var et = require('elementtree'); // also included in gen-m/package.json
var chalk = require('chalk');

function Patcher (projectRoot) {
  this.projectRoot = projectRoot || '.';
}

Patcher.prototype.parseXml = function (filename) {
  return new et.ElementTree(et.XML(fs.readFileSync(filename, 'utf-8')));
};

Patcher.prototype.patchConfigXml = function (externalUrl) {
  var platforms = ['android', 'ios'];
  platforms.forEach(function (platform) {

    var CONFIG_LOCATION = {
      android: 'res/xml',
      // retrieve project name which is necessary for ios config.xml path
      ios: this.getProjectName()
    };

    // retrieve platform's path to config.xml & parse it
    var configXmlPath = path.join(this.projectRoot, 'platforms', platform, CONFIG_LOCATION[platform], 'config.xml');
    var configXml = this.parseXml(configXmlPath);
    console.log(chalk.green('patching ') + configXmlPath);

    // set content src attrib to externalUrl
    var contentTag = configXml.find('content[@src]');
    contentTag.attrib.src = externalUrl;

    // Add allow-navigation element so it's possible to navigate to externalUrl
    var allowNavTag = et.SubElement(configXml.find('.'), 'allow-navigation');
    allowNavTag.set('href', '*');

    fs.writeFileSync(configXmlPath, configXml.write({
      indent: 4
    }), 'utf-8');
  }, this);
};

Patcher.prototype.getProjectName = function () {
  var parsedConfigXML = this.parseXml(path.join(this.projectRoot, 'config.xml'));
  var nameTag = parsedConfigXML.find('name');
  return nameTag.text;
};


module.exports = Patcher;
