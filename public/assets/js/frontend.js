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
            const userId = $(this).data('userId');
            const taskId = $(this).data('taskId');
            $.ajax({
                url: "api/routes/completeTask/" + userId + "/" + taskId,
                type: "post"
            }).then( function() {
                // trigger happy modal
                $("#taskModalLongTitle").text(taskConfirmedName);
                $('#taskModal').modal().show();
                $(this).remove();
                $("#none").remove();
                // $(this).remove();
                // location.reload(); // reload the page
            })
            
        }
    });

    //  router.post('/purchaseSwag/:userId/:swagId', ensureAuthenticated, AppController.purchaseSwag);
    // capture the click on a purchase
    $(".buy-button").on("click", function (event) {
        event.preventDefault();
        const userPoints = $(this).data('userPoints');
        const costPoints = $(this).data('costPoints');
        if (userPoints >= costPoints) {
            const userId = $(this).data('userId'); // this might go away
            const swagId = $(this).data('swagId');
            $.ajax({
                url: "api/routes/purchaseSwag" + userId + "/" + swagId,
                type: "post"
            }).then( function() {
                location.reload(); // reload the page
            })
        } else {
            // TODO: display a message that they need to earn X more points
        }
    });

    //  router.post('/updateAvatar/:userId/:type/:swagId', ensureAuthenticated, AppController.updateAvatar);
    // capture the click on an avatar update
    $(".update").on("click", function (event) {
        event.preventDefault();
        const swagType = $(this).data('swagType'); // this needed for API route build-out
        const fileName = $(this).data('fileName'); // this needed to update DOM avatar
        const userId = $(this).data('userId'); // this might go away
        const swagId = $(this).data('swagId'); // needed to update DB values
        $.ajax({
            url: "api/routes/updateAvatar/" + userId + "/" + swagType + "/" + swagId,
            type: "post"
        }).then( function() {
            // mouth eyes outfit body << swagIDs
            // new-eyes, etc outfit eyes mouth body
            if (swagType === "mouth") {
                $("#new-mouth").attr("src",fileName);
            } else if (swagType === "eyes") {
                $("#new-eyes").attr("src",fileName);
            } else if (swagType === "outfit") {
                $("#new-outfit").attr("src",fileName);
            } else if (swagType === "body") {
                $("#new-body").attr("src",fileName);
            }
        });
    })


    // boojiwoo clearfix but w/ js
    let boojHeight = $('#buildOutfit').height();
    console.log({boojHeight});
    $('#buildImage').attr('style','height: ' + boojHeight + 'px');
};
