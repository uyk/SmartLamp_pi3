
var express = require("express");
var bodyParser = require("body-parser");
var request = require('request');
var PythonShell = require("python-shell");

var app = express();
var port = 4000;

var optionsSmartLamp = {
	uri : "http://218.150.183.150:3000/pi3",
	method : "GET",
	headers : { "Content-Type" : "application/x-www-form-urlencoded"},
};

var optionsPython = {
	mode: 'text',
	pythonOptions: ['-u']
};

app.use(bodyParser.urlencoded( {extended : false } ));

app.get('/', function(req,res) {
	console.log('smart void lamp pi3');
	res.send('Smart Voice Lamp pi3');
});

app.listen(port,function() {
	console.log("create Server");

	PythonShell.run('default.py',optionsPython,function(err, results) {
		if(err) throw err;
		console.log("results: %j", results);
	});
	//1초마다 smartLamp 함수 호출
	setInterval(smartLamp,1000);
});

function smartLamp() {
	//GET 요청 전송
	request(optionsSmartLamp, function(error, response, body) {
		if(body == "empty" ) {
			console.log("no data");
		}
		else {
			console.log(body);
			PythonShell.run("facebook.py", optionsPython, function(err, results) {
				if(err) throw err;
				console.log("results");
			});
		}
	});
}
