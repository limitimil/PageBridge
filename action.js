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

const supported_transition_names = ['verification']
const transitionAppender = document.getElementById('transition');
supported_transition_names.forEach((transitionName) => {
  let btn = document.createElement('button');
  btn.innerHTML = `transit to <strong>${transitionName}</strong>`;
  btn.addEventListener('click', function() {
    const submitter =  this;
    const issueKey = appender.querySelector('#jira-target').value;
    submitter.disabled = true;
    transitTo(issueKey, currentUrl, transitionName)
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
      break;
    }
  }
  dom.focus();
  dom.select();
})
