var getJenkinsAnchors = function() {
  let anchors = Array.from(document.getElementsByTagName("a"));
  anchors.filter(function(elem) {
    console.log(elem.href);
    let url = new URL(elem.href);
    return url.hostname === '192.168.96.25:8082';
  })
  return anchors;
}

var urlToDivs = (urlString) => {
  let url = new URL(urlString);
  let paths = url.pathname;
  console.log(paths)
  let dom = document.CreateElement();
  return dom;
}

function delay() {   
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve('我是傳下去的值');
    }, 1000);
  });
}