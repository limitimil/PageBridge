let once = 0;
async function build_up_jenkins_portal() {
  await delay();
  let anchors = getJenkinsAnchors();
  if (!once) {
    await anchors.forEach(async (elem) => {
      let div = await urlToDivs(elem.href);
      elem.parentNode.replaceChild(div, elem);
    });
    once += 1;
  }
  else {
    document.documentElement.removeEventListener('transitionend', build_up_jenkins_portal);
  }
}

(document.documentElement).addEventListener(
  "transitionend",
  build_up_jenkins_portal
);