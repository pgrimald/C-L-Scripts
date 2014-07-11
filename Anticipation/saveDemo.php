<?php

// Connect to database
// Changed mysql_connect from memory.psych.purdue.edu to localhost. 7/2/2013 cjorr
mysql_connect("localhost", "root", "") or die(mysql_error());//connect
mysql_select_db("test") or die(mysql_error());//select db

//get data
$gender = mysql_real_escape_string($_POST['gender']);

$age = $_POST['age']; //sanitize data --NOTE: mysql_real_escape_string must be called *AFTER* a connection is established, else it won't work
$proc = $_POST['proc'];
$lang = $_POST['lang'];
//$recall = $_POST['recall'];
	
$workerId = $_POST['workerId'];
$ip = $_SERVER['REMOTE_ADDR']; 
/*             assignment: assignId,
               workerId: wordId,
               proc: 'rating',
               hitId: userId,
               words: json.words[j],
               response: response[j]*/
//Construct the mySQL query
$query= "INSERT INTO `demo` (`workerId`,`ip`,`proc`,`lang`,`age`,`gender`) VALUES ('$workerId', '$ip', '$proc','$lang','$age','$gender')";


//run the query, plase the result into a variable
$result= mysql_query($query) or die(mysql_error()); //run script

//close the connection
mysql_close() or die(mysql_error());

?>