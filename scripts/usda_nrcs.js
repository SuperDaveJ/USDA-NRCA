// JavaScript Document for AFIT SLIM
// Global variables
//var vpPath = "http://www.c2mm.net/virtualPilot/";	//path to Virtual Pilot site
var blnFirstPage = false;
var blnLastPage = false;
var blnHasCC = false;

/********************************** Course Content Related Functions *************************************/
/* This function will be called from flash */
function changePrompt(newPrompt) {
	//This function is added later. Otherwise the prompt would be designed differently.
	//There are 3 possible IDs for the prompt div layer.
	divs = document.getElementsByTagName("div");
	for (var i=0; i<divs.length; i++) {
		if ( divs[i].id == "prompt_one_line" ) {
			document.getElementById("prompt_one_line").innerHTML = newPrompt;
			break;
		} else if ( divs[i].id == "prompt_two_lines" ) {
			document.getElementById("prompt_two_lines").innerHTML = newPrompt;
			break;
		} else if ( divs[i].id == "prompt_three_lines" ) {
			document.getElementById("prompt_three_lines").innerHTML = newPrompt;
			break;
		}
	}
}

function exitConfirm(){
	if (confirm("Do you wish to exit the course?")==true) parent.exitCourse(true);
}

function refresh() {
	window.location.reload();
}

function openWinCentered(myUrl, myTitle, myWidth, myHeight, scrollbar ) {
	// open the window
	positionTop = (screen.height - myHeight)/2 - 25;
	positionLeft = (screen.width - myWidth)/2 - 5;
	newWin = window.open (myUrl,myTitle,"toolbar=no,width="+myWidth+",height="+myHeight+",menubar=no,resizable=yes,status=no,scrollbars="+scrollbar+",top="+positionTop+",left="+positionLeft+"");
	newWin.focus();
}

function showTopics() {
	//topics page file format is m#l#_topics.html (l = L for lesson)
	topicURL = "m" + parent.getModule() + "l" + parent.getLesson() + "_topics.html"
	openWinCentered(topicURL, "LessonTopics", 630, 700, "no");
	//window.open(topicURL, "LessonTopics");
}

function showCC() {
	if (blnHasCC) {
		filename = parent.getPage() + "_cc.html";
		openWinCentered( filename, "ClosedCaptioning", 550, 450, "no" );
	} else {
		alert("There is no closed captioning for this page.");
	}
}

function show508() {
		filename = parent.getPage() + "_508.html";
		openWinCentered( filename, "dLink", 550, 450, "no" );
}

function iconviewed(iconid,g) {

	document.getElementById(iconid).src = g.substring(0,g.length-4)+"_2"+g.substring(g.length-4,g.length)
}

function openHelp() {
	openWinCentered("../../help.html", "Help", 630, 600, "yes" )
}

function openGlossary() {
	openWinCentered("../../glossary.html", "Glossary",  650, 700, "yes" );
}

function openResources() {
	openWinCentered("../../resources.html", "Reources",  630, 600, "no" );
}

function showPopup(iTerm) {
    filename = parent.getPage() + "_pop.html?popterm=" + iTerm;
    openWinCentered( filename, "popupText", 550, 450, "no" );
}

/************* turn note pad page **************/
function expap(direction){
	document.getElementById("btnnoteF").style.visibility = "visible";
	document.getElementById("btnnoteB").style.visibility = "visible";
	
 if (page >=0 && page<= totaltopic+1) {
	if (direction=='f' ) page += 1;
	else page -= 1;
   
   
  var e;
  for (i=1; i<=totaltopic; i++) {
	var e= eval("document.getElementById('para"+i+"')");
	e.style.display="none";  
  }
  
  e= eval("document.getElementById('para"+page+"')"); 

 if (e) e.style.display="block";
 if (page==totaltopic+1) { document.getElementById("btnnoteF").style.visibility = "hidden";}
 if (page==0) { document.getElementById("btnnoteB").style.visibility = "hidden"; }
  //return true;
}
}

function showExp() {
	if (document.form1.useinput.value == "" || document.form1.useinput.value == "Type your answer in this area.")
		{alert("\nYou need to answer the question to continue.")}
	else
		document.getElementById("eresptxt").style.display="block";
	}

/***************************** Flash Narration and Animation Functions *********************************/
function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_controlShockwave(objStr,x,cmdName,frameNum) { //v3.0
  var obj=MM_findObj(objStr);
  if (obj) eval('obj.'+cmdName+'('+((cmdName=='GotoFrame')?frameNum:'')+')');
}

