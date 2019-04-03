

// console.log("tasks.js is loaded");
// $.ajax({
//     url: 'api/getTasks/' + currentUser,
//     type: 'GET',
// }).then(function(response){
//     console.log("'then' fired");
//     var results = response;
//     console.log(results);
//     // write some stuff to the screen

// });

// capture the task button click
// $(".task-button").on("click", function(event){ // capture the click on any of the devour buttons
//     const userId = $(this).data('userId');
//     const taskId = $(this).data('taskId');
//     $.ajax({
//         url: "api/routes/" + userId + "/" + taskId,
//         type: "post"
//     }).then( function() {
//         $(this).remove();
//         location.reload(); // reload the page
//     })

// });

// $(".task-button").on("click", function(event){ 
//     $(this).remove();
// });