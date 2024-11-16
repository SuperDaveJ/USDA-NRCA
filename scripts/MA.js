// JavaScript Document

//var btnLocation = "down";
var triesUser = 0;
var triesLimit = 2;
var didcorrect = false;
var letters = "A,B,C,D,E,F,G,H,I"
var blnmultiP = false;

var triesUser = 0;
//var qStatus = 0;	//question status. 1=correct, 0=incorrect

arrLetters = new Array(nItems);
arrLetters = letters.split(",");
arrCorrectAns = new Array(nItems);
arrCorrectAns = strCorrectAns.split(",")
userAns = new Array(nItems);
var triesLimit = 2;
 
//feedbacks.
var choiceFirstPrompt = "<p>Please select an answer.</p>"
var FbNoAnswer = 0		//no answer
var FbNoneCorrect = 1
var FbSomeCorrect = 1
var FbFinalIncorrect = 2
var FbAllCorrect = 3	//Correct!


var arrPopup = new Array();
for (var i=0; i<4; i++) {
	arrPopup[i] = "";
}
//Nothing is done
arrPopup[0]  = "<p>You have not made any selections.  Please try again.</p>"
 
//first incorrect
arrPopup[1]  = "<strong><p>Incorrect.</p></strong>" + fdbkWrong1
 

arrPopup[2]  = "<strong><p>Incorrect.</p></strong> <p>The correct answers are displayed. " + fdbkWrong2 + "</p> <p>Select FORWARD to continue.</p>"
 
//correct
arrPopup[3]  = "<strong><p>Correct!</p></strong><p>" + fdbkCorrect +"</p><p>Select FORWARD to continue.</p>"


 
function judgeInteraction() {
	if (triesUser < triesLimit) {
		var strTemp, strFeedbackText
		strTemp = ""
		fmDistracter=document.forms[0].fmDistracter
		for (var i=0; i<nItems; i++) {
			if(fmDistracter[i].checked) {
				strTemp = strTemp + "1,";
			} else {
				strTemp = strTemp + "0,";
			}
		}
		userAns = strTemp.split(",")
	
		var unChecked = 0;
		var nCorrect = 0;
		var nIncorrect = 0;
		var nChecksMatched = 0;
		for (i=0; i<nItems; i++) {
			if (userAns[i] == 0) unChecked += 1;
			if (userAns[i] == arrCorrectAns[i]) nCorrect += 1
			
			if ((arrCorrectAns[i] == 1) && (userAns[i] == arrCorrectAns[i]))
				nChecksMatched += 1
		}
		if (unChecked == nItems) {
			//No answer selected
			strFeedbackText = FbNoAnswer
		} else {
			triesUser += 1;
			if (nCorrect == nItems) {
				for (i=0; i<nItems; i++) {
					if (arrCorrectAns [i]==1) {
						fmDistracter[i].checked = true
					}else{
						fmDistracter[i].checked = false
						//eval("document.getElementById('cr" + (i+1) + "').className = 'distracter_dis'")
						//eval("document.getElementById('Letter" + (i+1) + "').className = 'distracter_dis'")
					}
					fmDistracter[i].disabled = "disabled"
				}
					
				//Correct answers
				strFeedbackText = FbAllCorrect;
				triesUser = triesLimit;
				didcorrect = true;
				//eval("document.getElementById('disTable').style.cursor = 'text'")
				//Enable Next button
				//MM_showHideLayers('Next','','show')
				//document.forms[0].Done.disabled = "disabled"
			} else {
				//second try
				if (triesUser == triesLimit) {
					for (i=0; i<nItems; i++) {
						if (arrCorrectAns [i]==1) {
							fmDistracter[i].checked = true
						}else{
							fmDistracter[i].checked = false
							//eval("document.getElementById('cr" + (i+1) + "').className = 'distracter_dis'")
							//eval("document.getElementById('Letter" + (i+1) + "').className = 'distracter_dis'")
						}
						fmDistracter[i].disabled = "disabled"
					}
					strFeedbackText = FbFinalIncorrect
					//eval("document.getElementById('disTable').style.cursor = 'text'")
					//MM_showHideLayers('Next','','show')
					//document.forms[0].Done.disabled = "disabled"
				} else  { //1st try wrong
	
					if (nChecksMatched == 0){ //1st try wrong
					//non correct
						strFeedbackText = FbNoneCorrect;
					} else {
					//some correct
						strFeedbackText = FbSomeCorrect;
					}
				}	
			}
		}
		//transTerm(strFeedbackText);
		showFeedback(strFeedbackText);
	}
}
 
function showCorrect() {
	document.getElementById("next").style.visibility = "visible";
	for (i=0; i<nRows; i++) {
		for (j=0; j<nCols; j++) {
			if (arrCorrectAns[i][j] == 1) {
				eval('document.forms[0].row' + (i+1) + '[' + j + '].checked = true')
			} else {
				eval('document.forms[0].row' + (i+1) + '[' + j + '].checked = false')
			}
			eval('document.forms[0].row' + (i+1) + '[' + j + '].disabled = "disabled"')
		}
	}		
	eval("document.getElementById('qTable').style.cursor = 'text'");
	
	//Enable Next button and lock Done button
	//MM_showHideLayers('Next','','show')
	//document.Done.disabled = "disabled"
	changeCursor('text');
}
 
function changeCursor(strCursorName) {
	//cursor for radio buttons
	for (i=0; i<nItems; i++) {
		document.forms[0].elements[i].style.cursor = strCursorName;
	}
	//cursor for Done button
	if (strCursorName != "pointer")
		document.links[0].style.cursor = "default";	
	else
		document.links[0].style.cursor = strCursorName;
}
 
function writeQuestion() {
	var strHTML, chrTemp, strTemp
	strHTML = "<table id='qTable' border='0' width='95%' cellspacing='10' cellpadding='8'>"
	for (i=0; i<nItems; i++) {
		strHTML += "<tr><td width='3%' valign='center'><input type='checkbox' name='fmDistracter' tabindex="+(i+1)+" alt='"+arrLetters[i]+". "+distracters[i]+"'></td>"
		strHTML  += "<td width='3%' > <p id='Letter"+(i+1)+"' class='distrText'>"+arrLetters[i]+".</p></td>"
		strHTML  += "<td ><p id='cr"+(i+1)+"' class='distrText'>"+distracters[i]+"</p></td></tr>"
	}
	//if (btnLocation == "down")	//change it to "up" in question page if needed
		strHTML += "<tr><td colspan='3'>&nbsp;</td></tr>"
		strHTML += "<tr><td colspan='3' align='center'><a href = 'javascript:judgeInteraction()' ><div id='done'></div></a></td></tr></table>"
	
	document.write(strHTML);
}

function showFeedback (fromfdbk) {
	var strTemp = "";
	
	if (triesUser == triesLimit) {
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
	strTemp	= strTemp + arrPopup[fromfdbk]
	strTemp	= strTemp + "</div>"
	strTemp	= strTemp + "</body></html>"
	strTemp	= strTemp + ""
	
		//newWin.document.getElementById("pText").innerHTML = arrPopup[fromfdbk];
		newWin.document.write(strTemp);
		newWin.document.close();
	}
}

