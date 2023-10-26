// Using SubtleCrypto for hashing
const encoder = new TextEncoder();

function hashMasterPassphrase(passphrase) {
    const data = encoder.encode(passphrase);
    return window.crypto.subtle.digest('SHA-256', data)
        .then(hash => {
            return Array.from(new Uint8Array(hash))
                .map(b => b.toString(16).padStart(2, '0'))
                .join('');
        });
}

        chrome.storage.local.get("testKey", function(result) {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError);
            } else {
                console.log("Retrieved data:", result.testKey);
            }
        })