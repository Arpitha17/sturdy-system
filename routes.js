function initialize(app, db){
	
	app.get("/", function(req, res){
		var name = req.query.name;
		console.log("request to localhost received");

		if(name === undefined){
			res.render("index.html", {message: "Please enter your name in the url"});
		}else{
			res.render("index.html", {
				message: "Welcome, "+ name
			});
		}	
	});

	app.get("/todos", function(req, res){
		console.log("request to /todos received");

		db.collection("todoItems").find({}).toArray(function(err, results) {
            if(err) {
                console.log(err)
            }else {
                console.log(results);
                
                res.json({
                	todoList: results
                });
            }
        });

		
	});



	app.post("/createtodo", function(req, res){

		//console.log(req.body);
		//console.log(req.body);

		var date = new Date();

		var todoItem = {
			status: "unfinished",
			content: req.body.content,
			date: date
		};

		db.collection("todoItems").insert(todoItem, function(err, results) {
            if(err) {
                console.log(err)
            }else {
              //  console.log(results);
                res.json({
                   	message: "Inserted successfully"
                });
            }
        });


	});

		app.post('/delete',function(req,res){
	       //console.log(req.body);
	       var ObjectId = require('mongodb').ObjectID;
	       var collection = db.collection('todoItems');
	       
	       collection.remove({_id:new ObjectId(req.body._id)}, function(err,results){
	          	 if (err) {
                    console.log(err);
                } else {
                  console.log("deleted");
                  res.json({message: "deleted successfully"})

                  		// db.collection("todoItems").find({}).toArray(function(err, results1) {
                    //           if(err) {
                    //               console.log(err)
                    //           }else {
                    //               console.log(results1);
                                  
                    //               res.json({
                    //               	todoList: results1
                    //               });
                    //           }
                    //       });

                }
               // db.close()
	       });

});

}

exports.initialize = initialize;
