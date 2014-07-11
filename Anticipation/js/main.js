//THINGS TO DO
//build checker function for demographics card
//function for assigning subject to condition
//timer is a little off for study trials
//fix progress circles for anticipation condition
//better mTurk Code Generation
//css needs work-- need to set minimums on card size and account for different screen resolutions. Gets wonky at lower resolutions
//post experiment follow up

//global variables
var response = [];
var recall;
var gender;
var age;
var bigList = [];
var gCycle = 0;
var gCondition = 'anticipation';
var tRT; 

var studyTime = 1000; 
var testTime = 1000;
var isiTime = 500;


//Initial Functions
function init(){
    //CHECKS IF USER INFORMATION IS PRESENT
    if(workId == '')
    {
        alert("You currently do not have any valid Worker ID attached to your profile, please go back through mechanical turk and accept this HIT before you do this test.");
        $( ".nextButtonText" ).css("color", "#aaa");
        $( ".nextButton" ).css("boxShadow", "1px 1px 3px rgba(0,0,0,0.3)");
        $( ".nextButton" ).hover(
                                function(){
                                    var $this = $(this);
                                    $this.css("cursor", "not-allowed");
                                });
    }
    else //IF PRESENT, PERFORMS NORMAL INITIALIZATION
    {
        $( "#next" ).click(function() {
            demographicsProc();
        });
        $( ".circleText").toggle();

        //box-shadow: 1px 1px 3px rgba(0,0,0,0.3);
    }
}

function assignCondition(){
	//determine condition


	//after determining condition, create progress circles
	if (gCondition = "anticipation"){
		$( "#progressContainer" ).html(function(){
			var containerHTML = "<div class='circle' id='circle1S'><div class='circleText' id='circleText1S'>Study</div></div>";
			containerHTML = containerHTML + "<div class='connection'></div>";
			containerHTML = containerHTML + "<div class='circle' id='circle1T'><div class='circleText' id='circleText1T'>Test</div></div>";
			containerHTML = containerHTML + "<div class='connection'></div>";
			containerHTML = containerHTML + "<div class='circle' id='circle2T'><div class='circleText' id='circleText2T'>Test</div></div>";
			containerHTML = containerHTML + "<div class='connection'></div>";
			containerHTML = containerHTML + "<div class='circle' id='circle3T'><div class='circleText' id='circleText3T'>Test</div></div>";
			return containerHTML;
		});

	}else{
		$( "#progressContainer" ).html(function(){
	        var containerHTML = "<div class='circle' id='circle1S'><div class='circleText' id='circleText1S'>Study</div></div>";
	        containerHTML = containerHTML + "<div class='connection'></div>";
		containerHTML = containerHTML + "<div class='circle' id='circle1T'><div class='circleText' id='circleText1T'>Test</div></div>";
	        containerHTML = containerHTML + "<div class='connection'></div>";
	        containerHTML = containerHTML + "<div class='circle' id='circle2S'><div class='circleText' id='circleText2S'>Study</div></div>";
	        containerHTML = containerHTML + "<div class='connection'></div>";
	        containerHTML = containerHTML + "<div class='circle' id='circle2T'><div class='circleText' id='circleText2T'>Test</div></div>";
	        containerHTML = containerHTML + "<div class='connection'></div>";
	        containerHTML = containerHTML + "<div class='circle' id='circle3S'><div class='circleText' id='circleText3S'>Study</div></div>";
	        containerHTML = containerHTML + "<div class='connection'></div>";
	        containerHTML = containerHTML + "<div class='circle' id='circle3T'><div class='circleText' id='circleText3T'>Test</div></div>";
		return containerHTML;
		});
	}
}

function demographicsProc(){
        barTimer(0.2, 100,1)
        $( ".bodyText" ).empty();
        $( ".title" ).empty();
        setTimeout(function(){

                $("#bodyText").load("demo.php #bodyText",function(){}) 
                $("#title").load("demo.php #title",function(){})  
                $("#title").css("fontSize", 1+"em");
                $("#bodyText").css("fontSize", 1+"em");
        },200);
	
	//set up button
	$("#next").unbind(); //note: necessary to unbind previous handlers before assigning a new one
        $( "#next" ).click(function() {
		//need to include a checker function here first
	  instructionsProc();
        });
}

