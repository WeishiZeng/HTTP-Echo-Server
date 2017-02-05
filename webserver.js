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
var method

var server = http.createServer(function (req, res) {


    // ignore /favicon.ico
    if (req.url == "/favicon.ico") {
        return;
    }
    //main page, provide details about previous request
    if (req.url == "/") {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        console.log("Requesting service page: " + req.url);

        //null check previous request
        if (!headers) {
            res.setHeader("Content-Type", "text/html");

            //TODO not writing html in js?
            var html = "<h2 align=\"center\">HTTP Echo Server</h2> <p>No request captured yet.</p>";
            res.end(html);
            return;
        }

        //TODO think of separate names from pug file
        var data = {"headers": headers, "body": body, "url": url, "method": method};

        res.end(compiledFunction(data));
        return;

    }

    counter++;
    console.log("Requesting: " + req.url + " (" + counter + ")"); //most browser gonna request for /favicon.ico


    //prepare body
    var temp = [];
    req.on('data', function (chunk) {
        temp.push(chunk);
    }).on('end', function () {
        temp = Buffer.concat(temp).toString();

        // at this point, `body` has the entire request body stored in it as a string
        body = temp;

        //api calls, capture this request
        headers = req.headers;
        url = req.url;
        method = req.method;

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end("{\"path\" : \"" + req.url + "\"}");
    });

});

server.listen(port, serverUrl);
console.log("Server running at " + serverUrl + ":" + port);