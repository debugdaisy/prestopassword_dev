// On page load functions
request_password();

/**
 * Send a password request
 */
function request_password(copy_password_to_clipboard = false)
{
    const length = document.querySelector('select[name="length"]')?.value || 12;
    const field_lowercase = document.querySelector('input[name="lowercase"]')?.checked || false;
    const field_uppercase = document.querySelector('input[name="uppercase"]')?.checked || false;
    const field_numbers = document.querySelector('input[name="numbers"]')?.checked || false;
    const field_symbols = document.querySelector('input[name="symbols"]')?.checked || false;
    
    // Prepare the parameters for the POST request
    const params = {
        request_password: 1,
        length: length,
        exclude_lowercase: !field_lowercase,
        exclude_uppercase: !field_uppercase,
        exclude_numbers: !field_numbers,
        exclude_special: !field_symbols
    };
    
    // Make the POST request
    fetch('password.php', {
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
 * Set user options in a cookie
 */
/*function options_set()
{
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
        request_options_set: 1,
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
    fetch('password.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams(params).toString(),
    });
}*/

/**
 * Get user options from a cookie
 */
/*function options_get() {
    const name = 'user_options';
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    
    if (parts.length === 2) {
        const encoded_options = parts.pop().split(';').shift();
        
        if (encoded_options) {
            try {
                const user_options = decodeURIComponent(encoded_options);
                const options = JSON.parse(user_options);
                
                // Set the "length" select field
                if (options.length) {
                    const lengthField = document.querySelector('select[name="length"]');
                    if (lengthField) {
                        lengthField.value = options.length;
                    }
                }
                
                // Set the "type" radio field
                if (options.type) {
                    const typeField = document.querySelector(`input[name="type"][value="${options.type}"]`);
                    if (typeField) {
                        typeField.checked = true;
                    }
                }
                
                // Set the "remember" checkbox
                if (options.remember) {
                    const rememberField = document.querySelector('input[name="remember"]');
                    if (rememberField) {
                        rememberField.checked = options.remember === "true"; // Ensure boolean conversion
                    }
                }
                
                // Set the checkboxes for character options
                const fields = ["lowercase", "uppercase", "numbers", "symbols"];
                fields.forEach((field) => {
                    const optionKey = `exclude_${field}`;
                    if (options[optionKey] !== undefined) {
                        const checkbox = document.querySelector(`input[name="${field}"]`);
                        if (checkbox) {
                            checkbox.checked = options[optionKey] === "false"; // Reverse logic
                        }
                    }
                });
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        }
    }
}*/









/*
// Function to update the user_options cookie
function update_user_options_cookie() {
    const remember_field = document.querySelector('input[name="remember"]');
    
    if (remember_field && remember_field.checked) {
        const options = {
            type: document.querySelector('input[name="type"]:checked')?.value || 'every',
            length: document.querySelector('select[name="length"]')?.value || '12',
            remember: remember_field.checked,
            lowercase: document.querySelector('input[name="lowercase"]')?.checked || false,
            uppercase: document.querySelector('input[name="uppercase"]')?.checked || false,
            numbers: document.querySelector('input[name="numbers"]')?.checked || false,
            symbols: document.querySelector('input[name="symbols"]')?.checked || false,
        };
        
        // Set the cookie with JSON data
        document.cookie = `user_options=${encodeURIComponent(JSON.stringify(options))}; path=/; max-age=${365 * 24 * 60 * 60}`;
    } else {
        // If "remember" is unchecked, delete the cookie
        document.cookie = "user_options=; path=/; max-age=0";
    }
}

// Function to set default values from the user_options cookie
function set_default_values_from_cookie() {
    const cookie_value = document.cookie
    .split('; ')
    .find((row) => row.startsWith('user_options='))
    ?.split('=')[1];
    
    if (cookie_value) {
        try {
            const options = JSON.parse(decodeURIComponent(cookie_value));
            
            // Set the 'type' radio button
            if (options.type) {
                const type_field = document.querySelector(`input[name="type"][value="${options.type}"]`);
                if (type_field) {
                    type_field.checked = true;
                }
            }
            
            // Set the 'length' select field
            if (options.length) {
                const length_field = document.querySelector('select[name="length"]');
                if (length_field) {
                    length_field.value = options.length;
                }
            }
            
            // Set the checkbox values
            const fields = ['lowercase', 'uppercase', 'numbers', 'symbols'];
            fields.forEach((field) => {
                const checkbox = document.querySelector(`input[name="${field}"]`);
                if (checkbox) {
                    checkbox.checked = options[field] || false;
                }
            });
            
            // Set the remember checkbox
            const remember_field = document.querySelector('input[name="remember"]');
            if (remember_field) {
                remember_field.checked = options.remember || false;
            }
            
            // Update the checkboxes based on the selected type
            update_checkboxes_based_on_type(options.type);
        } catch (error) {
            console.error('Error parsing user_options cookie:', error);
        }
    }
}

// Function to update the checkboxes based on the selected type (only for the type radio click)
function update_checkboxes_based_on_type(type) {
    const lowercase_checkbox = document.querySelector('input[name="lowercase"]');
    const uppercase_checkbox = document.querySelector('input[name="uppercase"]');
    const numbers_checkbox = document.querySelector('input[name="numbers"]');
    const symbols_checkbox = document.querySelector('input[name="symbols"]');
    
    // Reset all checkboxes first
    lowercase_checkbox.checked = false;
    uppercase_checkbox.checked = false;
    numbers_checkbox.checked = false;
    symbols_checkbox.checked = false;
    
    // Set checkboxes based on the type
    if (type === 'every') {
        lowercase_checkbox.checked = true;
        uppercase_checkbox.checked = true;
        numbers_checkbox.checked = true;
        symbols_checkbox.checked = true;
    } else if (type === 'alpha') {
        lowercase_checkbox.checked = true;
        uppercase_checkbox.checked = true;
    } else if (type === 'alphanumeric') {
        lowercase_checkbox.checked = true;
        uppercase_checkbox.checked = true;
        numbers_checkbox.checked = true;
    }
}

// Function to handle radio button click events
function handle_radio_button_click() {
    const selected_type = document.querySelector('input[name="type"]:checked')?.value;
    
    // When a new type is selected, we need to update the checkboxes based on the selected type
    update_checkboxes_based_on_type(selected_type);
    
    // Update the cookie whenever a radio button is clicked
    update_user_options_cookie();
}

// Function to handle checkbox click events
function handle_checkbox_click() {
    const lowercase_checkbox = document.querySelector('input[name="lowercase"]');
    const uppercase_checkbox = document.querySelector('input[name="uppercase"]');
    const numbers_checkbox = document.querySelector('input[name="numbers"]');
    const symbols_checkbox = document.querySelector('input[name="symbols"]');
    
    // Always update the cookie when a checkbox is clicked
    update_user_options_cookie();
}

// Add event listeners to update the cookie when fields change
function add_form_event_listeners() {
    const form_fields = document.querySelectorAll(
        'input[name="type"], select[name="length"], input[name="lowercase"], input[name="uppercase"], input[name="numbers"], input[name="symbols"], input[name="remember"]'
    );
    
    form_fields.forEach((field) => {
        field.addEventListener('change', update_user_options_cookie);
    });
    
    // Add specific event listeners for 'type' radio buttons to trigger checkbox updates
    const type_radios = document.querySelectorAll('input[name="type"]');
    type_radios.forEach((radio) => {
        radio.addEventListener('click', handle_radio_button_click);
    });
    
    // Add event listener for checkbox clicks to handle checkbox changes
    const checkboxes = document.querySelectorAll('input[name="lowercase"], input[name="uppercase"], input[name="numbers"], input[name="symbols"]');
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', handle_checkbox_click);
    });
}

// Initialize the form on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    set_default_values_from_cookie();
    add_form_event_listeners();
});*/










// Function to update the user_options cookie
function update_user_options_cookie() {
    const remember_field = document.querySelector('input[name="remember"]');
    
    // Check if "remember" is checked, to determine if we should store the cookie
    const custom_field = document.querySelector('input[name="custom"]');
    
    const options = {
        type: document.querySelector('input[name="type"]:checked')?.value || 'every',
        length: document.querySelector('select[name="length"]')?.value || '12',
        remember: remember_field?.checked || false,
        lowercase: document.querySelector('input[name="lowercase"]')?.checked || false,
        uppercase: document.querySelector('input[name="uppercase"]')?.checked || false,
        numbers: document.querySelector('input[name="numbers"]')?.checked || false,
        symbols: document.querySelector('input[name="symbols"]')?.checked || false,
        custom: custom_field?.value || 'false',
    };
    
    // If custom is true, do not include the type field in the cookie and ensure it's unset
    if (options.custom === 'true') {
        options.type = ''; // Unset type if custom is true
    }
    
    // If "remember" is checked, store the cookie
    if (options.remember) {
        document.cookie = `user_options=${encodeURIComponent(JSON.stringify(options))}; path=/; max-age=${365 * 24 * 60 * 60}`;
    } else {
        // If "remember" is unchecked, delete the cookie
        document.cookie = "user_options=; path=/; max-age=0";
    }
}

// Function to set default values from the user_options cookie
function set_default_values_from_cookie() {
    const cookie_value = document.cookie
    .split('; ')
    .find((row) => row.startsWith('user_options='))
    ?.split('=')[1];
    
    if (cookie_value) {
        try {
            const options = JSON.parse(decodeURIComponent(cookie_value));
            
            // Set the 'type' radio button based on cookie, unless 'custom' is true
            if (options.custom !== 'true' && options.type) {
                const type_field = document.querySelector(`input[name="type"][value="${options.type}"]`);
                if (type_field) {
                    type_field.checked = true;
                }
            }
            
            // Set the 'length' select field
            const length_field = document.querySelector('select[name="length"]');
            if (length_field) {
                length_field.value = options.length || '12';
            }
            
            // Set the checkbox values
            const fields = ['lowercase', 'uppercase', 'numbers', 'symbols'];
            fields.forEach((field) => {
                const checkbox = document.querySelector(`input[name="${field}"]`);
                if (checkbox) {
                    checkbox.checked = options[field] || false;
                }
            });
            
            // Set the remember checkbox
            const remember_field = document.querySelector('input[name="remember"]');
            if (remember_field) {
                remember_field.checked = options.remember || false;
            }
            
            // Set the hidden custom field value based on cookie
            const custom_field = document.querySelector('input[name="custom"]');
            if (custom_field) {
                custom_field.value = options.custom || 'false';
            }
            
            // Update the checkboxes based on the selected type if custom is not set
            if (options.custom !== 'true') {
                update_checkboxes_based_on_type(options.type);
            }
            
            // Uncheck the type radio buttons if custom is true
            if (options.custom === 'true') {
                uncheck_type_radios();
            }
            
        } catch (error) {
            console.error('Error parsing user_options cookie:', error);
        }
    }
}

// Function to update the checkboxes based on the selected type (only for the type radio click)
function update_checkboxes_based_on_type(type) {
    const lowercase_checkbox = document.querySelector('input[name="lowercase"]');
    const uppercase_checkbox = document.querySelector('input[name="uppercase"]');
    const numbers_checkbox = document.querySelector('input[name="numbers"]');
    const symbols_checkbox = document.querySelector('input[name="symbols"]');
    
    // Reset all checkboxes first
    lowercase_checkbox.checked = false;
    uppercase_checkbox.checked = false;
    numbers_checkbox.checked = false;
    symbols_checkbox.checked = false;
    
    // Set checkboxes based on the type
    if (type === 'every') {
        lowercase_checkbox.checked = true;
        uppercase_checkbox.checked = true;
        numbers_checkbox.checked = true;
        symbols_checkbox.checked = true;
    } else if (type === 'alpha') {
        lowercase_checkbox.checked = true;
        uppercase_checkbox.checked = true;
    } else if (type === 'alphanumeric') {
        lowercase_checkbox.checked = true;
        uppercase_checkbox.checked = true;
        numbers_checkbox.checked = true;
    }
}

// Function to uncheck all type radio buttons
function uncheck_type_radios() {
    const type_radios = document.querySelectorAll('input[name="type"]');
    type_radios.forEach((radio) => {
        radio.checked = false;
    });
}

// Function to handle radio button click events
function handle_radio_button_click() {
    const selected_type = document.querySelector('input[name="type"]:checked')?.value;
    
    // When a new type is selected, we need to update the checkboxes based on the selected type
    update_checkboxes_based_on_type(selected_type);
    
    // Set the custom field to 'false', as the user selected a type
    const custom_field = document.querySelector('input[name="custom"]');
    if (custom_field) {
        custom_field.value = 'false';
    }
    
    // Update the cookie whenever a radio button is clicked
    update_user_options_cookie();
}

// Function to handle checkbox click events
function handle_checkbox_click() {
    const custom_field = document.querySelector('input[name="custom"]');
    if (custom_field) {
        custom_field.value = 'true'; // Set custom to 'true' if the user customizes any checkbox
    }
    
    // Uncheck all type radios since the user is customizing checkboxes
    const type_radios = document.querySelectorAll('input[name="type"]');
    type_radios.forEach((radio) => {
        radio.checked = false;
    });
    
    // Update the cookie whenever a checkbox is clicked
    update_user_options_cookie();
}

// Add event listeners to update the cookie when fields change
function add_form_event_listeners() {
    const form_fields = document.querySelectorAll(
        'input[name="type"], select[name="length"], input[name="lowercase"], input[name="uppercase"], input[name="numbers"], input[name="symbols"], input[name="remember"]'
    );
    
    form_fields.forEach((field) => {
        field.addEventListener('change', update_user_options_cookie);
    });
    
    // Add specific event listeners for 'type' radio buttons to trigger checkbox updates
    const type_radios = document.querySelectorAll('input[name="type"]');
    type_radios.forEach((radio) => {
        radio.addEventListener('click', handle_radio_button_click);
    });
    
    // Add event listener for checkbox clicks to handle checkbox changes
    const checkboxes = document.querySelectorAll('input[name="lowercase"], input[name="uppercase"], input[name="numbers"], input[name="symbols"]');
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', handle_checkbox_click);
    });
}

// Initialize the form on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    set_default_values_from_cookie();
    add_form_event_listeners();
});












// DOM loaded
document.addEventListener('DOMContentLoaded', () => {
    //options_get();
    
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
            //options_set();
        });
    }
});
