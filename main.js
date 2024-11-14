// Listenser
document.addEventListener('DOMContentLoaded', () => {
    // Generate password
    const button_generate = document.querySelector('.button-create-password');
    
    if (button_generate)
    {
        button_generate.addEventListener('click', () => {request_password()});
    }
    
    // Copy to clipboard
    const button_copy_to_clipboard = document.querySelector('.button-copy-to-clipboard');
    
    if (button_copy_to_clipboard)
    {
        button_copy_to_clipboard.addEventListener('click', function() {copy_to_clipboard('password_result')});
    }
});

/**
 * Send a password request
 */
function request_password() 
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
        document.querySelector('.password-result').value = data;
    });
}

/**
 * Copy input value to clipboard
 */
function copy_to_clipboard(text_field_id)
{
    const input = document.getElementById(text_field_id);
    
    // Select the text field
    input.select();
    input.setSelectionRange(0, 99999);
    
    // Copy the text inside the text field
    navigator.clipboard.writeText(input.value);
    
    // Fade out
    // Show the element
    document.querySelector('.password-copied').style.display = 'block';
    
    // Delay and fade out
    setTimeout(function() {
        document.querySelector('.password-copied').style.opacity = 0;
        document.querySelector('.password-copied').style.transition = 'opacity 1s';
    }, 1250);
    
    // After the fade-out, hide the element
    setTimeout(function() {
        document.querySelector('.password-copied').style.display = 'none';
    }, 2250); // Total delay before hiding (1250ms + 1000ms for fade-out duration)
}
