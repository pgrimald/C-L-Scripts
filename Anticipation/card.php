<!DOCTYPE html>
<?php
    $json = file_get_contents('words.json');
    $hitId = isset($_GET['hitId']) ? $_GET['hitId'] : '';
    $assignmentId = isset($_GET['assignmentId']) ? $_GET['assignmentId'] : '';
    $workerId = isset($_GET['workerId']) ? $_GET['workerId'] : '';

?>
<html>
<head>
        <meta name="viewport" content="width=device-width, initial-scale=0.6"/>
        <title>Anticipation</title>
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
    Word Association Anticipation Experiment
    </div>
    <div class="bodyTextHolder">
        <div class="bodyText" id="bodyText">
        <p>In the following experiment, you will see pairs of words and then recall one them from memory. The experiment will last approximately 10 minutes. <br><br>
        <p><b>Mechanical Turk Users:</b> You will be issued your payment code at the end of the experiment.<br><br>
        Please read over the consent form below before starting the Experiment. It contains important information regarding your rights as a research participant. By clicking "Start", you acknowledge that you agree to the conditions of the consent form.<br><br>
        [Link to Consent Form]</br>
        </div>
    </div>
    <div class="nextButton" id="next"> 
        <div class="nextButtonText" id="nextCont">
        Continue
        </div>
    </div>
</div>
<div id="progressContainer">
    <div class="circle" id="circle1S"><div class="circleText" id="circleText1S">Study</div></div>
    <div class="connection"></div>
    <div class="circle" id="circle1T"><div class="circleText" id="circleText1T">Test</div></div>
    <div class="connection"></div>
    <div class="circle" id="circle2S"><div class="circleText" id="circleText2S">Study</div></div>
    <div class="connection"></div>
    <div class="circle" id="circle2T"><div class="circleText" id="circleText2T">Test</div></div>
    <div class="connection"></div>
    <div class="circle" id="circle3S"><div class="circleText" id="circleText3S">Study</div></div>
    <div class="connection"></div>
    <div class="circle" id="circle3T"><div class="circleText" id="circleText3T">Test</div></div>
</div>








<script>
//Grabbed Variables + Initialization
var json = <?php echo $json; ?>;
var slide;
var assignId = "<?php echo $assignmentId; ?>"; 
var workId = "<?php echo $workerId; ?>";       
var userId = "<?php echo $hitId; ?>";
var val;
var lang;
init();
</script>
</body>
</html>