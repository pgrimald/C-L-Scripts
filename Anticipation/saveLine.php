<?php
// Connect to database
// Changed mysql_connect from memory.psych.purdue.edu to localhost. 7/2/2013 cjorr
mysql_connect("localhost", "learnuser", ".Echo-360!") or die(mysql_error());//connect
mysql_select_db("memorylab") or die(mysql_error());//select db

// workerId: workId,
// condition: 'condition',
// cycle: cycle,
// proc: procedure,
// cue: cue,
// target: target,
// response: resp,
// rt: rt


//get data
$workid = $_POST['workerId'];
$cond = $_POST['condition'];
$cycle = $_POST['cycle'];
$trial = $_POST['trial'];
$proc = $_POST['proc'];
$cue = $_POST['cue'];
$target = $_POST['target'];
$rt = $_POST['rt'];
$resp = $_POST['response'];
//$resp = mysql_real_escape_string($_POST['response'];

//Construct the mySQL query
$query= "INSERT INTO `AnticipationDataHTML` (`ID`,`ECondition`,`Cycle`,`Trial`,`EProcedure`,`Cue`,`Target`,`Response`,`RT`) VALUES ('$workid','$cond','$cycle','$trial', '$proc','$cue','$target','$resp','$rt')";


//run the query, plase the result into a variable
$result= mysql_query($query) or die(mysql_error()); //run script

//close the connection
mysql_close() or die(mysql_error());

?>