var http = require("http");
var fs = require('fs');
url = require('url');
var port = 8080;  //http port
var serverUrl = "0.0.0.0";
var counter = 0; 

var server = http.createServer(function(req, res) {

  counter++;   
  console.log("Request: " + req.url + " (" + counter + ")"); //most browser gonna request for /favicon.ico
  
  if(req.url == "/") {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/html');
	console.log("Request: " + req.method);
	console.log("Request: " + JSON.stringify(req.headers));
	console.log("Request: " + req.url);
	var text = 'Hello World\n';
	
	res.end(text);
	return;

  } 

//   var patt = new RegExp(".jpg");
//   if (patt.test(req.url)) {
//     var action = req.pathname;
//     console.log("Image " + action + ":" + req.url);
// 
//      var img = fs.readFileSync('./'+req.url);
//      res.writeHead(200, {'Content-Type': 'image/gif' });
//      res.end(img, 'binary');
// 
//      return;
//   
//   }

  res.setHeader("Content-Type", "text/html");
  res.end("<p>Yo Anna! You are at " + req.url + ". Request counter: " + counter + "</p>");

});

server.listen(port, serverUrl);
console.log("Server running at " + serverUrl + ":" + port);