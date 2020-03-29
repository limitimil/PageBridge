let dom = document.getElementById('jira-target');
chrome.tabs.getSelected(null, (tab)=> {
  dom.setAttribute('value', tab.url);
  dom.setAttribute('value', getPathsFromUrl(tab.url));
})
