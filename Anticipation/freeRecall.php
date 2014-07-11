<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
	<head>
		<title>FR</title>
		
		<link type="text/css" rel="stylesheet" href="./css/main.css"/>
		<link type="text/css" rel="stylesheet" href="../css/tooltipster.css"/>
					
			
	

	</head>
	
	<body id="b1">
		
		<div class=progressLine>
			<div class="progressCircle tooltip" title="consent form">1</div>
			<div class="progressCircle tooltip" title="demographics">2</div>
			<div class="progressCircle tooltip" title="study period">3</div>
			<div class="progressCircle tooltip" title="recall period">4</div>
			<div class="progressCircle tooltip" title="debriefing">5</div>
			
			<span class="stretch"></span>
		</div>	
		
		<!-- MAIN CARD IN CENTER	 -->
		<div class= "main" id="m1">
			<h1>
			<div class="textRecall"></div>
			</h1>
			<br><br><br>
			<textarea class="responseinput" id="input1"></textarea>

			
		</div>
		<!-- END MAIN CARD IN CENTER	 -->
		
		<div id='timerContainer'>Time Remaining<br>
			<!-- set title to be the amount of time in seconds -->
			<div id='timerWrap'><div id='timer' title='60'></div></div> 
		</div>
			
			
	<!--<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>-->
	<script src="http://code.jquery.com/jquery-1.10.2.js"></script>
	<script type="text/javascript" src="js/script.js"></script>
	<script type="text/javascript" src="js/jquery.tooltipster.min.js"></script>
	
<script>
//warns the user that navigating away from this page is bad
window.onbeforeunload = function() { return "If you reload or exit this page, the experiment will be terminated and the data will be lost."; };



// document.addEventListener("keydown", function(e) {
//   if (e.keyCode == 13) {
//     toggleFullScreen();
//   }
// }, false);



var resp, tIP, tTrial, gStartTime, tRT;
//on document open
$(document).ready(function(){
	
	 $('.tooltip').tooltipster();
	
	//record start time
	gStartTime = Date.now();
	
	//Start Timer at x seconds, be sure to also change title of timer div in HTML
	timer(60);
	
	// Make the body go full screen.
	toggleFullScreen();
	
	
	//prevents ajaxCache
	$.ajaxSetup({ cache: false });	
	
	//focus on input box
	$("#input1").focus();
	
	//start trial counter	
	tTrial = 0; 
	
	//set listener for input box
	$("#input1").keydown(function (e) {
		
		//record response
		resp=document.getElementById("input1").value;
		
		//if enter is pushed
		if (e.keyCode == 13) {
	        
			//resp=document.getElementById("input1").value;
			
			//check length of response is longer than three chars
			if (resp.length>=3){
				//record RT
				tRT = (Date.now()-gStartTime);
				
				//send data to php script
				sendData();
				
				//empty response box
				$("#input1").val('');
				
				//append response in output field
				resp = resp + "<br>";
				$( ".recalledwords" ).append( resp );
							
				//scroll to bottom of 
				//$(".myDiv").scrollTop($(".myDiv")[0].scrollHeight);
				
				//increment trial counter
				tTrial++;
				
				//prevent carriage return in field
				return false; //note: this needs to occur LAST
				
				
			}
			else{
				//prevent carriage return
				return false;
			}
		}
		//if space is pushed
		else if (e.keyCode == 32){
			return false;
		}
		//if the number of items in response is greater than 15 (sets cap on response length)
		else if (resp.length>15){
			return false;
		}
	});
	
});


function sendData(){
		
	$.ajax({        
	       type: "POST",
	       url: "saveFR.php",
		   //url: "/lc/test2.lc",
	       data: {
		       resp: resp,
		       proc: 'recall',
		       trial: tTrial,
		       rt: tRT
	        },
	       success: function(result) {
	            //alert("Data: " + result);      		   
	       }
	 });	
	 
}

var currentTime,timerElem;
function timer(pTimeOnCard){
		
	//get currenttime
	//currentTime=document.getElementById('timer').innerHTML;
	timerElem=document.getElementById('timer');
	currentTime=timerElem.title;
	
	//recall self after 1000 ms
	if (currentTime == 0){
		alert("Recall Period Finished"); 
	}
	else{
		setTimeout(function(){
			timer(60)
		},1000);	
	}
	
	
	//subtract time
	currentTime=(currentTime-1);
	document.getElementById('timer').title=currentTime;
	
		
	//calculate % 
	currentTime=((currentTime/pTimeOnCard)*100);
	
	//currenttime=(currenttime/document.getElementById('timerWrap').style.width);
	currentTime=currentTime+"%";
	document.getElementById('timer').style.width=currentTime;
}




function toggleFullScreen() {
  if (!document.fullscreenElement &&    // alternative standard method
      !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}



</script>	

	</body>


</html>

