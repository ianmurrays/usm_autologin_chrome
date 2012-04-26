$(function(){
  // Store changes to these fields
  $('input#usm_email').live('keyup', function(){
    localStorage['usm_email'] = $(this).val();

  });

  $('input#usm_password').live('keyup', function(){
    localStorage['usm_password'] = $(this).val();
  });

  $('input#di_username').live('keyup', function(){
    localStorage['di_username'] = $(this).val();
  });

  $('input#di_password').live('keyup', function(){
    localStorage['di_password'] = $(this).val();
  });

  // Load data from localStorage
  $('input#usm_email').val(localStorage['usm_email']);
  $('input#usm_password').val(localStorage['usm_password']);
  $('input#di_username').val(localStorage['di_username']);
  $('input#di_password').val(localStorage['di_password']);
});