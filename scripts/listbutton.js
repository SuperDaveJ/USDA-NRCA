// JavaScript Document for Trashcan

//check browser
browser = navigator.appName
browserNum = parseInt(navigator.appVersion)
N4 = false
N6 = false
IE = false
if ( (browser == "Netscape") && (browserNum < 5) ) N4 = true
else if ( (browser == "Netscape") && (browserNum >= 5) ) N6 = true
else IE = true

//=============================
// Set the message for the alert box for review the source
var am = "This function is disabled!";

//======disable right-click=========
document.onmousedown = fs;
if (document.layers) window.captureEvents(Event.MOUSEDOWN);
if (N4) window.onmousedown = fs;

function fs(e) {
   if (IE && (event.button >1)){
      alert(am)
      return false
   } else if (N4 || N6 && e.which >1) {
     alert(am)
     return false;
   }
}

//=====================
// Set up question variables
var iniLayer = 3;
var nCorrect;			//nubmer of correct items
var triesUser = 0;			//number of user selection that are correct
var triesLimit = 2;

arrCorrectObjs = new Array();

var targetCenterX, targetCenterY;
var targetLeft, targetRight, targetTop, targetBottom;
var targetOffsetX = 50;	//Horizontal distance from correct item center to target center in pixels
var targetOffsetY = 50;	//Vertical distance from correct item center to target center in pixels
var strUserImages = "";

var strMatched = "";
var selectedDrag = null;
var dragLayerId, intDragNum;

var offsetX, offsetY;

var dragLayerArray, dragPositionArray, targetPositionArray;
targetLayerArray = new Array("target1");


//===================get the variables from the original pages ==================	
function distrload() {
	nCorrect = strCorrectObjs.length/2;
	arrCorrectObjs = strCorrectObjs.substring(0,strCorrectObjs.length-1).split(",");
	dragLayerArray = new Array(nObj);
	dragPositionArray = new Array(nObj);
	targetPositionArray = new Array(nCorrect);
	for (var i=0; i<nObj; i++) {
		dragLayerArray[i] = "drag"+(i+1);
		dragPositionArray[i] = new Array(4);
	}
	strMatched = ""
	for (var i=0; i<nCorrect; i++) {
		targetPositionArray[i] = new Array(2);
		strMatched = strMatched +"0," //new add
	}
}

function init() {
	
	if ( IE ) {
		var targetStyle;
		for (var i=0; i<nObj; i++) {
			eval("dragStyle = document.all['drag" + (i+1) + "'].style");
			dragPositionArray[i][0] = dragStyle.pixelLeft;
			dragPositionArray[i][1] = dragStyle.pixelTop;
			eval("dragPositionArray[" + i + "][2] = document.all['drag" + (i+1) + "'].offsetWidth");	
			eval("dragPositionArray[" + i + "][3] = document.all['drag" + (i+1) + "'].offsetHeight");
		}

		targetLeft = parseInt(target1.style.left) + arrTPropty[1]
		//alert(arrTPropty[1]+", "+target1)
		targetRight = targetLeft + target1Img.width
		targetTop = parseInt(target1.style.top) + arrTPropty[0]
		targetBottom = targetTop + target1Img.height
		for (var i=0; i<nCorrect; i++) {
			targetPositionArray[i][0] = targetLeft
			if (i>1) {
				targetPositionArray[i][1] = targetTop + i*arrTPropty[2]-1;
			} else {
				targetPositionArray[i][1] = targetTop + i*arrTPropty[2];
			}
		}
		document.onmousedown = grabItem;
		document.onmousemove = dragItem;
		document.onmouseup = releaseItem;
	} else if (N4) {
		setNSEventCapture()
		document.onmousedown = grabItem
		document.onmousemove = dragItem
		document.onmouseup = releaseItem
	} else {	//NS 6 and others
		for (var i=0; i<nObj; i++) {
			eval("drag1 = document.getElementById('drag"+(i+1)+"')")
			eval("attachEvent(drag"+(i+1)+")")
		}
		
		window.onmousemove = dragItem
	}
	//alert(dragItem)
}



//set z-index property
function setzIndex(dragLayer, zOrder) {
	if (N6) dragLayer.zIndex = zOrder
	else dragLayer.style.zIndex = zOrder
}

function shiftTo(dragLayer, x, y) {
	if (N4) dragLayer.moveTo(x, y)
	else if (N6) {dragLayer.style.left = x; dragLayer.style.top = y;}
	else {dragLayer.style.pixelLeft = x; dragLayer.style.pixelTop = y;}
}

