function addInput(name, val, form) {
  var input = $("<input>").attr("type", "hidden")
              .attr("name", name)
              .attr("id", name)
              .val(val);
  $(form).append(input);
}

$(function(){
  if (location.href.match("wifi-auth.usm.cl")) {
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
  }
});