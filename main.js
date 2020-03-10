(document.body || document.documentElement).addEventListener(
  "transitionend",
  async () => {
    await delay();
    let anchors = getJenkinsAnchors();
    anchors.forEach(elem => {
      let div = urlToDivs(elem.href);
      elem.parentNode.replaceChild(div, elem);
    });
  }
);
