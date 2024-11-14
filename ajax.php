<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.0/jquery.min.js"></script>
    </head>
    <body>
        <script>
            $(document).ready(function(){
                var length = Math.floor(Math.random() * (16 - 8 + 1)) + 8;
                var exclude_lowercase = true;
                var exclude_uppercase = false;
                var exclude_numbers = Math.random() < 0.5;
                var exclude_special = Math.random() < 0.5;
                
                $.post('password.php', {
                    length: length,
                    exclude_lowercase: exclude_lowercase,
                    exclude_uppercase: exclude_uppercase,
                    exclude_numbers: exclude_numbers,
                    exclude_special: exclude_special
                },
                function(response) {
                    $('.result').text(response);
                });
            });
        </script>
        
        <div class="result"></div>
    </body>
</html>
