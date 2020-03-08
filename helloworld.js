(document.body || document.documentElement).addEventListener(
  "transitionend",
  async () => {
    let anchors = getJenkinsAnchors();
    anchors.forEach(elem => {
      elem.style.backgroundColor = "red";
    });
  }
);
