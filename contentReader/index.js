class ChainDetector {
  constructor(){
    this.ruleFunctions = []
  }
  // TODO: add type hint
  // for the following functions
  // - push
  // - detectAndSendResponse
  // - ruleMatchInTitle
  push(method) {
    this.ruleFunctions = [
      ...this.ruleFunctions,
      method
    ];
  }
  detectAndSendResponse({ regex, sendResponse }){
    if(this.ruleFunctions.length === 0) {
      throw Error('please push before using detect');
    }
    for( const rf of this.ruleFunctions ) {
      const result = rf(regex, sendResponse);
      if(result) {
        return true;
      }
    }
    return false;
  }
}
function ruleMatchInTitle(regex, sendResponse) {
  const matchInTheTitle = document.title.match(regex);
  if(matchInTheTitle) {
    sendResponse({jiraId: matchInTheTitle[0] });
    return true;
  }
}
const chain = new ChainDetector();
chain.push(ruleMatchInTitle);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const regex = new RegExp(request.regex);
  // TODO: responsible chain
  // title
  return chain.detectAndSendResponse({ regex, sendResponse });
  // url
  // headers
  // anchors
});
