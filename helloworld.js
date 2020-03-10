(document.body || document.documentElement).addEventListener(
  "transitionend",
  async () => {
    await delay();
    let anchors = getJenkinsAnchors();
    anchors.forEach(elem => {
      elem.style.backgroundColor = "red";
    });
  }
);
