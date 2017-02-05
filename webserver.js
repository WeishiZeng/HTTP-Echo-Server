var http = require("http");
url = require('url');
var port = 8080;  //http port
var serverUrl = "0.0.0.0";
var counter = 0; 

//pug
const pug = require('pug');
const compiledFunction = pug.compileFile('template.pug');
var headers;
var body;
var url;

var server = http.createServer(function(req, res) {


//TODO ignore /favicon.ico

  //main page, provide details about previous request
  if(req.url == "/") {
  var temp = {"headers": {"header1":"val1", "head2":"val2"}, "body":"test body"};
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/html');
	console.log("Request: " + req.method);
	console.log("Request: " + JSON.stringify(req.headers));
	console.log("Request: " + req.url);
	
	//null check previous request
	if (!headers) {
		res.setHeader("Content-Type", "text/html");
		
		//TODO not writing html in js?
		var html = "<h2 align=\"center\">HTTP Echo Server</h2> <p>No request captured yet.</p>";
		res.end(html);
		return;
	}
	//prepare data
	//TODO think of separate names from pug file
	var data = {"headers" : headers, "body" : body, "url": url};

	res.end(compiledFunction(data));
	return;

  }
  
	counter++;   
  console.log("Request: " + req.url + " (" + counter + ")"); //most browser gonna request for /favicon.ico
  
  
  //api calls, capture this request
  headers = req.headers;
  body = req.body;
  url = req.url;

  res.setHeader("Content-Type", "text/html");
  res.end("<p>You are at " + req.url + ". Request counter: " + counter + "</p>");

});

server.listen(port, serverUrl);
console.log("Server running at " + serverUrl + ":" + port);