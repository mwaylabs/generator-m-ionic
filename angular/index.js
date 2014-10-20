'use strict';
var chalk = require('chalk');
var yeoman = require('yeoman-generator');

var GulpIonicGenerator = yeoman.generators.NamedBase.extend({ // NamedBase requires one argument (name)
  initializing: function () {
    this.argument('descriptor', { // retrieve second argument
      required: true,
      type: 'String'
    });

    var availableGenerators = [
      'controller',
      'service',
      'partial'
    ];
    // TODO better way to retrieve available subgenerators?
    if (availableGenerators.indexOf(this.name) >= 0) {
      this.composeWith('m:angular-' + this.name, {arguments: [this.descriptor]});
    }
    else {
      this.log(chalk.yellow('Invalid option: ' + this.name + '. Available options are: ' + availableGenerators.join(', ')));
    }
  }
});

module.exports = GulpIonicGenerator;
