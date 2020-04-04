let dom = document.getElementById('jira-target');
let current_url = '';
document.getElementById('submit').addEventListener('click', ()=> {
  console.log('submit here')
  axios({
    method: 'put',
    baseURL: serviceConfigurations.jenkinsPortalMasterRoot,
    url: '/append_comment/ci_reference',
    'Content-Type': 'application/json',
    data: { issue_key: dom.value, reference_url: current_url}
  })
});

chrome.tabs.getSelected(null, (tab)=> {
  current_url = tab.url;
  let paths = getPathsFromUrl(tab.url);
  for (let path of paths){
    if (isJiraIssueKey(path)){
      dom.setAttribute('value', path);
      break;
    }
  }
})