function instructionsProc(){
	//record responses from demographics    
        lang = $('input:radio[name=language]:checked').val();
        gender = $('#gender').val();
        age = $('#age').val();
	
	//present instructions
        $( ".bodyText" ).empty();
        $( ".title" ).empty();
        setTimeout(function(){
            $("#bodyText").load("description.php #bodyText",function(){}) 
            $(".bodyText").css("fontSize", 1.4+"em");
            $(".bodyText").css("fontWeight", 400);
        },1000);
	
	//set up button
       	$("#next").unbind(); 
	$( "#next" ).click(function() {
          $("#next").toggle();//toggle next button
	  studyProc();
        });
	
}
    
function finishProc(){
        recall = bigList;
        $( ".bodyText" ).empty();
        $( ".title" ).empty();
        setTimeout(function(){
            if(userId == '')
            {
                userId = "INVALID USER"
            }
            $(".bodyText" ).html("Congratulations! You are finished. Please enter the code below into mechanical turk. <br><br>" + workId);
            $(".bodyText").css("fontSize", 3+"em");
            $("#next").toggle();
        },1000);
        console.log(response, recall);
        sendData();
}

//sets up the study procedure
function studyProc(){
	//update progress circles
        if(gCycle != 0)
        {
            $( "#circleText" + gCycle + "T").toggle();
        }
        //color the appropriate study circle
	$( "#circle" + (gCycle + 1) + "S" ).css( "background", "#dedede" );
        $( "#circleText" + (gCycle + 1) + "S" ).toggle();
	
        $( ".bodyText" ).empty();//clear body
	$( ".title" ).empty();
	        
	//prepare user for study 
	
        $(".bodyText" ).html("<h1>Get ready to study the words.</h1>");         
                
	//start loop after 3000 ms
	setTimeout(function(){
            $( ".title" ).empty();
            $( ".bodyText" ).empty();
	    
	    //set up timer
    	    var slideTotalTime = ((json.wordPairs.length * (studyTime+isiTime))/1000);
            barTimer(0.9, 100,2)
            barTimer(slideTotalTime, 25,1)
            
	    //start study loop
	    setTimeout(studyWords(0), 1000);
	    
        },3000);
}

function studyWords(j) {
	$(".bodyText" ).html("<h1>" + json.wordPairs[j][0] + "<br><br><br>" + json.wordPairs[j][1] + "</h1>");
	j++;
       if (j >= json.wordPairs.length){
	      //call recall Proc 
	      if (gCondition = "anticipation"){
		      anticipationProc();
	      }else{
	      	recallProc(); 
	      }
	      
	      	       
       }else{
	       setTimeout(function () {
		       	   //record event
		       	   recordLine(gCycle,j,'study',json.wordPairs[j][0],json.wordPairs[j][1],'null','null');			   
	                   //set a blank
	                   $(".bodyText").empty();
	                   // call recallWords function again after a certain amount of time has passed
	                   setTimeout(function () {
	                       studyWords(j)
	                   }, isiTime); 
	        }, studyTime); 
       }
}

//sets up the recall procedure
function recallProc(){
	//update progess circles    
        $( "#circleText" + (gCycle + 1) + "S").toggle();//turn off text for study circle
        $( "#circle" + (gCycle + 1) + "T" ).css( "background", "#dedede" );
        $( "#circleText" + (gCycle + 1) + "T" ).toggle();// turn on text for test circle
       
	//clear Content
        $( ".bodyText" ).empty();
        $( ".title" ).empty();
	
	//randomize list
	scrambleWords();
	
	$(".bodyText" ).html("<h1>Get ready to recall the words.</h1>");   
	
	
	//start loop after 3000 ms
	setTimeout(function(){
		//start timer bar
		var slideTotalTime = ((json.wordPairs.length * (testTime+isiTime))/1000);//establish how long the slide will take
		barTimer(0.2,50,2); //reset timer 
		barTimer(slideTotalTime, 50, 1);
		
		//start loop
		recallWords(0);
	},3000);	
}

