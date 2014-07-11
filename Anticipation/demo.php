
<html>
<head>
        <meta name="viewport" content="width=device-width, initial-scale=0.6"/>
        <title>Ratings</title>
		<link rel="stylesheet" type="text/css" href="css/main.css" media="screen" title="no title"/>
        <script type="text/javascript" src="js/main.js"></script>
        <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
</head>
<body>
<div class="progressBar" id="bar">
<span id="barSpan"></span>
</div>
<div class="card" id="card">
    <div class="title" id="title">
    Demographics
    </div>
    <div class="bodyTextHolder">
        <div class="bodyText" id="bodyText">
            <table class="texttable" id="container" style="margin-left: auto; margin-right: auto;">            
                <tr>
                    <td style="font-size:120%;">
                        <h2>Language:</h2>
                        <div style="text-align: left;">
                            <input type="radio" name="language" value="english">English is my first language
                            </br>
                            <input type="radio" name="language" value="other">English is NOT my first language
                        <div>
                    </td>
                </tr>
                        
                <tr>
                    <td style= font-size:120%;>                     
                        <h2>Gender:</h2>
                        <input type="text" name="gender" id="gender"> 
                        </br><br>For example: Male, Female, etc.
                    </td>
                </tr>                       

                <tr>
                    <td style= font-size:120%;>
                        <h2>Age:<br> <input type="text" name="age" maxLength="2" size="5" id="age"></h2>
                
                    </td>
                </tr>
                
                <tr>
                    <td>
                        <div id="myform_errorloc" class="error_strings" style="visibility:visible;">
                            
                        </div>  
                    </td>
                </tr>
            
            
                <tr>
                </tr>
            </table>
        </div>
    </div>
    
</div>


<script>
</script>
</body>
</html>