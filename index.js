var spawn = require('child_process').spawn;


module.exports = function(coffeeBreak) {
	"use strict";
	
	coffeeBreak.registerTask('prepare', function(project, data, done) {
		coffeeBreak.debug('Running grunt task');

		if (!project.grunt) {
			//No grunt build required, skipping
			done();
			return;
		}

		if (project.grunt && project.grunt.task) {
			var task = Array.isArray(project.grunt.task) ? project.grunt.task : [project.grunt.task];
			var grunt = spawn('grunt', task);

			grunt.stdout.on('data', function(data) {
				coffeeBreak.debug('grunt: ' + data.toString().replace(/\n$/, ''));
			});

			grunt.stderr.on('data', function() {
				coffeeBreak.debug('grunt-err: ' + data.toString().replace(/\n$/, ''));
			});

			grunt.on('close', function(code) {
				done();
			});
		}
	});
};