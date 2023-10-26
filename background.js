console.log("background.js script started");

chrome.runtime.onInstalled.addListener(() => {
    chrome.action.onClicked.addListener((tab) => {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: showPasswordFields,
      });
    });
});

function showPasswordFields() {
    const passwordFields = document.querySelectorAll('input[type="password"]');
    passwordFields.forEach((field) => {
      field.style.border = '2px solid red';
    });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if(request.action == 'openPopup') {
      console.log("Received openPopup message");

      // Use the sender's tab ID to close the tab.
      if (sender.tab && sender.tab.id) {
          chrome.tabs.remove(sender.tab.id, function() {
              // Check for any errors when removing the tab.
              if (chrome.runtime.lastError) {
                  console.error(chrome.runtime.lastError);
              } else {
                  console.log("Setup tab closed successfully.");
              }
          });
      } else {
          console.error("Sender tab ID not available.");
      }
  }
});
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'open123PassPopup') {
      chrome.windows.create({
        url: chrome.runtime.getURL("popup.html?tabUrl=" + encodeURIComponent(request.tabUrl)),
          type: "popup",
          width: 900,
          height: 150
      });
  }
});
