//Download and install the correct platform specific package for the mock server
var npm = require("npm"),
	exec = require('child_process').exec;
var arch = "";
npm.load(function (er, npm) {
	if (process.platform === 'linux') {
		arch = '-' + process.arch;
	}
	var packageName = 'pact-mock-service-' + process.platform + arch;
	console.log("Installing Pact mock server for " + packageName);

	//Install npm into the wrapping pact-mock-service node_modules directory to avoid nested node_modules
	exec('npm install ' + packageName + '@latest', {cwd:'../..'}, function (error, stdout, stderr) {
		if (error) {
			console.error(error);
			process.exit(1);
		}
		console.log("Pact mock server for - " + packageName + " installed successfully.");
	});
});
