'use strict';

var _s = require('underscore.string');

module.exports = {
  // TODO: replace with underscore.string's decapitalize as soon as possible
  // https://github.com/epeli/underscore.string/issues/286
  decapitalize: function (string) {
    return string[0].toLowerCase() + string.substr(1, string.length);
  },

  textToCamel: function (string) {
    string = string.replace('-', ' ');
    if (string.indexOf(' ') === -1) {
      return string;
    }
    return this.decapitalize(_s.classify(_s.slugify(string)));
  },

  camelToSnake: function (string) {
    string = _s.capitalize(string); // force first character to be upperCase
    var words = string.match(/[A-Z][a-z,0-9]*[^A-Z]*/g)
    .map(function (item) {
      return item.toLowerCase();
    });
    return words.join('-');
  },
};
