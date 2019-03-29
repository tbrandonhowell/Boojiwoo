window.onload = function() {

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
            $('#formDiv').attr("style","margin-top: " + newTopMargin);
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
};
