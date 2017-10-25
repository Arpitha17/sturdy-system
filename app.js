var http = require("http");// module used to create a web server
var express = require("express"); //to install express or other modules, type npm install express
var consolidate = require("consolidate");//1
var _ = require("underscore");
var bodyParser = require('body-parser');

var routes = require('./routes'); //File that contains our endpoints

var MongoClient = require('mongodb').MongoClient;

var app = express();
app.use(bodyParser.urlencoded({
   extended: true,

}));
             
app.use(bodyParser.json({limit: '5mb'}));

app.set('views', 'templates'); //Set the folder-name from where you serve the html page. 
app.use(express.static('./public')); //setting the folder name (public) where all the static files like css, js, images etc are made available


app.set('view engine','html');
app.engine('html',consolidate.underscore);
var portNumber = 7000; //for locahost:8000

http.createServer(app).listen(portNumber, function(){ //creating the server which is listening to the port number:8000, and calls a function within in which calls the initialize(app) function in the router module
	console.log('Server listening at port '+ portNumber);

	var url = 'mongodb://localhost:27017/todoAppDb';

		MongoClient.connect(url, function(err, db) { //a connection with the mongodb is established here.
			if(err){
				console.log("Error in connection!!!" +err);
			}else {
				console.log("Connected to Database");
				routes.initialize(app, db); //function defined in routes.js which is exported to be accessed by other modules	
			}
	});
});




/* 1. Not all the template engines work uniformly with express, hence this library in js, (consolidate), is used to make the template engines work uniformly. Altough it doesn't have any 
modules of its own and any template engine to be used should be seprately installed!*/