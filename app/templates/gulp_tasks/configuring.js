
'use strict';
// gulp
var gulp = require('gulp');
var options = gulp.options;
// other
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
  var xmlFile = fs.readFileSync(__dirname + '/config.xml');
  parser.parseString(xmlFile, function (err, result) {
    // actual processing
    if (options.setVersion) {
      result.widget.$.version = options.setVersion;
    }
    if (options.setBuild) {
      result.widget.$.version = result.widget.$.version + '.' + options.setBuild;
    }
    if (options.setBundle) {
      result.widget.$.id = options.setBundle;
    }

    var xml = builder.buildObject(result);
    fs.writeFileSync(__dirname + '/config.xml', xml);
  });
});
