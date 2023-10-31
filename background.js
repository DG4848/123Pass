const SALT_KEY = '123PassSalt';

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

let currentSalt = null;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log("Received message:", request);
  console.log("Received action type:", request.action);

    switch(request.action) {
      default:
        console.log("Unknown action type received:", request.action);
        break;
       
        case 'openPopup':
           console.log("Received openPopup message");
            if (sender.tab && sender.tab.id) {
                chrome.tabs.remove(sender.tab.id, function() {
                    if (chrome.runtime.lastError) {
                        console.error(chrome.runtime.lastError);
                    } else {
                        console.log("Setup tab closed successfully.");
                    }
                });
            } else {
                console.error("Sender tab ID not available.");
            }
            break;

        case 'open123PassPopup':
            chrome.windows.create({
                url: chrome.runtime.getURL("popup.html?tabUrl=" + encodeURIComponent(request.tabUrl) + "&tabId=" + sender.tab.id),
                type: "popup",
                width: 820,
                height: 120
            });
            break;
            
        case 'SET_SALT':
            currentSalt = request.salt;
            console.log("SET_SALT recieved. New currentSalt:", currentSalt);
            sendResponse({ success: true });
            break;

        case 'GET_SALT':
            if (currentSalt) {
              console.log("Returning in-memory salt:", currentSalt);
              sendResponse({ salt: currentSalt });
            } else {
                // If the salt is not in memory, get it from storage
                chrome.storage.local.get([SALT_KEY], function(result) {
                    sendResponse({ salt: result[SALT_KEY] || null });
                });
                // Return true to indicate that we will respond asynchronously
                return true;
            }
            break;


    }
});
console.log("currentSalt:", currentSalt);
