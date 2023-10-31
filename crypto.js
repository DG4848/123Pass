// Prohibited symbols for passwords. Adjust this based on your specific requirements.
const prohibitedSymbols = ['+', '/'];

// Special characters for ensuring complexity in passwords.
const specialCharacters = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+', '[', ']', '{', '}', '|', ':', ';', '"', '<', '>', ',', '.', '?', '/', '`', '~'];

/**
 * Function to hash a given input string. Here, we use the Web Crypto API, which is available in modern browsers and Chrome extensions.
 * @param {string} inputString
 * @returns {Promise<string>} - A promise that resolves with a base64 encoded hash of the input string.
 */
async function hashInput(inputString) {
    const encoder = new TextEncoder();
    const data = encoder.encode(inputString);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer)); // Convert buffer to byte array
    const hashBase64 = btoa(String.fromCharCode(...hashArray)); // Convert byte array to base64 string
    return hashBase64;
}

/**
 * Given a hashed string (base64 encoded), this function ensures it meets password complexity requirements.
 * Specifically, it will:
 * 1. Replace prohibited characters.
 * 2. Ensure the string starts with a special character.
 * @param {string} hashedString
 * @returns {string}
 */
function ensurePasswordComplexity(hashedString) {
    // 1. Replace prohibited characters.
    let modifiedString = hashedString.split('').map(char => {
        if (prohibitedSymbols.includes(char)) {
            // Here we pick a deterministic replacement, by using the ASCII code of the character modulo the length of specialCharacters.
            return specialCharacters[char.charCodeAt(0) % specialCharacters.length];
        }
        return char;
    }).join('');

    // 2. Ensure the string starts with a special character.
    if (!specialCharacters.includes(modifiedString[0])) {
        // Use the ASCII code of the first character to deterministically pick a special character.
        modifiedString = specialCharacters[modifiedString.charCodeAt(0) % specialCharacters.length] + modifiedString.substring(1);
    }

    return modifiedString;
}

/**
 * This function hashes the input string and ensures the resulting hash meets password complexity requirements.
 * @param {string} inputString
 * @returns {Promise<string>}
 */
async function hashMasterPassphrase(inputString) {
    const hashed = await hashInput(inputString);
    return ensurePasswordComplexity(hashed);
}

export { hashMasterPassphrase };
