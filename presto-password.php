<?php
// Turn on all error reporting
/*error_reporting(E_ALL);
ini_set('display_errors', 1);*/

// POST request
if (!empty($_POST))
{
    // Instantiate class
    $presto_password = new presto_password();
    
    // Request password
    if (!empty($_POST['request_password']))
    {
        // $_POST vars
        $length = isset($_POST['length']) ? (int)$_POST['length'] : 12;
        $exclude_lowercase = isset($_POST['exclude_lowercase']) ? filter_var($_POST['exclude_lowercase'], FILTER_VALIDATE_BOOLEAN) : false;
        $exclude_uppercase = isset($_POST['exclude_uppercase']) ? filter_var($_POST['exclude_uppercase'], FILTER_VALIDATE_BOOLEAN) : false;
        $exclude_numbers = isset($_POST['exclude_numbers']) ? filter_var($_POST['exclude_numbers'], FILTER_VALIDATE_BOOLEAN) : false;
        $exclude_special = isset($_POST['exclude_special']) ? filter_var($_POST['exclude_special'], FILTER_VALIDATE_BOOLEAN) : false;
        
        // Create the password
        echo $presto_password->generate($length, $exclude_lowercase, $exclude_uppercase, $exclude_numbers, $exclude_special);
    }
    elseif (!empty($_POST['request_options_set']))
    {
        // Set cookie value
        $params = [
            'length' => $_POST['length'],
            'exclude_lowercase' => $_POST['exclude_lowercase'],
            'exclude_uppercase' => $_POST['exclude_uppercase'],
            'exclude_numbers' => $_POST['exclude_numbers'],
            'exclude_special' => $_POST['exclude_special'],
            'remember' => $_POST['remember'],
            'type' => $_POST['type'],
            'alpha' => $_POST['alpha'],
            'alphanumeric' => $_POST['alphanumeric'],
            'every' => $_POST['every']
        ];
        
        $presto_password->options_set($params);
    }
    elseif (!empty($_POST['request_options_get']))
    {
        // Get cookie value
        if (isset($_COOKIE['user_options']))
        {
            $presto_password->options_get();
        }
    }
}

/**
 * Main class for managing password creation
 */
class presto_password
{
    /**
     * Create the password
     */
    function generate($length, $exclude_lowercase = false, $exclude_uppercase = false, $exclude_numbers = false, $exclude_special = false): string
    {
        $letters = 'abcdefghijklmnopqrstuvwxyz';
        $numbers = '0123456789';
        $special = "!@#$%^&*()_+-=[]{};':|,.~";
        $password = '';
        $character_set = '';
        
        // Add lowercase if not excluded
        if (!$exclude_lowercase)
        {
            $character_set .= $letters;
        }
        
        // Add uppercase if not excluded
        if (!$exclude_uppercase)
        {
            $character_set .= strtoupper($letters);
        }
        
        // Add numbers if not excluded
        if (!$exclude_numbers)
        {
            $character_set .= $numbers;
        }
        
        // Add special characters if not excluded
        if (!$exclude_special)
        {
            $character_set .= $special;
        }
        
        // If the character set is empty, use a default set
        if ($character_set === '')
        {
            $character_set .= $letters;
            $character_set .= strtoupper($letters);
            $character_set .= $numbers;
        }
        
        // Generate the password
        for ($i = 0; $i < $length; $i++)
        {
            $password .= $character_set[random_int(0, strlen($character_set) - 1)];
        }
        
        return $password;
    }
    
    /**
     * Set the cookie to store the user options if they want them remembered
     */
    function options_set($params): void
    {
        // Encode the parameters into a JSON string
        $cookie_value = json_encode($params);
        
        // Set the cookie
        setcookie('user_options', $cookie_value, time() + (365 * 24 * 60 * 60), "/");
    }
    
    /**
     * Get the cookie value for the user options
     */
    function options_get(): void
    {
        // Retrieve and decode the cookie value
        $cookie_value = $_COOKIE['user_options'];
        
        // Decode the JSON string into a PHP array
        $user_options = json_decode($cookie_value, true);
        
        echo '<pre>' . print_r($user_options, true) . '</pre>';
    }
}
