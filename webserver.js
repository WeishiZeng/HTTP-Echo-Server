var http = require("http");
url = require('url');
var port = 8080;  //http port
var serverUrl = "0.0.0.0";
var counter = 0; 

//pug
const pug = require('pug');
const compiledFunction = pug.compileFile('template.pug');


var server = http.createServer(function(req, res) {

  counter++;   
  console.log("Request: " + req.url + " (" + counter + ")"); //most browser gonna request for /favicon.ico
  
  if(req.url == "/") {
  
  var temp = {"headers": {"header1":"val1", "head2":"val2"}, "body":"test body"};
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/html');
	console.log("Request: " + req.method);
	console.log("Request: " + JSON.stringify(req.headers));
	console.log("Request: " + req.url);
	var text = 'Hello World\n';
	
	text = 	compiledFunction(temp);
	res.end(text);
	return;

  }

  res.setHeader("Content-Type", "text/html");
  res.end("<p>You are at " + req.url + ". Request counter: " + counter + "</p>");

});

server.listen(port, serverUrl);
console.log("Server running at " + serverUrl + ":" + port);