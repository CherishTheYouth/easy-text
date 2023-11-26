
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log('request', request, sender)
  document.execCommand("insertHTML", false, request);
});

export {}