//recursive function for recalling the words one-at-a-time
function recallWords(j) {
       //present cue word with input box
       $(".bodyText").html("<h1>" + json.wordPairs[j][0] + "<br><br><br><textarea class='cuedRecallResponseInput' id='input1'></textarea></h1>");
       //record stimulus onset time
       var onsetTime = Date.now();
       //focus on input box
       $("#input1").focus();
       
       //set up input box for first keypress and prevent enter in field
       var firstKey = false;
       $("#input1").keypress(function (e) {
	     if (firstKey == false){
		     tRT = Date.now()-onsetTime;
		     firstKey = true;
	     }  
             var k = e.keyCode || e.which;
             if (k == 13) {
                 return false;//prevents return in field
             }
        });
       
	//increment counter
       j++;
       
       //check if list is done
       if (j >= json.wordPairs.length){
	       //increment gCycle
	       gCycle++; 
	       
	       if (gCycle < 3) {
		       //call study procedure
		       studyProc(); 
	       }else{
		       //the experiment is over
		       finishProc();
	       }
	       
	       
       }else{
	       setTimeout(function () {
		       	   //record response
		       	   resp=$( "#input1" ).val();
			   //send AJAX call
			   recordLine(gCycle,j,'recall',json.wordPairs[j][0],json.wordPairs[j][1],resp,tRT);
			   
	                   //set a blank
	                   $(".bodyText").empty();
	                   // call recallWords function again after a certain amount of time has passed
	                   setTimeout(function () {
	                       recallWords(j)
	                   }, isiTime); //Inter stimulus interval
	        }, testTime); //Test Time	
       }
}

//sets up the recall procedure
function anticipationProc(){
	//update progess circles    
        // $( "#circleText" + (gCycle + 1) + "S").toggle();//turn off text for study circle
 //        $( "#circle" + (gCycle + 1) + "T" ).css( "background", "#dedede" );
 //        $( "#circleText" + (gCycle + 1) + "T" ).toggle();// turn on text for test circle
       
	//clear Content
        $( ".bodyText" ).empty();
        $( ".title" ).empty();
	
	//randomize list
	scrambleWords();
	
	$(".bodyText" ).html("<h1>Get ready to recall the words.</h1>"); 	
	
	//start loop after 3000 ms
	setTimeout(function(){
		//start timer bar
		var slideTotalTime = ((json.wordPairs.length * (testTime+studyTime+isiTime+isiTime))/1000);//establish how long the slide will take
		barTimer(0.2,50,2); //reset timer 
		barTimer(slideTotalTime, 50, 1);
		
		//start loop
		recallWordsAnt(0);
	},3000);	
}

//recursive function for recalling the words one-at-a-time
function recallWordsAnt(j) {
       //present cue word with input box
       $(".bodyText").html("<h1>" + json.wordPairs[j][0] + "<br><br><br><textarea class='cuedRecallResponseInput' id='input1'></textarea></h1>");
       //record stimulus onset time
       var onsetTime = Date.now();
       //focus on input box
       $("#input1").focus();
       
       //set up input box for first keypress and prevent enter in field
       var firstKey = false;
       $("#input1").keypress(function (e) {
	     if (firstKey == false){
		     tRT = Date.now()-onsetTime;
		     firstKey = true;
	     }  
             var k = e.keyCode || e.which;
             if (k == 13) {
                 return false;//prevents return in field
             }
        });
       
       setTimeout(function () {
	       	   //record response
	       	   resp=$( "#input1" ).val();
		   //send AJAX call
		   recordLine(gCycle,j,'recall',json.wordPairs[j][0],json.wordPairs[j][1],resp,tRT);
                   //set a blank
                   $(".bodyText").empty();
                   // call recallWords function again after a certain amount of time has passed
                   setTimeout(function () {
                       studyWordsAnt(j)
                   }, isiTime); //Inter stimulus interval
        }, testTime); //Test Time				   }
}

//recursive function for recalling the words one-at-a-time
function studyWordsAnt(j) {
       //present cue word with input box
       $(".bodyText" ).html("<h1>" + json.wordPairs[j][0] + "<br><br><br>" + json.wordPairs[j][1] + "</h1>");
       	//increment counter
       j++;
       
       //check if list is done
       if (j >= json.wordPairs.length){
	       //increment gCycle
	       gCycle++; 
	       
	       if (gCycle < 3) {
		       //call study procedure
		       anticipationProc(); 
	       }else{
		       //the experiment is over
		       finishProc();
	       }
	       
	       
       }else{
	       setTimeout(function () {
		       	   //record event
				   //function recordLine(cycle,trial,procedure,cue,target,resp,rt){			   
			   recordLine(gCycle,j,'study',json.wordPairs[j][0],json.wordPairs[j][1],'null','null');
			   //set a blank
	                   $(".bodyText").empty();
	                   // call recallWords function again after a certain amount of time has passed
	                   setTimeout(function () {
	                       recallWordsAnt(j)
	                   }, isiTime); //Inter stimulus interval
	        }, studyTime); //studyTime Time	
       }
}




