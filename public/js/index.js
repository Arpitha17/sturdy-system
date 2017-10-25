//document.write('<script type="text/javascript" src="file1.js"></script>');




function addNewItem(){

	var listItem = document.createElement("LI");

	var todoInput = document.getElementById("todo-input");
    listItem.innerHTML = todoInput.value;



    document.getElementById("todo-list").appendChild(listItem);


	$.ajax({
		type: 'POST',
		url: '/createtodo',
		data: {
			content: todoInput.value
		},
		datatype: 'json',
		success: function(data){
			console.log(data);
			fetchTodosFromServer()
		},
		error: function(httpRequest, status, error){
			console.log(error);
		}
	})

    todoInput.value = "";
}


function fetchTodosFromServer(){
	$.ajax({
		type: 'GET',
		url: '/todoos',
		datatype: 'json',
		success: function(data, x, y){
			console.log(x)
			console.log(y)
			successDisplay(data);

	},
		error: function(httpRequest, status, error){
			console.log(error);

		}
	});
}

fetchTodosFromServer()


/*$.ajax({
	type:'GET',
	url:'/delete',
	datatype:'json',
	success:function(data){
		successDisplay(data);
	},
	error: function(httpRequest, status, error){
			console.log(error);

		}

}); */
