<?php
// Turn on all error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// POST request
if (!empty($_POST))
{
    // Instantiate class
    $presto_password = new presto_password();
    
    // $_POST vars
    $length = isset($_POST['length']) ? (int)$_POST['length'] : 12;
    $exclude_lowercase = isset($_POST['exclude_lowercase']) ? filter_var($_POST['exclude_lowercase'], FILTER_VALIDATE_BOOLEAN) : false;
    $exclude_uppercase = isset($_POST['exclude_uppercase']) ? filter_var($_POST['exclude_uppercase'], FILTER_VALIDATE_BOOLEAN) : false;
    $exclude_numbers = isset($_POST['exclude_numbers']) ? filter_var($_POST['exclude_numbers'], FILTER_VALIDATE_BOOLEAN) : false;
    $exclude_special = isset($_POST['exclude_special']) ? filter_var($_POST['exclude_special'], FILTER_VALIDATE_BOOLEAN) : false;
    
    // Create the password
    $password = $presto_password->generate($length, $exclude_lowercase, $exclude_uppercase, $exclude_numbers, $exclude_special);
    
    // Send the created password
    echo $password;
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
     * Set a cookie
     */
    function cookie_set(string $name, string $value, int $days = null): void
    {
        $expires = 0; // Default: Session cookie (expires when the browser closes)
        
        if ($days !== null)
        {
            $expires = time() + ($days * 24 * 60 * 60); // Calculate expiration time in seconds
        }
        
        setcookie($name, $value, $expires, "/");
    }
    
    /**
     * Get a cookie value
     */
    function cookie_get(string $name): ?string
    {
        return $_COOKIE[$name] ?? null;
    }
}
