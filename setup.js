import { storeToStorage, SALT_KEY, USER_PATH_KEY } from './storage.js';
import { showModal } from './alertModal.js';

document.getElementById('apply-settings').addEventListener('click', async function() {
    const passphraseInput = document.getElementById('master-passphrase');
    const passphrase = passphraseInput.value;

    if (passphrase.length < 8) {
        showModal("The passphrase must be at least 8 characters long.");
        return;
    }

    try {
        await storeToStorage(SALT_KEY, passphrase);
        await storeToStorage(USER_PATH_KEY, document.getElementById('pathway').value);
        console.log("Settings applied successfully!");
    } catch (error) {
        console.error(error);
        showModal("An error occurred while applying the settings.");
    }

    window.history.back();
});
