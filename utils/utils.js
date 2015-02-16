'use strict';

var _s = require('underscore.string');
var config = require('./config.js');
var strings = require('./strings.js');

// TODO: move string manipulations functions behind facade?

module.exports = {

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
    else if (controllerName.substr(-4) === 'Ctrl') {
      controllerName = controllerName.substr(0, controllerName.length - 4);
    }
    else {
    }
    controllerName += 'Ctrl';

    return controllerName;
  },

  /**
   * transforms userInput into a service name for angular
   * @param  {String} userInput arbitrary user input
   * @return {[type]}           angular-friendly service name
   */
  serviceName: function (userInput) {
    return _s.capitalize(userInput);
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
