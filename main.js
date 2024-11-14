// Listenser
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
});

/**
 * Send a password request
 */
function request_password(copy_password_to_clipboard = false)
{
    const length = document.querySelector('select[name="length"]').value;
    const field_lowercase = document.querySelector('input[name="lowercase"]').checked;
    const field_uppercase = document.querySelector('input[name="uppercase"]').checked;
    const field_numbers = document.querySelector('input[name="numbers"]').checked;
    const field_symbols = document.querySelector('input[name="symbols"]').checked;
    
    // Prepare the parameters for the POST request
    const params = {
        length: length,
        exclude_lowercase: !field_lowercase,
        exclude_uppercase: !field_uppercase,
        exclude_numbers: !field_numbers,
        exclude_special: !field_symbols
    };
    
    // Make the POST request
    fetch('presto-password.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
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
