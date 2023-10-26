const SALT_KEY = '123PassSalt';
const USER_PATH_KEY = '123PassPath';

function storeToStorage(key, value) {
    return new Promise((resolve, reject) => {
        chrome.storage.local.set({ [key]: value }, () => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                console.log(`${key} stored successfully!`);
                resolve();
            }
        });
    });
}

function retrieveFromStorage(key) {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get([key], (result) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else if (result[key] === undefined) {
                reject(new Error(`${key} not found in storage.`));
            } else {
                resolve(result[key]);
            }
        });
    });
}

function removeFromStorage(key) {
    return new Promise((resolve, reject) => {
        chrome.storage.local.remove([key], () => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                console.log(`${key} removed from storage.`);
                resolve();
            }
        });
    });
}

export { storeToStorage, retrieveFromStorage, removeFromStorage, SALT_KEY, USER_PATH_KEY };
