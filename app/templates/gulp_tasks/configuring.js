
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
  // read & parse file
  var xmlFile = fs.readFileSync('config.xml');
  parser.parseString(xmlFile, function (err, result) {
    // update values
    if (options.setVersion) {
      result.widget.$.version = options.setVersion;
    }
    if (options.setBuild) {
      result.widget.$.version = result.widget.$.version + '.' + options.setBuild;
    }
    if (options.setBundle) {
      result.widget.$.id = options.setBundle;
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
