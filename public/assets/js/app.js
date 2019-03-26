// ADD
$('#add-account').on('click', function (event) {
  event.preventDefault();

  // make a newAccount obj
  const newAccount = {
    firstName: $('#inputFirst').val().trim(),
    lastName: $('#inputLast').val().trim(),
    email: $('#inputEmail').val().trim(),
    password: $('#inputPassword').val().trim()
  };

  if (newAccount.password.length > 0 && newAccount.email.length > 0 && newAccount.password.length > 0 && newAccount.lastName.length > 0 && newAccount.firstName.length > 0) {
    $.ajax({
      type: 'post',
      url: '/api/register',
      data: newAccount
    }).then(function () {
      window.location.href = '/';
    });
  } else {
    console.log('**Please fill out entire form**');
    $('#create-err-msg').empty('').text('**Please fill out entire form**');
  }
});

$('#update-account').on('click', function (event) {
  event.preventDefault();

  // capture All changes
  var changeAccount = {
    firstName: $('#inputFirst').val().trim(),
    lastName: $('#inputLast').val().trim(),
    email: $('#inputEmail').val().trim(),
  };
  $('#err-msg').empty('');
  // $('#change-account-modal').modal('show');
  console.log(changeAccount);

  if (changeAccount.account_id.length > 0 && changeAccount.password.length > 0 && changeAccount.phone.length > 0 && changeAccount.email.length > 0 && changeAccount.balance.length > 0 && changeAccount.zip.length > 0 && changeAccount.state.length > 0 && changeAccount.city.length > 0 && changeAccount.street.length > 0 && changeAccount.password.length > 0 && changeAccount.last_name.length > 0 && changeAccount.first_name.length > 0){
    $.ajax({
      type: 'PUT',
      url: '/accounts/' + changeAccount.account_id + '/' + changeAccount.password,
      data: changeAccount
    }).then(
      function () {
        console.log('Updated account', changeAccount);
        // Reload the page to get the updated list
        location.reload();
      }
    );

  } else {
    console.log('**Please fill out entire form**');
    $('#update-err-msg').empty('').text('**Please fill out entire form**');
  }
});

// DELETE   ***************************************************
$('#delete-account').on('click', function (event) {
  event.preventDefault();
  $('#err-msg').empty('');
  $('#delete-account-modal').modal('show');
});

$('#confirm-delete').on('click', function (event) {
  var deleteAccount = {
    accountId: $('#account_id').val().trim(),
    password: $('#account_password').val().trim(),
  };

  console.log(deleteAccount);

  if (deleteAccount.account_id.length > 0 && deleteAccount.password.length > 0) {
    $.ajax('/accounts/' + deleteAccount.account_id + '/' + deleteAccount.password, {
      type: 'DELETE'
    }).then(
      function () {
        console.log('deleted account', deleteAccount.account_id);
        // Reload the page to get the updated list
        location.reload();
      }
      
    );
  } else {
    console.log('fill out entire form');
    $('#err-msg').empty('').text('fill out entire form');
  }
});

$('#register').on('click', function (event) {
  event.preventDefault();
  window.location.href = '/register';
});

$('#login-modal').on('click', function (event) {
  event.preventDefault();
  $('#account-info').modal('show');
});

$('#go-home').on('click', function (event) {
  event.preventDefault();
  window.location.href = '/';
});

$('#login').on('click', function (event) {
  event.preventDefault();

  const user = {
    email: $('#email').val().trim(),
    password: $('#account_password').val().trim()
  };
  
  $.post('/api/login', user, function(result){
    if(result) {
      $(location).attr('href', '/dashboard');
    } else {
      $('#account-info').modal('close');
      alert('oops something went wrong, please try again!');
    }
  });
});

