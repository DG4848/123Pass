// Importing or defining constants and utility functions for salt retrieval
const SALT_KEY = '123PassSalt';

function retrieveSalt(callback) {
    chrome.storage.local.get([SALT_KEY], function(result) {
        if (result[SALT_KEY]) {
            callback(result[SALT_KEY]);
        } else {
            console.log("No salt found in storage.");
            callback(null);
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Password visibility toggle
    const passwordInput = document.getElementById('EasyPass');
    const togglePasswordButton = document.getElementById('togglePasswordButton');

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
        let tabUrl;
        // Check if a tab URL was passed as a parameter
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('tabUrl')) {
            tabUrl = urlParams.get('tabUrl');
        } else {
            // If no tab URL parameter, fallback to using the active tab's URL
            tabUrl = tabs[0].url;
        }
        
        let url = new URL(tabUrl);
        let domain = url.hostname;

        // Display the domain in the 'domain' input field
        document.getElementById('domain').value = domain;
    });

    // Listener for password generation
    document.getElementById('generate-password').addEventListener('click', async function() {
        const easyPass = passwordInput.value;
        const useDomain = document.getElementById('use-domain').checked; // Corrected the checkbox's ID
        const desiredLength = Number(document.getElementById('password-length').value); // Corrected the input's ID

        // Retrieve salt from storage
        retrieveSalt(async function(salt) {
            if(!salt) {
                alert('Salt not found. Please configure setup options.');
                return;
            }

            let combinedString = easyPass;
            
            // If the user wants to use the domain in the password generation
            if (useDomain) {
                const domain = document.getElementById('domain').value;
                combinedString += domain;
            }

            combinedString += salt;

            // Hash the combined string
            // Assuming hashMasterPassphrase is imported or defined elsewhere in popup.js
            const hashed = await hashMasterPassphrase(combinedString);

            // Create strong password
            let strongPassword = hashed.substring(0, desiredLength - 1) + '&';

            // Display the password for the user to copy
            document.getElementById('GeneratedPasswordOutput').value = strongPassword;
        });
    });
});
