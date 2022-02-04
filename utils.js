var serviceConfigurations = {
    jenkinsRoot:  'http://192.168.96.25:8082',
    jenkinsPortalMasterRoot: 'http://192.168.107.135:9002'
};

var getJenkinsAnchors = function() {
  let anchors = Array.from(document.getElementsByTagName("a"));
  anchors = anchors.filter(function(elem) {
    if (! elem.href ) {
      return false;
    }
    let url = new URL(elem.href);
    return url.origin === serviceConfigurations.jenkinsRoot;
  })
  return anchors;
}

var urlToDivs = async (urlString) => {
  let url = new URL(urlString);
  let paths = url.pathname;
  let origin = url.origin;
  let dom = document.createElement('div');
  dom.innerHTML = origin;
  dom.setAttribute('target', origin);
  let children = pathToDivs(paths);
  children.forEach(elem => {
    dom.appendChild(elem);
  });
  let buildStatus = await getBuildResult(urlString);
  dom.appendChild(getResultIcon(buildStatus));
  return dom;
}

var pathToDivs = (pathString) => {
  let contents = pathString.split('/');
  contents = contents.filter(elem=>elem);
  let result = [];
  for (let i =0; i< contents.length; i++) {
    let dom = document.createElement('button');
    dom.addEventListener('click', function(elem) {
      let goToUrl = this.parentNode.getAttribute('target') + '/' + this.getAttribute('target');
      window.open(goToUrl);
    })
    dom.innerHTML = '/' + contents[i];
    dom.setAttribute('target',  contents.slice(0,i+1).join('/'));
    result.push(dom);
  }
  return result;
}

var getBuildResult= (href) => {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({target: href}, function(response){
      resolve(response.status);
    });
  });
}

var getResultIcon= (status) => {
  let div = document.createElement('img');
  let imgSrc;
  switch(status){
    case 'FAILURE':
      imgSrc = chrome.extension.getURL("images/red.png");
      break;
    case 'SUCCESS':
      imgSrc = chrome.extension.getURL("images/blue.png");
      break;
    case 'ABORTED':
      imgSrc = chrome.extension.getURL("images/red.png");
      break;
    default:
      imgSrc = chrome.extension.getURL("images/blue_anime.gif");
      break;
  }
  div.src = imgSrc;
  return div;
}

var getPathsFromUrl= (urlString) => {
  let url = new URL(urlString);
  let paths = url.pathname;
  let contents = paths.split('/');
  contents = contents.filter(elem=>elem);
  return contents;
}

var isJiraIssueKey= (s) => {
  return s.match(/.*CTIS-.*/);
}

var appendLineUpMessage = (issueKey, url, tag) => {
  return axios({
    method: 'put',
    baseURL: serviceConfigurations.jenkinsPortalMasterRoot,
    url: '/append/pr_line_up_message',
    'Content-Type': 'application/json',
    data: { issue_key: issueKey, reference_url: url}
  });
}

var blackHoleEvent = (issueKey, url, tag) => {
  return axios({
    method: 'put',
    baseURL: serviceConfigurations.jenkinsPortalMasterRoot,
    url: 'pass_bug_to_black_hole',
    'Content-Type': 'application/json',
    data: { issue_key: issueKey, reference_url: url}
  });
}

var appendCustomizedJiraComment = (issueKey, url, tag) => {
  return axios({
    method: 'put',
    baseURL: serviceConfigurations.jenkinsPortalMasterRoot,
    url: `/append_comment/${tag}`,
    'Content-Type': 'application/json',
    data: { issue_key: issueKey, reference_url: url}
  });
}

// TODO: review the parameter
var getJiraIssueBrief = (issueKey) => {
  return axios({
    method: 'get',
    baseURL: serviceConfigurations.jenkinsPortalMasterRoot,
    url: `/brief/${issueKey}`,
    'Content-Type': 'application/json',
  });
}

function delay() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve('我是傳下去的值');
    }, 2000);
  });
}
