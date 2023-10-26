// This function inserts a tooltip next to a password field.
function insertTooltipForPasswordField(passwordField) {
    console.log('Inserting tooltip for password field.');

    // Create the tooltip div.
    const tooltipDiv = document.createElement('div');
    tooltipDiv.style.position = 'absolute';
    tooltipDiv.style.background = '#333';
    tooltipDiv.style.color = 'white';
    tooltipDiv.style.padding = '5px';
    tooltipDiv.style.borderRadius = '5px';
    tooltipDiv.style.zIndex = '1000000'; // Set a very high z-index value to ensure visibility.
    tooltipDiv.innerText = 'Use 123Pass';

    // Create the "OK" button inside the tooltip.
    const okButton = document.createElement('button');
    okButton.innerText = 'OK';
    okButton.style.marginLeft = '10px';
    okButton.onclick = function() {
        console.log('"OK" button clicked. Sending message to open 123PassPopup.');
        chrome.runtime.sendMessage({
            action: 'open123PassPopup',
            tabUrl: window.location.href  // Get the current page's URL
        });
    };

    // Append the button to the tooltip.
    tooltipDiv.appendChild(okButton);

    // Add the tooltip to the body so we can measure its dimensions.
    document.body.appendChild(tooltipDiv);

    // Now, position the tooltip centered vertically relative to the password field.
    const rect = passwordField.getBoundingClientRect();
    tooltipDiv.style.top = (rect.top + window.scrollY + (rect.height / 2) - (tooltipDiv.offsetHeight / 2)) + 'px';
    tooltipDiv.style.left = (rect.right + 10) + 'px'; // 10px distance from the password field.
}

// Check for password fields in the DOM and insert tooltips.
const passwordFields = document.querySelectorAll('input[type="password"]');
console.log(`Found ${passwordFields.length} password fields.`);
passwordFields.forEach(insertTooltipForPasswordField);

// Listen for the message from the background script.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'showTooltipForPasswordField') {
        console.log('Received message to show tooltip for password field.');
        // Find the password fields on the current page.
        const passwordFields = document.querySelectorAll('input[type="password"]');
        passwordFields.forEach(insertTooltipForPasswordField);
    }
});
