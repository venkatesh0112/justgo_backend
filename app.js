/*jshint node:true*/

// app.js
// This file contains the server side JavaScript code for your application.
// This sample application uses express as web application framework (http://expressjs.com/),
// and jade as template engine (http://jade-lang.com/).

var express = require('express');
var getRank=require('./routes/getRank.js');
// setup middleware

var app=express();
app.use(express.static(__dirname + '/public')); //setup static public directory
app.set('view engine', 'jade');
app.set('views', __dirname + '/views'); //optional since express defaults to CWD/views
//hello
// render index page
app.get('/', function(req, res){
	res.render('index');
});
app.get('/getRank/:longitude/:latitude',getRank.getRank)
// There are many useful environment variables available in process.env.
// VCAP_APPLICATION contains useful information about a deployed application.
var appInfo = JSON.parse(process.env.VCAP_APPLICATION || "{}");
// TODO: Get application information and use it in your app.

// VCAP_SERVICES contains all the credentials of services bound to
// this application. For details of its content, please refer to
// the document or sample of each service.
var services = JSON.parse(process.env.VCAP_SERVICES || "{}");
// TODO: Get service credentials and communicate with bluemix services.

// The IP address of the Cloud Foundry DEA (Droplet Execution Agent) that hosts this application:
var host = 'localhost';
// The port on the DEA for communication with the application:
var port = 3000;
// Start server

var http = require('http').Server(app);
http.listen(port, function(){
	console.log('App started on port ' + port);
});


