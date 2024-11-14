// Listensers
document.addEventListener('DOMContentLoaded', () => {
    // Generate password
    const button_generate = document.querySelector('.button-create-password');
    
    if (button_generate)
    {
        button_generate.addEventListener('click', () => {
            request_password(true);
        });
    }
    
    // Copy to clipboard
    const button_copy_to_clipboard = document.querySelector('.button-copy-to-clipboard');
    
    if (button_copy_to_clipboard)
    {
        button_copy_to_clipboard.addEventListener('click', function() {
            copy_to_clipboard('.password-result');
        });
    }
    
    // Set user options
    const button_set_options = document.querySelector('.button-set-options');
    
    if (button_set_options)
    {
        button_set_options.addEventListener('click', function() {
            options_set();
        });
    }
});

// Set the password on page load
request_password();

/**
 * Send a password request
 */
function request_password(copy_password_to_clipboard = false)
{
    const request_password = 1;
    const length = document.querySelector('select[name="length"]')?.value || 12;
    const field_lowercase = document.querySelector('input[name="lowercase"]')?.checked || false;
    const field_uppercase = document.querySelector('input[name="uppercase"]')?.checked || false;
    const field_numbers = document.querySelector('input[name="numbers"]')?.checked || false;
    const field_symbols = document.querySelector('input[name="symbols"]')?.checked || false;
    
    // Prepare the parameters for the POST request
    const params = {
        request_password,
        length: length,
        exclude_lowercase: !field_lowercase,
        exclude_uppercase: !field_uppercase,
        exclude_numbers: !field_numbers,
        exclude_special: !field_symbols
    };
    
    // Make the POST request
    fetch('presto-password.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams(params).toString(),
    })
    .then(response => {
        return response.text();
    })
    .then(data => {
        // Set the password value
        document.querySelector('.password-result').value = data;
        
        // Copy the password to the clipboard
        if (copy_password_to_clipboard)
        {
            copy_to_clipboard('.password-result');
        }
    });
}

/**
 * Copy input value to clipboard
 */
function copy_to_clipboard(identifier)
{
    const input = document.querySelector(identifier);
    
    // Ensure the input is selected
    input.select();
    input.setSelectionRange(0, 99999); // For mobile devices
    
    // Copy the text inside the input field
    navigator.clipboard.writeText(input.value);
    
    // Show the element and reset opacity
    const copiedMessage = document.querySelector('.password-copied');
    copiedMessage.style.display = 'block';
    copiedMessage.style.opacity = 1;
    
    // Apply fade out with a delay
    setTimeout(function () {
        copiedMessage.style.transition = 'opacity 1s';
        copiedMessage.style.opacity = 0;
    }, 1250);
    
    // Hide the element after fade-out
    setTimeout(function () {
        copiedMessage.style.display = 'none';
        copiedMessage.style.transition = '';
    }, 2250);
}

/**
 * Set options in a cookie
 */
function options_set()
{
    const request_options_set = 1;
    const length = document.querySelector('select[name="length"]')?.value || 12;
    const field_lowercase = document.querySelector('input[name="lowercase"]')?.checked || false;
    const field_uppercase = document.querySelector('input[name="uppercase"]')?.checked || false;
    const field_numbers = document.querySelector('input[name="numbers"]')?.checked || false;
    const field_symbols = document.querySelector('input[name="symbols"]')?.checked || false;
    const remember = document.querySelector('input[name="remember"]')?.checked || false;
    const type = document.querySelector('input[name="type"]')?.checked || false;
    const alpha = document.querySelector('input[name="alpha"]')?.checked || false;
    const alphanumeric = document.querySelector('input[name="alphanumeric"]')?.checked || false;
    const every = document.querySelector('input[name="every"]')?.checked || false;
    
    // Prepare the parameters for the POST request
    const params = {
        request_options_set,
        length: length,
        exclude_lowercase: !field_lowercase,
        exclude_uppercase: !field_uppercase,
        exclude_numbers: !field_numbers,
        exclude_special: !field_symbols,
        remember: remember,
        type: type,
        alpha: alpha,
        alphanumeric: alphanumeric,
        every: every
    };
    
    // Make the POST request
    fetch('presto-password.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams(params).toString(),
    })
    .then(response =>
        response.text()
    )
    .then(data => {
        console.log(data);
    });
}

/**
 * Get the user options
 */
function options_get()
{
    const request_options_get = 1;
    
    // Prepare the parameters for the POST request
    const params = {
        request_options_get
    };
    
    // Make the POST request
    fetch('presto-password.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams(params).toString(),
    })
    .then(response =>
        response.text()
    )
    .then(data => {
        console.log(data);
    });
}
