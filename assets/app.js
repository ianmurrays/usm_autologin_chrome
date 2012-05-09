function addInput(name, val, form) {
  var input = $("<input>").attr("type", "hidden")
              .attr("name", name)
              .attr("id", name)
              .val(val);
  $(form).append(input);
}

// -----------------------------------------------------------------------

function showMessage(aMessage, force) {
  // Skip these pages
  if (! force && (location.href.match("logout.html") || location.href.match("www.usm.cl"))) {
    return;
  }

  console.log("-- Showing message");

  $('body > *').fadeOut();

  var message = (aMessage || "Autologueándote") + ', espera... (<a href="#" class="cancel-autologin" style="color: #ccc">cancelar</a>)';

  $('<div>').addClass('supra-message')
            .css('text-align', 'center')
            .css('margin', '0 auto')
            .css('width', '100%')
            .css('padding-top', '100px')
            .css('font-size', '28px')
            .css('font-weight', 'bold')
            .css('display', 'none')
            .html(message)
            .prependTo('body');

  $('body .supra-message').fadeIn();

  // Bind to the click event on the cancelLink
  $('body .cancel-autologin').live('click', function(){
    // Revert everything
    $('body > *').fadeIn();
    $('body .supra-message').fadeOut();
  });
}

showMessage(); // Don't wait for the body to appear

// -----------------------------------------------------------------------
// Should we be redirecting if on usm_* ?
if (location.href.match("http://www.usm.cl")) {
  // Redirect to the original referer
  chrome.extension.sendRequest({requestStoreRedirect: true}, function(response) {
    chrome.extension.sendRequest({storeRedirect: null});


    if (response.url != null) {
      // Fix the url, just in case
      if (response.url.match(/^https?:\/\//)) {
        redirect_url = response.url;
      } else {
        redirect_url = "http://" + response.url;
      }

      showMessage("Redirigiéndote a " + redirect_url, true);

      location.href = redirect_url;
    }
  });
}

// -----------------------------------------------------------------------
// This only happens when body is loaded
$(function(){
  if (location.href.match("wifi-auth.usm.cl")) {
    // Store the redirection url
    var redirect_url = location.href.match(/redirect=([^&]+)/);
    if (redirect_url.length >= 2) {
      redirect_url = redirect_url[1];
    }

    chrome.extension.sendRequest({storeRedirect: redirect_url});

    // Login magic
    chrome.extension.sendRequest({credentials: "usm"}, function(response) {
      if (response.username && response.password) {
        console.log("-- Injecting custom form");
        var form = $('<form>').attr('id', 'custom_form')
                              .attr('method', 'post')
                              .attr('action', 'https://1.1.1.1/login.html');
        $('body').append(form);

        console.log("-- Setting credentials");
        addInput("username", response.username, "form#custom_form");
        addInput("password", response.password, "form#custom_form");

        console.log("-- Setting hacky vars so this works");
        addInput("buttonClicked", 4, "form#custom_form");
        addInput("redirect_url", "http://google.cl", "form#custom_form");
        addInput("err_flag", 0, "form#custom_form");
        addInput("info_flag", 0, "form#custom_form");
        addInput("info_msg", 0, "form#custom_form");

        console.log("-- Submitting");
        $('form#custom_form').submit();
      }
    });
  } else if (location.href.match("10.6.43.2")) {
    chrome.extension.sendRequest({credentials: "di"}, function(response) {
      if (response.username && response.password) {
        console.log("-- Setting credentials");
        $('input[name=auth_user]').val(response.username);
        $('input[name=auth_pass]').val(response.password);

        console.log("-- Injecting hacky stuff");
        addInput("accept", "Acceder", "form");

        console.log("-- Submitting");
        $('form').submit();
      }
    });
  }
});