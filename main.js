// Listen for password generate click
document.addEventListener('DOMContentLoaded', () => {
    const generateButton = document.querySelector('button[name="create_password"]');
    
    if (generateButton) {
        generateButton.addEventListener('click', () => {
            request_password();
        });
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
    
    console.log(field_lowercase);
    
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
        if (!response.ok) 
        {
            throw new Error('Network response was not ok: ' + response.statusText);
        }

        return response.text();
    })
    .then(data => {
        document.querySelector('.result').innerText = data;
    })
    .catch(error => {});
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
    jQuery('.home-password-copied').show();
    jQuery('.home-password-copied').delay(1250).fadeOut();
}
