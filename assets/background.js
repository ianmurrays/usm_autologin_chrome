// --------------------
// Listen to requests from the client-side, and reply with credentials
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  if (request.credentials == "usm") {
    sendResponse({
      username: localStorage['usm_email'],
      password: localStorage['usm_password']
    });
  } else if (request.credentials == "di") {
    sendResponse({
      username: localStorage['di_username'],
      password: localStorage['di_password']
    });
  }
});