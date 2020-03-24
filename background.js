let getBuildResult= (url) => {
  return new Promise((resolve, reject) => {
    fetch(`${url}/api/json`).then((response) => {
      resolve({ status: "SUCCESS" });
    }).catch((error) => {
      resolve({ status: "FAILURE" });
    });
  });
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  let url = request.target;
    fetch(`${url}/api/json`).then((response) => {
      if (response.status === 200) {
        sendResponse({ status: response.json().result });
      }
      sendResponse({ status: "FAILURE" });
    }).catch((error) => {
      sendResponse({ status: "FAILURE" });
    });
  return true;
});