function moveBack(objDragLayer, intDragNum) {
	//alert(objDragLayer +", "+intDragNum)
	var releaseX, releaseY;
	//releaseX = window.event.clientX
//	releaseY = window.event.clientY
//	movableObj(releaseX, releaseY, dragPositionArray[intDragNum-1][0], dragPositionArray[intDragNum-1][1], 10, 10, objDragLayer.id)
	shiftTo(objDragLayer, dragPositionArray[intDragNum-1][0], dragPositionArray[intDragNum-1][1])
	setzIndex(objDragLayer,0)
}


function moveToTarget(objDragLayer,itemN) {
	shiftTo(objDragLayer, targetPositionArray[itemN][0], targetPositionArray[itemN][1])

}

function setSelectedElem(e) {
	//Only N4 and IE call this function
	if (N4) {
		clickX = e.pageX
		clickY = e.pagyY
		for (i=document.layers.length-1; i>=0; i--) {
			testObj = document.layers[i]	//a draggable layer
			for (j=0; j<dragLayerArray.length; j++) {
				if ( (testObj.id == dragLayerArray[j]) && (clickX > testObj.left) && (clickX < testObj.left+testObj.clip.width) && (clickY > testObj.top) && (clickY < testObj.top+testObj.clip.height) ) {
					selectedDrag = testObj
					setzIndex(selectedDrag,100)
					return
				}
			}
		}
	} else {	//IE
		imgObj = window.event.srcElement	//image object
		testObj = imgObj.parentElement	//draggable layer
		dragLayerId = imgObj.parentElement.id
		intDragNum = parseInt(dragLayerId.substring(4,dragLayerId.length))
		for (i=0; i<dragLayerArray.length; i++) {
			if (dragLayerId == dragLayerArray[i] && testObj) {
				selectedDrag = testObj
				setzIndex(selectedDrag,100)
				return
			}
		}
	}
}

function dragItem(e) {
	if (selectedDrag) {
		if (IE) {
			x = event.clientX - offsetX
			y = event.clientY - offsetY
		} else {
			x = e.pageX - offsetX
			y = e.pageY - offsetY
		}
		shiftTo(selectedDrag, x, y)
		return false
	}
}

function grabItem(e) {
	if (N6) {
		offsetX = e.layerX
		offsetY = e.layerY
		selectedDrag = this
		//iniLayer = selectedDrag.zIndex
		setzIndex(selectedDrag,100)
	} else {
		setSelectedElem(e)
		if (selectedDrag) {
			if (N4) {
				offsetX = e.pageX - selectedDrag.left
				offsetY = e.pageY - selectedDrag.top
			} else {
				offsetX = window.event.offsetX
				offsetY = window.event.offsetY
			}
		}
		return false
	}
}

function releaseItem(e) {

	if (selectedDrag) {
		//determine where user released mouse button
		var releaseX, releaseY;
		if (IE) {	//Microsoft Internet Explorer
			releaseX = window.event.clientX
			releaseY = window.event.clientY
			
		} else {
			releaseX = e.pageX
			releaseY = e.pageY
		}
		//alert(releaseX +", "+ targetLeft)
		for (var i=0; i<nObj; i++) {
			//check to see if there is any match
			if ( (releaseX > targetLeft) && (releaseX < targetRight) && (releaseY > targetTop) && (releaseY < targetBottom) && (i == intDragNum-1)  && (strMatched.indexOf("0") != -1) ) {  //&& (strCorrectObjs.indexOf((i+1)+",") != -1)
				var pos = strMatched.indexOf("0")
				if (strMatched.indexOf(intDragNum)!=-1) strMatched = strMatched.substring(0,strMatched.indexOf(intDragNum)) + "0" + strMatched.substring(strMatched.indexOf(intDragNum)+1,strMatched.length)
				strMatched = strMatched.substring(0,pos) + intDragNum + strMatched.substring(pos+1,strMatched.length)
				moveToTarget(selectedDrag,pos/2)
			} else if (i == intDragNum-1) {
				var pos = strMatched.indexOf(intDragNum)
				if (pos != -1) {
					strMatched = strMatched.substring(0,pos) + "0" + strMatched.substring(pos+1,strMatched.length)
				}
					moveBack(selectedDrag, intDragNum)
			}
		}
		setzIndex(selectedDrag,iniLayer)
		selectedDrag = null
	}
}
//============click done to judge the question =======
function judgeInteraction() {
	var userCorrect = 0;
	var strIncorrect = "";
	var strTemp = "";
	var strK = "";
	triesUser += 1;

	for (var i=0; i<strCorrectObjs.length; i++) {
		if (strCorrectObjs.match(strMatched.substr(i,1))) userCorrect += 1
		else if (strMatched.substr(i,1) != ",") {
			//remember incorrect ones
			strIncorrect = strIncorrect + strMatched.substr(i,1) + ",";
			strK = strK + i + ","
		}
	}
	if (strMatched.match("0")!=null) {
		strTemp = arrPopup[0]
		triesUser -= 1;			
	} else if  ((userCorrect-nCorrect) == nCorrect)  {	//This if condition need to be customized.
		disableDrag();
		triesUser = triesLimit
		strTemp = "<p><b>Correct!</b></p><p>"+arrPopup[1]+"</p>Select FORWARD to continue.</p>" 
	} else if (triesUser == triesLimit) {
		strTemp = "<p><b>Incorrect.</b></p><p>The correct answers are now displayed. "+arrPopup[2]+"</p><p>Select FORWARD to continue.</p>"
		setCorrect();
		disableDrag();
	} else {
		//move back
		var arrTemp = new Array;
		arrTemp = strK.substring(0,strK.length-1).split(",");
		
		for (var i=0; i<arrTemp.length; i++) {
			//keep correct ones and replace incorrect ones with 0
			strMatched = strMatched.replace(strMatched.substr(arrTemp[i],1), '0')
		}
		var mbItems = new Array;
		mbItems = strIncorrect.substring(0,strIncorrect.length-1).split(",");
		for (i=0; i<mbItems.length; i++) {
			eval("moveBack(drag" + mbItems[i] + ", " + mbItems[i] + ")");
		}
		strTemp = "<p><b>Incorrect.</b></p><p>One or more of your answers is incorrect. "+arrPopup[3];
	}
	showFdbk(strTemp);
}

