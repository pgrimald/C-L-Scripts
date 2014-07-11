<?php

// Connect to database
// Changed mysql_connect from memory.psych.purdue.edu to localhost. 7/2/2013 cjorr
mysql_connect("localhost", "root", "") or die(mysql_error());//connect
mysql_select_db("test") or die(mysql_error());//select db

//get data
 //sanitize data --NOTE: mysql_real_escape_string must be called *AFTER* a connection is established, else it won't work
$proc = $_POST['proc'];
//$recall = $_POST['recall'];

$assignment = $_POST['assignment'];
$workerId = $_POST['workerId'];
$ip = $_SERVER['REMOTE_ADDR']; 
$hitId = $_POST['hitId'];
$words = $_POST['words'];
$response = $_POST['response']; 
/*             assignment: assignId,
               workerId: wordId,
               proc: 'rating',
               hitId: userId,
               words: json.words[j],
               response: response[j]*/
//Construct the mySQL query
$query= "INSERT INTO `example_experiment` (`assignment`,`workerId`,`ip`,`proc`,`hitId`,`words`,`response`,`recall`) VALUES ('$assignment', '$workerId', '$ip', '$proc','$hitId','$words', '$response','')";


//run the query, plase the result into a variable
$result= mysql_query($query) or die(mysql_error()); //run script

//close the connection
mysql_close() or die(mysql_error());

?>