function MM_showHideLayers() { //v9.0
  var i,p,v,obj,args=MM_showHideLayers.arguments;
  for (i=0; i<(args.length-2); i+=3) 
  with (document) if (getElementById && ((obj=getElementById(args[i]))!=null)) { v=args[i+2];
    if (obj.style) { obj=obj.style; v=(v=='show')?'visible':(v=='hide')?'hidden':v; }
    obj.visibility=v; }
}

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

// Get the flash animation object for different browsers.
function getFlashMovie(movieName) {   
	var isIE = navigator.appName.indexOf("Microsoft") != -1;   
	return (isIE) ? window[movieName] : document[movieName];  
}  

function turnOnAudio() {
	document.getElementById("audio_off").style.visibility = "hidden";
	document.getElementById("audio_on").style.visibility = "visible";
	parent.audioOn = true;
}

function turnOffAudio() {
	document.getElementById("audio_off").style.visibility = "visible";
	document.getElementById("audio_on").style.visibility = "hidden";
	parent.audioOn = false;
}

// Enable/Disable audio and Show/Hide buttons
function controlAudio( onOrOff ) {
	//controlAudio( "on" ) for Play button, controlAudio( "off" ) for Pause button
	//This will play and pause narration audio whose id is "narration".  Animation flash id is "animation".
    if (document.narration) {
		if (onOrOff == "on") {
			MM_controlShockwave('narration','','Play');
			turnOnAudio();
		} else {
			MM_controlShockwave('narration','','StopPlay');
			turnOffAudio();
		}
	} else if (blnAnimation) {	//blnAnimation is set in jqFunctions.js file
		//Call functons in Flash animation.  Set the id to fanimation in HTML code.
		if (onOrOff == "on") {
			getFlashMovie("animation").unmuteAudio();
			turnOnAudio();
		} else {
			getFlashMovie("animation").muteAudio();
			turnOffAudio();
		}
	}
}

function checkAudio() {
	//This function needs to be called at the bottom of every page.
    if ( (document.narration) || (blnAnimation) ) {
		if ( parent.audioOn == true ) {
			document.getElementById('audio_on').style.visibility='visible';
			document.getElementById('audio_off').style.visibility='hidden';
			MM_controlShockwave('narration','','Play');
		} else {
			document.getElementById('audio_on').style.visibility='hidden';
			document.getElementById('audio_off').style.visibility='visible';
			MM_controlShockwave('narration','','StopPlay');	
		}
	} else {
		document.getElementById('audio_on').style.visibility='hidden';
		document.getElementById('audio_off').style.visibility='hidden';
	}
}

/***************************************************** Query Functions ***************************************************/
function PageQuery(q) {
	if(q.length > 1) this.q = q.substring(1, q.length);
	else this.q = null;
	this.keyValuePairs = new Array();
	if(q) {
		for(var i=0; i < this.q.split("&").length; i++) {
			this.keyValuePairs[i] = this.q.split("&")[i];
		}
	}

	this.getKeyValuePairs = function() { return this.keyValuePairs; }

	this.getValue = function(s) {
		for(var j=0; j < this.keyValuePairs.length; j++) {
			if(this.keyValuePairs[j].split("=")[0] == s)
				return this.keyValuePairs[j].split("=")[1];
		}
		return false;
	}

	this.getParameters = function() {
		var a = new Array(this.getLength());
		for(var j=0; j < this.keyValuePairs.length; j++) {
			a[j] = this.keyValuePairs[j].split("=")[0];
		}
		return a;
	}

	this.getLength = function() { return this.keyValuePairs.length; } 
}

function getQueryValue(key){
	var page = new PageQuery(window.location.search); 
	return unescape(page.getValue(key)); 
}

/***************************************************** Comments Functions ***************************************************/
function addComment() {
	comWin = window.open(vpPath + 'addComment.asp?uID='+parent.userID+'&cID='+parent.courseID+'&mID='+moduleID+'&lID='+lessonID+'&pID='+parent.getPage(), "Comments", "width=800,height=600,scrollbars=no");
}

function viewComment() {
	viewWin = window.open(vpPath + 'reviewComments.asp?uID='+parent.userID+'&cID='+parent.courseID+'&mID='+moduleID+'&lID='+lessonID+'&pID='+parent.getPage(), "Comments", "width=800,height=600,scrollbars=yes");
}

/***************************************************** Other Functions ***************************************************/

