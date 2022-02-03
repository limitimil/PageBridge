chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const regex = new RegExp(request.regex);
  // TODO: responsible chain
  // title
  const matchInTheTitle = document.title.match(regex);
  if(matchInTheTitle) {
    sendResponse({jiraId: matchInTheTitle[0] });
    return true;
  }
  // url
  // headers
  // anchors
});

