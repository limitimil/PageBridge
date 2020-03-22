chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  let url = request.target;
  fetch(`${url}/api/json`).then(() => {
    sendResponse({ status: "SUCCESS" });
  }).catch((error) => {
    sendResponse({ status: "FAILURE" });
  });
});
