'use strict';

module.exports = {
  firstUpper: function (string) {
    return string[0].toUpperCase() + string.substr(1, string.length);
  },

  camelToSnake: function (string) {
    string = this.firstUpper(string); // force first character to be upperCase
    var words = string.match(/[A-Z][a-z,0-9]*/g).map(function (item) {
      return item.toLowerCase();
    });
    return words.join('-');
  },
};
