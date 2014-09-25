'use strict';

module.exports = {
  camelToSnake: function (string) {
    string = string[0].toUpperCase() + string.substr(1, string.length); // force first character to be upperCase
    var words = string.match(/[A-Z][a-z]*/g).map(function (item) {
      return item.toLowerCase();
    });
    return words.join('-');
  },
};
