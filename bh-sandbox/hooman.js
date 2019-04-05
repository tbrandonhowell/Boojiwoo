$('.bodyClick').on('click', function () {
    if ($('#body0').hasClass('active')) {
      console.log('body0 is active');
    }
    if ($('#body1').hasClass('active')) {
      console.log('body1 is active');
    }
    if ($('#body2').hasClass('active')) {
      console.log('body2 is active');
    }
    if ($('#body3').hasClass('active')) {
      console.log('body3 is active');
    }
  });

  // capture clicks on task buttons
  $('.task-button').on('click', function (event) {
    event.preventDefault();
    console.log('HEY HOOMAN');
    let taskConfirmedName = $(this).text();
    var affArray = ['You did it! Now dance like no one is watching!', 'Awesome! Everything you need to accomplish your goals is already in you!', 'Thank you for being a Rock Star!', 'Task Completed! Time to take over the world!', "Celebration! I'm so impressed. This kid's goin' places.", 'Victory! You are strong and capable!', "Let's have a round of Applause!", "I can't believe my eyes! It's nice to meet a Superhero like you!"]
    var randomAffirmation = affArray[Math.floor(Math.random() * affArray.length)];
    console.log(taskConfirmedName);
    if (taskConfirmedName === 'None Yet') {
      // trigger sad modal
      $('#noneYetModal').modal().show();
    } else {
      // trigger happy modal
      $('.modal-body').text(randomAffirmation);
      $('#taskModalLongTitle').text(taskConfirmedName);
      $('#taskModal').modal().show();
    }
    // trigger div w/ task info in it using variable
    // ajax call to DB to mark task as complete
  });