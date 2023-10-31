import { retrieveFromStorage, SALT_KEY, USER_PATH_KEY } from './storage.js';
import { hashMasterPassphrase } from './crypto.js';
let originalTabId; // The ID of the tab that opened the popup

function retrieveSalt(callback) {
    // Ask the background script for the current salt.
    chrome.runtime.sendMessage({ action: "GET_SALT" }, function(response) {
        if (response && response.salt) {
            console.log("Using in-memory salt:", response.salt);
            callback(response.salt);
        } else {
            console.log("No in-memory salt found. Retrieving from storage.");
            chrome.storage.local.get([SALT_KEY], function(result) {
                if (result[SALT_KEY]) {
                    callback(result[SALT_KEY]);
                } else {
                    console.log("No salt found in storage.");
                    callback(null);
                }
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('EasyPass');
    const togglePasswordButton = document.getElementById('togglePasswordButton');
    const generatePassword = document.getElementById('generate-password');

    togglePasswordButton.addEventListener('click', function() {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            togglePasswordButton.textContent = ':)'; // Change to an icon indicating password is visible
        } else {
            passwordInput.type = 'password';
            togglePasswordButton.textContent = ';)'; // Change back to the original icon
        }
    });

    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      const urlParams = new URLSearchParams(window.location.search);
  
      // Always get the tabId from the parameter, regardless of whether 'tabUrl' exists.
      if (urlParams.has('tabId')) {
          originalTabId = parseInt(urlParams.get('tabId'));
      } else {
          originalTabId = tabs[0].id;
      }
  
      let tabUrl = urlParams.has('tabUrl') ? urlParams.get('tabUrl') : tabs[0].url;
  
      let url = new URL(tabUrl);
      let domain = url.hostname;
  
      document.getElementById('domain').value = domain;
  });
  

    // Event listener for pressing Enter key
    passwordInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent default form submission
            generatePassword.click(); // Simulate a button click
        }
    });

    // Listener for password generation
    generatePassword.addEventListener('click', async function() {
        const easyPass = passwordInput.value;
        const useDomain = document.getElementById('use-domain').checked;
        const desiredLength = Number(document.getElementById('password-length').value);

        retrieveSalt(async function(salt) {
            if(!salt) {
                alert('Salt not found. Please configure setup options.');
                return;
            }

            let combinedString = easyPass;

            if (useDomain) {
                const domain = document.getElementById('domain').value;
                combinedString += domain;
            }

            combinedString += salt;

            const hashed = await hashMasterPassphrase(combinedString);

            let strongPassword = hashed.substring(0, desiredLength);

            document.getElementById('fillCredentials').textContent = strongPassword;

        });
    });

// Event listener for filling credentials
document.getElementById('fillCredentials').addEventListener('click', function() {
  console.log('Button clicked!');
  const generatedPassword = this.textContent;


  // Copy to clipboard
  navigator.clipboard.writeText(generatedPassword).then(function() {
      console.log('Password copied to clipboard.');
  }, function(err) {
      console.error('Could not copy password: ', err);
  });

    chrome.storage.local.get('savedUsername', function(data) {
    const username = data.savedUsername || 'DefaultUsername'; // Use a default username if not found.

    console.log('Sending message to content script:', { action: 'fillCredentials', username: username, password: generatedPassword });


    // Send a message to the content script to fill in the fields
    console.log('Sending message to tab ID:', originalTabId);
    chrome.tabs.sendMessage(originalTabId, { action: 'fillCredentials', username: username, password: generatedPassword });
    });
  
  });
});