function showFdbk (fromfdbk) {
	//alert(fromfdbk)
	var strTemp = "";	
	if (triesUser == triesLimit) {
		//document.getElementById("review").style.visibility = "visible"
		//document.getElementById("done").style.visibility = "hidden";
		document.getElementById("done").innerHTML = "<img src='../../sysimages/done_3.jpg'>";
		showNextButton();
	} 

	positionTop = (screen.height - 450)/2 - 25;
	positionLeft = (screen.width - 630)/2 - 5;
	newWin = window.open ("","Feedback","toolbar=no,width=550,height=450,menubar=no,resizable=yes,status=no,scrollbars=no,top="+positionTop+",left="+positionLeft+"");
	newWin.focus(); //openWinCentered(fdbcname, "Feedback", 630, 600, "no" );
	if (newWin != null)
	{
	if (newWin.opener == null) {newWin.opener = window};
	strTemp	= strTemp + "<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>";
	strTemp	= strTemp + "<html xmlns='http://www.w3.org/1999/xhtml'>";
	strTemp	= strTemp + "<meta http-equiv='Content-Type' content='text/html; charset=utf-8' />"
	strTemp	= strTemp + "<title>USDA-NRCS Recruiting Review Feedback</title>"
	strTemp	= strTemp + "<link rel='stylesheet' type='text/css' href='../../styles/pop_nrcs.css' />"
	strTemp	= strTemp + "</head><body><div id = 'popupContent' ><p class='popupTitle'>Feedback</p>"
	strTemp	= strTemp + fromfdbk;
	strTemp	= strTemp + "</div>"
	strTemp	= strTemp + "</body></html>"
	strTemp	= strTemp + ""
	
		//newWin.document.getElementById("pText").innerHTML = arrPopup[fromfdbk];
		newWin.document.write(strTemp);
		newWin.document.close();
	}
}

function setCorrect() {
	for (var i=0; i<nObj; i++) {
	var obj = eval("document.getElementById('drag"+(i+1)+"')")
		//alert(obj)
		if (i<nCorrect) shiftTo(obj, targetPositionArray[i][0], targetPositionArray[i][1])
		else shiftTo(obj, dragPositionArray[i][0], dragPositionArray[i][1])
	}
}

function attachEvent(obj) {
	if (N4 || N6) {//for N6 only
		obj.addEventListener("mousedown", grabItem, false)
		obj.addEventListener("mousemove", dragItem, false)
		obj.addEventListener("mouseup", releaseItem, false)
	}
}


//set event capture for N4
function setNSEventCapture() {
	if (N4) document.captureEvents(Event.MOUSEDOWN | Event.MOUSEMOVE | Event.MOUSEUP)
}

function disableDrag() {
	document.onmousedown = null;
	document.onmousemove = null;
	document.onmouseup = null;
}