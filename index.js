var spawn = require('child_process').spawn;


module.exports = function(coffeeBreak) {
	"use strict";
	
	coffeeBreak.registerTask('prepare', function(conf, logger, done) {
		logger.info('Running grunt task');

		if (!conf.grunt) {
			//No grunt build required, skipping
			done();
			return;
		}

		if (conf.grunt && conf.grunt.task) {
			var task = Array.isArray(conf.grunt.task) ? conf.grunt.task : [conf.grunt.task];
			var grunt = spawn('grunt', task);

			grunt.stdout.on('data', function(data) {
				logger.info('grunt: ' + data.toString().replace(/\n$/, ''));
			});

			grunt.stderr.on('data', function() {
				logger.info('grunt-err: ' + data.toString().replace(/\n$/, ''));
			});

			grunt.on('close', function(code) {
				done();
			});
		}
	});
};