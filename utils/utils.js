'use strict';

var _s = require('underscore.string');
var config = require('./config.js');
var strings = require('./strings.js');

module.exports = {

  /**
   * validates the userInput to see if a appName was entered
   * @param  {string} userInput input of user
   * @return {boolean|string}   true if ok, string if failed
   */
  validateAppName: function (userInput) {
    return userInput ? true : 'Please enter a name';
  },

  /**
   * validates the userInput to see if a valid bundle identifier was entered
   * @param  {string} userInput input of user
   * @return {boolean|string}   true if ok, string if failed
   */
  validateAppId: function (userInput) {
    var pattern = /^[a-z][a-z0-9_]*(\.[a-z0-9_]+)+[0-9a-z_]$/i;
    return pattern.test(userInput) ? true : 'Please enter a valid bundle identifier! E.g. com.company.project';
  },

  /**
   * checks if the module exists
   * @param  {String} module moduleName
   * @return {String}        moduleName or config.DEFAULT_MODULE
   */
  checkModule: function (module) {
    return module ? module : config.DEFAULT_MODULE;
  },

  /**
   * transforms user input into a useful modulename for angular
   * @param  {String} userInput arbitrary user input
   * @return {String}           angular-friendly module name
   */
  moduleName: function (userInput) {
    return strings.textToCamel(userInput);
  },

  /**
   * transform module name into folder for the FS
   * @param  {String} moduleName moduleNamed transformed by moduleName method
   * @return {String}            FS-friendly controller name
   */
  moduleFolder: function (moduleName) {
    return strings.camelToSnake(moduleName);
  },

  /**
   * transforms user input from text to snake-case
   * @param  {String} userInput free text
   * @return {String}           snake-case string
   */
  appBowerName: function (userInput) {
    var string = strings.textToCamel(userInput);
    string = strings.camelToSnake(string);
    return string;
  },

  /**
   * yields a configName based on the name of the module
   * @param  {String} moduleName the name of the module to create the config iin
   * @return {String}            the name of the config
   */
  configName: function (moduleName) {
    var configName;

    if (!moduleName) {
      configName = config.CONFIG_SUFFIX;
    }
    else if (moduleName === this.moduleName(config.DEFAULT_MODULE)) {
      configName = config.CONFIG_SUFFIX;
    }
    else {
      configName = moduleName + config.CONFIG_SUFFIX;
    }

    return _s.capitalize(configName);
  },

  /**
   * transforms userInput into a controller name for angular
   * @param  {String} userInput arbitrary user input
   * @return {String}           angular-friendly controller name
   */
  controllerName: function (userInput) {
    // force first character uppercase
    var controllerName = _s.capitalize(userInput);
    // enforce Ctrl name ending
    if (controllerName.substr(-10) === 'Controller') {
      controllerName = controllerName.substr(0, controllerName.length - 10);
    }
    else if (controllerName.substr(-4) === config.CONTROLLER_SUFFIX) {
      controllerName = controllerName.substr(0, controllerName.length - 4);
    }
    controllerName += config.CONTROLLER_SUFFIX;

    return controllerName;
  },

  /**
   * transforms userInput into a service name for angular
   * @param  {String} userInput arbitrary user input
   * @return {String}           angular-friendly service name
   */
  serviceName: function (userInput) {
    return _s.capitalize(userInput);
  },

  /**
   * transforms userInput into a directive tag for angular
   * @param  {String} userInput arbitrary user input
   * @return {String}           directive tag
   */
  directiveTagName: function (userInput) {
    return strings.camelToSnake(userInput);
  },

  /**
   * transforms a module, controller, service, template name
   * into a FS-friendly filename
   * @param  {String} camelCase string in camelcase notation
   * @return {String}           FS-friendly filename
   */
  fileName: function (camelCase) {
    return strings.camelToSnake(camelCase);
  },

  /**
   * returns a random ionic bar color
   * @return {String} ionic color
   */
  barColor: function () {
    return config.IONIC_COLORS[Math.floor(Math.random() * config.IONIC_COLORS.length)];
  }
};
