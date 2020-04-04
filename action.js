let dom = document.getElementById('jira-target');

document.getElementById('submit').addEventListener('click', ()=> {
  console.log('submit here')
});

chrome.tabs.getSelected(null, (tab)=> {
  let paths = getPathsFromUrl(tab.url);
  for (let path of paths){
    if (isJiraIssueKey(path)){
      dom.setAttribute('value', path);
      break;
    }
  }
})