function scrambleWords(){
    for (var i = json.wordPairs.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = json.wordPairs[i];
        json.wordPairs[i] = json.wordPairs[j];
        json.wordPairs[j] = temp;
    }
}

function recordLine(cycle,trial,procedure,cue,target,resp,rt){
        $.ajax({        
           type: "POST",
           url: "saveLine.php",       
           data: {
               workerId: workId,
	       condition: 'condition',
	       cycle: cycle,
	       trial: trial, 
               proc: procedure,
               cue: cue,
	       target: target,
	       response: resp,
	       rt: rt
          },
           success: function(result) {
                //alert("Data: " + result);                
           }
         });  
}


function sendData(){
    var j;
        $.ajax({        
           type: "POST",
           url: "saveDemo.php",       
           data: {
               workerId: workId,
               proc: 'rating',
               lang: lang,
               gender: gender,
               age: age
            },
           success: function(result) {
                //alert("Data: " + result);                
           }
         });  
    for(j = 0; j < recall.length; j++){
        $.ajax({        
           type: "POST",
           url: "saveResponse.php",       
           data: {
               assignment: assignId,
               workerId: workId,
               proc: 'rating',
               hitId: userId,
               recall: recall[j]
            },
           success: function(result) {
                //alert("Data: " + result);                
           }
         });  

    }
}

//intervalSpeed is from (1 - 100) where larger the number is faster. Be mindful of choppiness with smaller numbers. If you do use small numbers (less than 10) uncomment the css for the span in main.css.

/* --------------- Instructions to use the bar timer ---------------------------

1. Make sure the timer is reset. To do so, say barTimer(0.2,50,2); Basically the only thing that matters is the 2 at the end since that marks a reset.
2. Use the first option of the timer to set a countdown. (ex. barTimer(10,50,1) <--- the 10 is the amount of seconds, the 50 is the amount of intervals per second, and the 1 is the countdown mode.
WARNING: Making the intervals per second over 50 will possibly effect the accuracy of the timer.

*/
function barTimer(seconds, intSpeed, type){
    var repSize = 10000;
    var inter = 10000/seconds/intSpeed;
    var location = repSize;
    var barSize = document.getElementById('bar').offsetWidth;
    if ((document.getElementById('barSpan').offsetWidth == barSize) && (type == 1))
    {
        var timer=setInterval(function(){
            location = location - inter;
            var interval = location/repSize;
            if (interval < 0)
            {
                interval = 0;
            }
            /* console.log(location); */
            if (location <= 0)
            {
                clearInterval(timer);
            }
        /*         if (barWidth < (500/seconds/intSpeed)) {
                document.getElementById("barSpan").style.width = barWidth - barWidth + "px";
            } */
            document.getElementById("barSpan").style.width = barSize * interval + "px";
            
            
        
        },1000/intSpeed);
    }
    else if (type == 2)
    {
        document.getElementById("barSpan").style.width = barSize + "px";
    }
    else if (type = 3)
    {
        //IN THIS CASE, INTSPEED BECOMES THE AMOUNT OF PROGRESS YOU WILL PERFORM OUT OF [0 - 1]
        document.getElementById("barSpan").style.webkittransition = "width 0.4";
        document.getElementById("barSpan").style.moztransition =  "width 0.4s";
        document.getElementById("barSpan").style.mstransition =  "width 0.4s";
        document.getElementById("barSpan").style.transition = "width 0.4s";
        if ((document.getElementById('barSpan').offsetWidth + intSpeed*barSize) < barSize){
            document.getElementById("barSpan").style.width = document.getElementById('barSpan').offsetWidth + intSpeed*barSize + "px";
        }
        else
        {
            document.getElementById("barSpan").style.width = barSize + "px";
        }
    }
    else 
    {
        alert("When calling barTimer, please put a 1, 2, 3 in the third input argument");
    }
}

window.onbeforeunload = function() { return "If you reload or exit this page, the experiment will be terminated and the data will be lost."; };