var getJenkinsAnchors = function() {
  let anchors = Array.from(document.getElementsByTagName("a"));
  anchors = anchors.filter(function(elem) {
    if (! elem.href ) {
      return false;
    }
    let url = new URL(elem.href);
    return url.origin === 'http://192.168.96.25:8082';
  })
  return anchors;
}

var urlToDivs = (urlString) => {
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

function delay() {   
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve('我是傳下去的值');
    }, 1000);
  });
}