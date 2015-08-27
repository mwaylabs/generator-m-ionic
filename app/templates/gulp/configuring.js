
'use strict';
// gulp
var gulp = require('gulp');
var options = gulp.options;
// other
var chalk = require('chalk');
var minimist = require('minimist');
var fs = require('fs');
var xml2js = require('xml2js');

gulp.task('config', function () {
  var parser = new xml2js.Parser();
  var builder = new xml2js.Builder({
    renderOp: {
      pretty: true,
      indent: ' '
    },
    xmldec: {
      version: '1.0',
      encoding: 'utf-8'
    }
  });
  // read & parse file
  var xmlFile = fs.readFileSync('config.xml');
  parser.parseString(xmlFile, function (err, result) {
    // get values
    if (options.getWidgetAttr) {
      console.log(result.widget.$[options.getWidgetAttr]);
    }
    // update values
    if (options.setWidgetAttr) {
      var split = options.setWidgetAttr.split('=');
      var key = split[0];
      var value = split[1];
      result.widget.$[key] = value;
    }

    if (options.setName) {
      result.widget.name = options.setName;
    }
    if (options.setDescription) {
      result.widget.description = options.setDescription;
    }
    if (options.setAuthor) {
      var splits = options.setAuthor.split('---');
      if (splits[0]) {
        result.widget.author[0]._ = splits[0];
      }
      if (splits[1]) {
        result.widget.author[0].$.email = splits[1];
      }
      if (splits[2]) {
        result.widget.author[0].$.href = splits[2];
      }
    }
    // write file
    var xml = builder.buildObject(result);
    fs.writeFileSync('config.xml', xml);
  });
});

gulp.task('defaults', function () {
  var filePath = './gulp/.gulp_settings.json';
  var exists = fs.existsSync(filePath);

  var fileContent = {};
  if (exists) {
    fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }
  var defaults = fileContent.defaults;

  // set
  if (options.set) {
    if (typeof options.set !== 'string') {
      console.log(chalk.red('Use like this: --set=\'<task-name> --flag1 --flag2=value\''));
      return;
    }

    var newDefaults = minimist(options.set.split(' '));
    if (!defaults) {
      fileContent.defaults =  defaults = {};
    }

    var setTask = newDefaults._[0];
    delete newDefaults._;
    defaults[setTask] = newDefaults;

    console.log(chalk.green('set defaults for task \'' + setTask + '\': '), newDefaults);
  }
  // clear
  else if (options.clear) {
    var clearTask = options.clear;
    if (typeof clearTask !== 'string') {
      console.log(chalk.red('Use like this: --clear <task-name>'));
      return;
    }
    if (!defaults || !defaults[clearTask]) {
      console.log(chalk.yellow('Nothing to clear'));
      return;
    }

    delete defaults[clearTask];
    console.log(chalk.yellow('cleared defaults for task \'' + clearTask + '\''));

    // last? -> delete defaults object
    if (!Object.keys(defaults).length) {
      delete fileContent.defaults;
    }
  }
  // show
  else {
    if (defaults) {
      console.log(chalk.green('defaults:'));
      for (var key in defaults) {
        console.log(chalk.green(key + ': '), defaults[key]);
      }
    }
    else {
      console.log(chalk.yellow('no defaults yet'));
    }
  }

  // write changes to file
  if (options.clear || options.set) {
    fs.writeFileSync(filePath, JSON.stringify(fileContent, undefined, 2));
  }
});
