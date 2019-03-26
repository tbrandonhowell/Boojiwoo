$('#add-account').on('click', function (event) {
  event.preventDefault();

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

  const id = $(this).data('id');

  // capture All changes
  const changeUser = {
    firstName: $('#inputFirst').val().trim(),
    lastName: $('#inputLast').val().trim(),
    email: $('#inputEmail').val().trim(),
    password: $('#inputPassword').val().trim()
  };
  $('#err-msg').empty('');
  // $('#change-account-modal').modal('show');
  console.log(changeUser);

  if (changeUser.password.length > 0 && changeUser.email.length > 0 && changeUser.password.length > 0 && changeUser.lastName.length > 0 && changeUser.firstName.length > 0) {
    $.ajax({
      type: 'PUT',
      url: `/api/user/${id}`,
      data: changeUser
    }).then(function (result) {
      console.log('Updated user:', result);
      // Reload the page to get the updated list
      window.location.href = '/logout';
    });

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
  event.preventDefault();

  const id = $(this).data('id');

  const deleteUser = {
    userEmail: $('#userEmail').val().trim(),
    userPassword: $('#userPassword').val().trim(),
  };

  if (deleteUser.userEmail.length > 0 && deleteUser.userPassword.length > 0) {
    $.post('/api/user/confirm', { email: userEmail, password: userPassword }).then(result => {
      if(result) {
        $.ajax('/api/user/:id', {
          type: 'DELETE'
        }).then(function () {
          console.log('Deleted account', deleteUser);
          // Reload the page to get the updated list
          window.location.href = '/logout';
        });
      } else {
        $('#err-msg').empty('').text('Wrong credentials!');
      }
    });
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

