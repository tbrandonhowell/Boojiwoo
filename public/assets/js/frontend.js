window.onload = function() {

    console.log("frontend.js is loaded");

    // homepage div fix
    // THIS SHOULD REALLY BE FUNCTIONIZED TO WORK IN BOTH DIRECTIONS
    let logoHeight = $('#logoDiv').height();
    console.log({logoHeight});
    let formHeight = $('#formDiv').height();
    console.log({formHeight});
    if ($(window).width() > 767) {
        console.log("window is big enough");
        if (logoHeight > formHeight) {
            console.log("logo is larger");
            let newTopMargin = (logoHeight - formHeight) / 2;
            console.log({newTopMargin});
            $('#formDiv').attr("style","margin-top: " + newTopMargin + "px");
        } else {
            // something;
        }
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
        // morning
        $("#dayTime").text("morning");
        console.log("It's morning");
    }

    $(".bodyClick").on("click", function () {

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
        let taskConfirmedName = $(this).text();
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
                thisOne.hide();
                // trigger happy modal
                $("#taskModalLongTitle").text(taskConfirmedName);
                $('#taskModal').modal().show();
                $("#none").remove();
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
        if (userPoints >= costPoints) {
            console.log("user can purchase");
            // const userId = $(this).data('userId'); // this might go away
            const swagId = $(this).data('swagid');
            console.log({swagId});
            $.ajax({
                url: "api/purchaseSwag/" + swagId,
                type: "post"
            }).then( function() {
                location.reload(); // reload the page
            })
        } else {
            console.log("user can't purchase");
            // TODO: display a message that they need to earn X more points
            $('#purchaseModal').modal().show();
        }
    });

    //  router.post('/updateAvatar/:userId/:type/:swagId', ensureAuthenticated, AppController.updateAvatar);
    // capture the click on an avatar update
    $(".update").on("click", function (event) {
        event.preventDefault();
        const swagType = $(this).data('swag'); // this needed for API route build-out
        console.log({swagType});
        const fileName = $(this).data('file'); // this needed to update DOM avatar
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
            } else if (swagType === "c") { // is it a color(body)?
                $("#new-body").attr("src",fileName);
            }
        });
    })


    // boojiwoo clearfix but w/ js
    let boojHeight = $('#buildOutfit').height();
    console.log({boojHeight});
    $('#buildImage').attr('style','height: ' + boojHeight + 'px');
};
