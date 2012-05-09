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
  } else if (typeof request.storeRedirect != "undefined") {
    // Store a redirection url on localStorage
    localStorage['redirect_url'] = request.storeRedirect;
  } else if (typeof request.requestStoreRedirect != "undefined") {
    sendResponse({
      url: localStorage['redirect_url']
    });
  }
});