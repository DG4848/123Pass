import { storeToStorage, retrieveFromStorage, removeFromStorage, SALT_KEY, USER_PATH_KEY } from './storage.js';
import { showModal } from './alertModal.js';
import { hashMasterPassphrase } from './crypto.js';

document.getElementById('apply-settings').addEventListener('click', async function() {
    const passphraseInput = document.getElementById('master-passphrase');
    const passphrase = passphraseInput.value;
    const username = document.getElementById('Username').value;

    chrome.storage.local.set({'savedUsername': username}, function() {
        console.log('Username saved');
    });

    if (passphrase.length < 8) {
        showModal("The passphrase must be at least 8 characters long.");
        return;
    }

    // Hash the passphrase
    const hashedPassphrase = await hashMasterPassphrase(passphrase);

    // This is the in-memory salt
    const currentSalt = hashedPassphrase;

    // Check if "Allow storage" checkbox is checked
    const saveToFileChecked = document.getElementById('save-to-file').checked;

    // Send the salt to the background script/service worker for storage in memory
    chrome.runtime.sendMessage({ action: 'SET_SALT', salt: currentSalt });
    console.log("Sent SET_SALT message to background script.");

    if (saveToFileChecked) {
        try {
            await storeToStorage(SALT_KEY, hashedPassphrase);
            const storedSalt = await retrieveFromStorage(SALT_KEY);
            await storeToStorage(USER_PATH_KEY, document.getElementById('pathway').value);

        } catch (error) {
            console.error(error);
            showModal("An error occurred while applying the settings.");
        }
    } else {
        try {
            await removeFromStorage(SALT_KEY); // Remove salt from storage if not saving locally
          
        } catch (error) {
            console.error(error);
            showModal("An error occurred while removing the salt from local storage.");
        }
    }

    // Erase the MasterPassphrase from memory
    passphraseInput.value = '';
    
    window.history.back();
});

document.querySelector('.toggle-password').addEventListener('click', function() {
    const passphraseInput = document.getElementById('master-passphrase');
    if (passphraseInput.type === "password") {
        passphraseInput.type = "text";
        this.innerHTML = '&#x1F5E3;';  // An eye-closed icon or similar representation
    } else {
        passphraseInput.type = "password";
        this.innerHTML = '&#x1F441;';  // The eye-open icon
    }
});
