let dom = document.getElementById('jira-target');
let currentUrl = '';
var supported_tags = ['PR', 'CI', 'Reference', 'Demo']

const appender = document.getElementById('customized-appender');
supported_tags.forEach((tag) => {
  let btn = document.createElement('button');
  btn.innerHTML = `update <strong>${tag}</strong> to jira card`;
  btn.addEventListener('click', function() {
    const submitter =  this;
    const issueKey = appender.querySelector('#jira-target').value;
    submitter.disabled = true;
    appendCustomizedJiraComment(issueKey, currentUrl, tag)
    .then(()=>{submitter.innerText = 'success'})
    .catch(()=>{submitter.innerText = 'fail'})
  });
  appender.appendChild(btn);
})

chrome.tabs.getSelected(null, (tab)=> {
  currentUrl = tab.url;
  let paths = getPathsFromUrl(tab.url);
  for (let path of paths){
    if (isJiraIssueKey(path)){
      dom.setAttribute('value', path);
      dom.focus();
      dom.select();
      break;
    }
  }
})
