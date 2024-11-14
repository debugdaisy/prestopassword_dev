<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.0/jquery.min.js"></script>
        <script src="main.js"></script>
    </head>
    <body>
        <div class="result"></div>

        <form name="home_password_form" method="post" action="">
            <div class="home-password-hero-inner-container">
                <div class="home-password-field-container">
                    <div class="home-password-field">
                        <input type="text" name="home_password" id="home_password" class="home-password" value="" placeholder="Creating your password..." />
                    
                        <span id="home-password-copied" class="home-password-copied">
                            <i class="fa-solid fa-circle-check"></i> <span class="home-password-copied-text">Copied</span>
                        </span>
                    </div>
                
                    <div class="home-password-copy">
                        <i class="fa-regular fa-copy" title="Copy to Clipboard" onclick="copy_to_clipboard('home_password');"></i>
                    </div>
                </div>
            
                <div class="home-password-create">
                    <button type="button" name="create_password">
                        <i class="fa-solid fa-circle-plus"></i> Create another password
                    </button>
                </div>
            
                <div class="row">
                    <div class="col-md-6">
                        <ul>
                            <li>
                                <input type="radio" name="type" value="every" checked="checked" /> Every Character
                            </li>
                            <li>
                                <input type="radio" name="type" value="alpha" /> Alpha (A-Z)
                            </li>
                            <li>
                                <input type="radio" name="type" value="alphanumeric" /> Alphanumeric (A-Z & numbers)
                            </li>
                            <li>
                                <label>Length</label>
                            
                                <select name="length">
                                    <?php
                                    for ($i = 8; $i <= 50; $i++)
                                    {
                                        $selected = ($i == 12) ? 'selected="selected"' : '';
                                        ?>
                                        <option value="<?php echo $i; ?>" <?php echo $selected; ?>><?php echo $i; ?></option>
                                        <?php
                                    }
                                    ?>
                                </select>
                            </li>
                        
                            <?php
                            /*
                            <li>
                                How many?
                                <select name="quantity">
                                    <?php
                                    for ($i = 1; $i <= 100; $i++)
                                    {
                                        ?>
                                        <option value="<?php echo $i; ?>"><?php echo $i; ?></option>
                                        <?php
                                    }
                                    ?>
                                </select>
                            </li>
                            */
                            ?>
                        
                            <li>
                                <input type="checkbox" name="remember" id="remember" value="1" /> Remember my options
                            </li>
                        </ul>
                    </div>
                
                    <div class="col-md-6">
                        <ul>
                            <li>
                                <input type="checkbox" name="lowercase" value="1" /> Lowercase (a, b, c)
                            </li>
                            <li>
                                <input type="checkbox" name="uppercase" value="1" /> Uppercase (A, B, C)
                            </li>
                            <li>
                                <input type="checkbox" name="numbers" value="1" /> Numbers (1, 2, 3)
                            </li>
                            <li>
                                <input type="checkbox" name="symbols" value="1" /> Symbols (#, $, %)
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </form>
    </body>
</html>
