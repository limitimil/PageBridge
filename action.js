let dom = document.getElementById('jira-target');
let current_url = '';
var supported_tags = ['PR', 'CI', 'Reference', 'Demo']
document.getElementById('submit').addEventListener('click', function(){
  const submitter = this;
  submitter.disabled = true;
  axios({
    method: 'put',
    baseURL: serviceConfigurations.jenkinsPortalMasterRoot,
    url: '/append_comment/ci_reference',
    'Content-Type': 'application/json',
    data: { issue_key: dom.value, reference_url: current_url}
  }).then(()=> { 
    submitter.innerText = 'success';
  }).catch(()=>{
    submitter.innerText = 'fail';
  });
});

const appender = document.getElementById('customized-appender');
supported_tags.forEach((tag) => {
  let btn = document.createElement('button');
  btn.innerHTML = `update <strong>${tag}</strong> to jira card`;
  btn.addEventListener('click', function() {
    const submitter =  this;
    const issueKey = appender.querySelector('#jira-target').value;
    submitter.disabled = true;
    appendCustomizedJiraComment(issueKey, current_url, tag)
    .then(()=>{submitter.innerText = 'success'})
    .catch(()=>{submitter.innerText = 'fail'})
  });
  appender.appendChild(btn);
})

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
