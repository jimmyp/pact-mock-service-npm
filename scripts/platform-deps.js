//Download and install the correct platform specific package for the mock server
var npm = require("npm"),
	exec = require('child_process').exec;
var arch = "";
var path = require('path');
var pkgPath = path.resolve(__dirname, '../package.json');
var fs = require('fs'),
	pkg = require(pkgPath);


npm.load(function (er, npm) {
	if (process.platform === 'linux') {
		arch = '-' + process.arch;
	}
	var packageName = 'pact-mock-service-' + process.platform + arch;
	console.log("Installing Pact mock server for " + packageName);

	//Install npm into the wrapping pact-mock-service node_modules directory to avoid nested node_modules
	exec('npm install ' + packageName + '@'+pkg.version, {cwd: path.resolve(__dirname, '..')}, function (error, stdout, stderr) {
		if (error) {
			console.error(error);
			process.exit(1);
		}
		console.log("Pact mock server for " + packageName + " installed successfully.");

		// Specify the bin path of the downloaded package, in the bin path of pact-mock-service
		var p = path.resolve(__dirname, '../node_modules/' + packageName);
		var bin = require(path.join(p, 'package.json')).bin;
		// Setting path to be relative to project's package.json
		bin['pact-mock-service'] = './'+ path.relative(path.dirname(pkgPath), path.resolve(p, bin['pact-mock-service']));
		pkg.bin = bin;

		// Write it to package.json
		fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
	});
});
