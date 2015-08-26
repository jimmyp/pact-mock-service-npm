//Download and install the correct platform specific package for the mock server
var exec = require('child_process').exec;
var cmd = 'prince -v builds/pdf/book.html -o builds/pdf/book.pdf';
var arch = "";

if (process.platform === 'linux') {
	arch = '-' + process.arch;
}

var pactName = 'pact-mock-service-' + process.platform + arch;

exec('./node_modules/'+pactName+'/bin/'+pactName, function(error, stdout, stderr) {
	// command output is in stdout
});