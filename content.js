    // This function inserts a tooltip next to a password field.
    function insertTooltipForPasswordField(passwordField) {
    console.log('Inserting tooltip for password field.');

    // Create the tooltip div.
    const tooltipDiv = document.createElement('div');
    tooltipDiv.style.position = 'absolute';
    tooltipDiv.style.background = '#611396';
    tooltipDiv.style.color = 'white';
    tooltipDiv.style.padding = '2px';
    tooltipDiv.style.borderRadius = '4px';
    tooltipDiv.style.zIndex = '1000000'; // Set a very high z-index value to ensure visibility.
    tooltipDiv.innerText = '';

    // Create the "OK" button inside the tooltip.
    const okButton = document.createElement('button');
    okButton.innerText = '123';
    okButton.style.marginLeft = '1px';
    okButton.onclick = function() {
        console.log('"OK" button clicked. Sending message to open 123PassPopup.');
        chrome.runtime.sendMessage({
            action: 'open123PassPopup',
            tabUrl: window.location.href,  // Get the current page's URL
        });
    };

    // Append the button to the tooltip.
    tooltipDiv.appendChild(okButton);

    // Add the tooltip to the body so we can measure its dimensions.
    document.body.appendChild(tooltipDiv);

    // Now, position the tooltip centered vertically relative to the password field.
    const rect = passwordField.getBoundingClientRect();
    tooltipDiv.style.top = (rect.top + window.scrollY + (rect.height / 2 -1) - (tooltipDiv.offsetHeight / 2)) + 'px';
    tooltipDiv.style.left = (rect.right - 100) + 'px'; // px distance from the password field.
}

    // Check for password fields in the DOM and insert tooltips.
    const passwordFields = document.querySelectorAll('input[type="password"]');
    console.log(`Found ${passwordFields.length} password fields.`);
    passwordFields.forEach(insertTooltipForPasswordField);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('Received message:', request);

    if (request.action === 'showTooltipForPasswordField') {
        console.log('Received message to show tooltip for password field.');
        // Find the password fields on the current page.
        const passwordFields = document.querySelectorAll('input[type="password"]');
        passwordFields.forEach(insertTooltipForPasswordField);

    } else if (request.action === 'fillCredentials') {
        const usernameFields = document.querySelectorAll('input[type="email"], input[type="text"]');
        const passwordFields = document.querySelectorAll('input[type="password"]');

        if (usernameFields.length) {
            usernameFields[0].value = request.username;
        }

        if (passwordFields.length) {
            passwordFields[0].value = request.password;
        }
    }
});


