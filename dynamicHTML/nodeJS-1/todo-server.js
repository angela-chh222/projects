
const http = require('http');
const fs = require("fs");
//const express = require("express");
//const app = express;

let toDoListItems = ["Buy eggs", "Pay phone bill", "Do laundry", "30 minutes walking"];

//Create a server, giving it the handler function
//Request represents the incoming request object
//Response represents the outgoing response object
//Remember, you can break this apart to make it look cleaner
const server = http.createServer(function (request, response) {
	console.log(request.url);
	if(request.method === "GET"){
		if(request.url === "/" || request.url === "/todo.html"){
			//read the todo.html file and send it back
			fs.readFile("todo.html", function(err, data){
				if(err){
					response.statusCode = 500;
					response.write("Server error.");
					response.end();
					return;
				}
				response.statusCode = 200;
				response.setHeader("Content-Type", "text/html");
				response.write(data);
				response.end();
			});
		}
		else if(request.url === "/todo.js"){
			//read todo.js file and send it back
			fs.readFile("todo.js", function(err, data){
				if(err){
					response.statusCode = 500;
					response.write("Server error.");
					response.end();
					return;
				}
				response.statusCode = 200;
				response.setHeader("Content-Type", "application/javascript");
				response.write(data);
				response.end();
			});
		//Add any more 'routes' and their handling code here
		//e.g., GET requests for "/list", POST request to "/list"
		}
		else if (request.url.startsWith("/list")) {
			var items = '{"Items":[';
			for (var i = 0; i < toDoListItems.length; i++) {
				items = items + '"' +toDoListItems[i] + '"';
				if (i < (toDoListItems.length - 1)) {
					 items = items + ","
				}
			}
			items = items + "]}";
			console.log("items: " + items);
			response.statusCode = 200;
			response.setHeader("Content-Type", "application/javascript");
			response.write(items);
			response.end();
		}
		else{
			response.statusCode = 404;
			response.write("Unknwn resource.");
			response.end();
		}
	}
	else if(request.method === "POST"){
		//any handling in here
		var itemJSONString = '';
        request.on('data', function(data) {
            itemJSONString += data;
        });

        request.on('end', function () {
            console.log(JSON.parse(itemJSONString));
			itemName = JSON.parse(itemJSONString);
			var newAddedItem = itemName.name;
			toDoListItems.push(newAddedItem);
        });
		response.statusCode = 200;
		response.write("Unknwn resource.");
		response.end();
	}
	else if (request.method === "PUT") {
		var itemJSONString = '';
        request.on('data', function(data) {
            itemJSONString += data;
        });
        request.on('end', function () {
            console.log(JSON.parse(itemJSONString));
			var itemJSON;
			try {
			  itemJSON = JSON.parse(itemJSONString);
			} 
			catch(err)
			{
				console.error("JSON.parse error: " + err);
			}
			var removedItems = itemJSON.split(",");
			//remove items from to do list
			for (var j = 0; j < removedItems.length; j++) {
				//console.log("removed Item: " + removedItems[j]);
				var str = removedItems[j].replace('"', '');
				str = str.replace('"', '');
				for (var i = 0; i < toDoListItems.length; i++) {
					if (str === toDoListItems[i]) {
						//remove matching items
						console.log("remove item: " + toDoListItems[i]);
						toDoListItems.splice(i, 1);
					} 
				}
			}

        });
		response.statusCode = 200;
		response.write("Unknwn resource.");
		response.end();
	}
});

//Server listens on port 3000
server.listen(3000);
console.log('Server running at http://127.0.0.1:3000/');