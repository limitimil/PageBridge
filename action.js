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
const blackHoleEventAppender = document.getElementById('black-hole-event');
let btn = document.createElement('button');
btn.innerHTML = 'black hole it';
btn.addEventListener('click', function() {
  const submitter =  this;
  const issueKey = appender.querySelector('#jira-target').value;
  submitter.disabled = true;
  blackHoleEvent(issueKey, currentUrl, 'helloworld')
  .then(()=>{submitter.innerText = 'success'})
  .catch(()=>{submitter.innerText = 'fail'})
});
blackHoleEventAppender.appendChild(btn);

const appendLineUpMessageAppender = document.getElementById('append-line-up-message');
btn = document.createElement('button');
btn.innerHTML = 'append line up message';
btn.addEventListener('click', function() {
  const submitter =  this;
  const issueKey = appender.querySelector('#jira-target').value;
  submitter.disabled = true;
  appendLineUpMessage(issueKey, currentUrl, 'helloworld')
  .then(()=>{submitter.innerText = 'success'})
  .catch(()=>{submitter.innerText = 'fail'})
});
appendLineUpMessageAppender.appendChild(btn);

chrome.tabs.getSelected(null, (tab)=> {
  currentUrl = tab.url;

  chrome.tabs.sendMessage(tab.id, {regex: "PROP-\\d+"}, function(response) {
    if(response.jiraId){
      dom.setAttribute('value', response.jiraId);
    }
  });

  let paths = getPathsFromUrl(tab.url);
  for (let path of paths){
    if (isJiraIssueKey(path)){
      dom.setAttribute('value', path);
      break;
    }
  }
  dom.focus();
  dom.select();
})
