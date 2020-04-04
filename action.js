let dom = document.getElementById('jira-target');
chrome.tabs.getSelected(null, (tab)=> {
  let paths = getPathsFromUrl(tab.url);
  for (let path of paths){
    if (isJiraIssueKey(path)){
      dom.setAttribute('value', path);
      break;
    }
  }
})
