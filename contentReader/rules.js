// TODO: type hint for the response structure
function ruleMatchInAnchors(regex, sendResponse) {
  const anchors = document.getElementsByTagName('a');
  for( const dom of anchors ) {
    const result = dom.href.match(regex);
    if(result) {
      sendResponse({jiraId: matchInTheUrl[0] });
      return true;
    }
  }
}
function ruleMatchInHeaders(regex, sendResponse) {
  const header1 = document.getElementsByTagName('h1');
  const header2 = document.getElementsByTagName('h2');
  const header3 = document.getElementsByTagName('h3');
  for( const dom of header1 ) {
    const result = dom.innerText.match(regex);
    if(result) {
      sendResponse({jiraId: matchInTheUrl[0] });
      return true;
    }
  }
  for( const dom of header2 ) {
    const result = dom.innerText.match(regex);
    if(result) {
      sendResponse({jiraId: matchInTheUrl[0] });
      return true;
    }
  }
  for( const dom of header3 ) {
    const result = dom.innerText.match(regex);
    if(result) {
      sendResponse({jiraId: matchInTheUrl[0] });
      return true;
    }
  }
}
function ruleMatchInUrl(regex, sendResponse) {
  const matchInTheUrl = window.location.href.match(regex);
  if(matchInTheUrl) {
    sendResponse({jiraId: matchInTheUrl[0] });
    return true;
  }
}
function ruleMatchInTitle(regex, sendResponse) {
  const matchInTheTitle = document.title.match(regex);
  if(matchInTheTitle) {
    sendResponse({jiraId: matchInTheTitle[0] });
    return true;
  }
}
