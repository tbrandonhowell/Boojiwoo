
var allDone = function() {
    console.log("allDone fired");
    let buttonCheck = $('#buttonForm').html().trim();
    console.log({buttonCheck});
    if (buttonCheck === ""){
        console.log("#buttonForm is empty");
        $('#buttonForm').html(
            `<img src="assets/images/png/thumbs-up.png" class="img-fluid">`
        )
        $('.speech-bubble').text(
            "Great job completing your tasks today! Keep it up!"
        )
    }
    
}

window.onload = function () {
  console.log('frontend.js is loaded');


  // ================================================
  // HOMEPAGE DIV FIX
  // THIS SHOULD REALLY BE FUNCTIONIZED TO WORK IN BOTH DIRECTIONS
  let logoHeight = $('#logoDiv').height();
  console.log({logoHeight});
  let formHeight = $('#formDiv').height();
  console.log({formHeight});
  console.log("test of new function:");
  console.log(fixHeight(logoHeight,formHeight));
  var heightFixes = fixHeight(logoHeight,formHeight);
  console.log("^^ did that work?");
  if ($(window).width() > 767) {
    console.log("window is big enough");
    if (heightFixes[0] === "right") {
      $('#formDiv').attr("style","margin-top: " + heightFixes[1] + "px");
    }
    if (heightFixes[0] === "left") {
      $('#logoDiv').attr("style","margin-top: " + heightFixes[1] + "px");
    }
    // if (logoHeight > formHeight) {
    //   console.log("logo is larger");
    //   let newTopMargin = (logoHeight - formHeight) / 2;
    //   console.log({newTopMargin});
    //   $('#formDiv').attr("style","margin-top: " + newTopMargin + "px");
    // } else {
    //     // something;
    // }
  }


  // homepage time of day
  var hours = new Date().getHours();
  if (hours > 17) {
    // evening
    $("#dayTime").text("evening");
    console.log("It's evening");
  } else if (hours > 12) {
    // afternoon
    $("#dayTime").text("afternoon");
    console.log("It's afternoon");
  } else {
    // something;
  }

  // homepage time of day
  var hours = new Date().getHours();
  if (hours > 17) {
    // evening
    $('#dayTime').text('evening');
    console.log("It's evening");
  } else if (hours > 12) {
    // afternoon
    $('#dayTime').text('afternoon');
    console.log("It's afternoon");
  } else {
    // morning
    $('#dayTime').text('morning');
    console.log("It's morning");
  }


  $('.bodyClick').on('click', function () {

    if ( $("#body0").hasClass("active") ) {
      console.log("body0 is active");
    }
    if ( $("#body1").hasClass("active") ) {
      console.log("body1 is active");
    }
    if ( $("#body2").hasClass("active") ) {
      console.log("body2 is active");
    }
    if ( $("#body3").hasClass("active") ) {
      console.log("body3 is active");
    }

  });

    // capture clicks on task buttons
  $(".task-button").on("click", function (event) {
    event.preventDefault();
    console.log('HEY HOOMAN');
    let taskConfirmedName = $(this).text();
    var affArray = ['You did it! Now dance like no one is watching!', 'Awesome! Everything you need to accomplish your goals is already in you!', 'Thank you for being a Rock Star!', 'Task Completed! Time to take over the world!', "Celebration! I'm so impressed. This kid's goin' places.", 'Victory! You are strong and capable!', "Let's have a round of Applause!", "I can't believe my eyes! It's nice to meet a Superhero like you!"]
    var randomAffirmation = affArray[Math.floor(Math.random() * affArray.length)];
    console.log(taskConfirmedName);
    if (taskConfirmedName === "None Yet") {
      // trigger sad modal
      $('#noneYetModal').modal().show();
    } else {
      // update the DB
      // const userId = $(this).data('userId'); // don't need this any longer
      const thisOne = $(this);
      const taskId = $(this).data('task');
      console.log("task = " + taskId);
      // router.post('/completeTask/:taskId'
      $.ajax({
        url: "api/completeTask/" + taskId,
        type: "post"
      }).then( function() {
        thisOne.remove();
        // trigger happy modal
        $('.modal-body').text(randomAffirmation);
        $('#taskModalLongTitle').text(taskConfirmedName);
        $('#taskModal').modal().show();
        allDone(); // update the message when all tasks have been completed
      })
    }
  });


    //  router.post('/purchaseSwag/:userId/:swagId', ensureAuthenticated, AppController.purchaseSwag);
    // capture the click on a purchase
  $(".buy-button").on("click", function (event) {
    event.preventDefault();
    const userPoints = $(this).data('userpoints');
    console.log({userPoints});
    const costPoints = $(this).data('costpoints');
    console.log({costPoints});
    let difference = costPoints - userPoints;
    console.log({difference});
    $("#pointsNeeded").text(difference);
    const swagId = $(this).data('swagid');
    console.log({swagId});
    $.ajax({
      url: "api/purchaseSwag/" + swagId,
      type: "post"
    }).then( function() {
      location.reload(); // reload the page
    });
  });



// capture the click on a not yet
$(".not-yet").on("click", function (event) {
    event.preventDefault();
    const userPoints = $(this).data('userpoints');
    console.log({userPoints});
    const costPoints = $(this).data('costpoints');
    console.log({costPoints});
    let difference = costPoints - userPoints;
    console.log({difference});
    $("#pointsNeeded").text(difference);
    console.log("user can't purchase");
    // TODO: display a message that they need to earn X more points
    $('#expenseModal').modal().show();
  });


    //  router.post('/updateAvatar/:userId/:type/:swagId', ensureAuthenticated, AppController.updateAvatar);
    // capture the click on an avatar update
  $(".upgrade").on("click", function (event) {
    event.preventDefault();
    console.log("Update click captured");
    const swagType = $(this).data('swagtype'); // this needed for API route build-out
    console.log({swagType});
    const fileName = $(this).data('filename'); // this needed to update DOM avatar
    console.log({fileName});
    // const userId = $(this).data('userId'); // this might go away
    // const swagId = $(this).data('swagId'); // needed to update DB values
    $.ajax({
      url: "api/updateAvatar/" + swagType,
      type: "post",
      data: {
        filePath: fileName
      }
    }).then( function() {
      console.log("success for DB push");
      // mouth eyes outfit body << swagIDs
      // new-eyes, etc outfit eyes mouth body
      if (swagType === "mouth") {
        $("#new-mouth").attr("src",fileName);
      } else if (swagType === "eyes") {
        $("#new-eyes").attr("src",fileName);
      } else if (swagType === "outfit") {
        $("#new-outfit").attr("src",fileName);
      } else if (swagType === "body") { // is it a color(body)?
        $("#new-body").attr("src",fileName);
      }
    });
  })



  // boojiwoo clearfix but w/ js
  let boojHeight = $('#buildOutfit').height();
  console.log({ boojHeight });
  $('#buildImage').attr('style', 'height: ' + boojHeight + 'px');

};
