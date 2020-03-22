let getBuildResult= (url) => {
  return new Promise((resolve, reject) => {
    fetch(`${url}/api/json`).then((response) => {
      resolve({ status: "SUCCESS" });
    }).catch((error) => {
      resolve({ status: "FAILURE" });
    });
  });
};

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  let url = request.target;
  const result = await getBuildResult(url);
  console.log(result);
  await sendResponse(result);
  return true;
});
