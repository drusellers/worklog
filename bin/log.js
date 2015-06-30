#!/usr/bin/env node

var requirejs = require('requirejs');

requirejs.config({
  baseUrl: __dirname
});

requirejs([
  'commander',
  'ini',
  'fs',
  'csv'
], function (program, ini, fs, csv) {

  program
    .version('v0.1.0');

  program
    .command('push <file>')
    .description('push work')
    .action(function (file) {
      var config = ini.parse(fs.readFileSync(file, 'utf-8'));

      for (var day in config) {
        for (var entry in config[day]) {
          console.log(entry);
          csv.parse(entry, function(err, data){
            var issue = data[0][0];
            var time = data[0][1];
            var message = data[0][2];
            var msg = 'jira-cmd addworklog ' + issue + ' ' + time + ' "' + message + '" -s "' + day + '"';
            console.log(msg);
          });
        }
      }


    });

  program.parse(process.argv);
});
