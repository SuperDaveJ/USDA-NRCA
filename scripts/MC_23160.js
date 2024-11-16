// JavaScript Document

var triesUser = 0;
var triesLimit = 1;
var didcorrect = false;
var letters = "A,B,C,D,E,F,"
var qStatus = 0;	//question status. 1=correct, 0=incorrect

arrLetters = new Array(nItems);
arrLetters = letters.split(",");
arrCorrectAns = new Array(nItems);
arrCorrectAns = strCorrectAns.split(",")
userAns = new Array(nItems);

 
var arrPopup = new Array();
for (var i=0; i<4; i++) {
	arrPopup[i] = "";
}
//Nothing is done
arrPopup[0]  = "<p>Please select an answer.</p>"
 
//first incorrect
arrPopup[1]  = "<strong><p>Incorrect.</p></strong>"
 

arrPopup[2]  = "<strong><p>Incorrect.</p></strong><p>"+lastWFdbk+"</p> <p>Select NEXT QUESTION to continue.</p>"
 
//correct
arrPopup[3]  = "<strong><p>Correct!</p></strong><p>" + lastCFdbk +"</p> <p>Select NEXT QUESTION to continue.</p>"


 
function judgeInteraction() {
	if (triesUser < triesLimit ) { 
		var strTemp
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
		}
		if (unChecked == nItems) {
			//No answer selected
			strTemp = arrPopup[0];
		} else {
			triesUser += 1;
			if (nCorrect == nItems) { //correct selection
				for (i=0; i<nItems; i++) {
					if (arrCorrectAns [i]==1) {
						fmDistracter[i].checked = true
						//eval("document.getElementById('cr" + i + "').className = 'distracter'")
					} else {
						fmDistracter[i].checked = false
						//eval("document.getElementById('cr" + (i+1) + "').className = 'distracter_dis'")
						//eval("document.getElementById('Letter" + (i+1) + "').className = 'distracter_dis'")
					}
					fmDistracter[i].disabled = "disabled"
				}		
				//Correct answers
				strTemp = arrPopup[3];
				didcorrect = true;
				triesUser = triesLimit;
				//eval("document.getElementById('disTable').style.cursor = 'text'");
				//Enable Next button and lock Done button
				//MM_showHideLayers('Next','','show')
				//document.Done.disabled = "disabled"
			} else {
				//second try
				if (triesUser == triesLimit) {
					for (i=0; i<nItems; i++) {
						if (arrCorrectAns [i]==1) {
							fmDistracter[i].checked = true
							//eval("document.getElementById('cr" + i + "').className = 'distracter'")
						}else{
							fmDistracter[i].checked = false
							//eval("document.getElementById('cr" + (i+1) + "').className = 'distracter_dis'")
							//eval("document.getElementById('Letter" + (i+1) + "').className = 'distracter_dis'")
						}
						fmDistracter[i].disabled = "disabled"
					}
					strTemp = arrPopup[2];
					//eval("document.getElementById('disTable').style.cursor = 'text'");
					//MM_showHideLayers('Next','','show')
					//document.done.disabled = "disabled"
				} else  { //1st try wrong
					for (i=0; i<nItems; i++) {
						if (userAns[i] == 1) strTemp = arrPopup[1]+"<p>"+arrFdbk[i]+"</p>"
					}
				}
			}
		}
// popup feedback
			//alert(strTemp);
			//transTerm(strTemp);
			showFeedback(strTemp);
			//MM_showHideLayers('Next','','show');
 
	}
}

 
function showCorrect() {
	
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
		strHTML += "<tr><td width='3%' align='top'><input type='radio' name='fmDistracter' tabindex="+(i+1)+" title='"+arrLetters[i]+". "+distracters[i]+"'></td>"
		strHTML  += "<td width='3%'  > <p id='Letter"+(i+1)+"' class='distrText'>"+arrLetters[i]+".</p></td>"
		strHTML  += "<td ><p id='cr"+(i+1)+"' class='distrText' >"+distracters[i]+"</p></td></tr>"
	}
	
	strHTML += "<tr><td colspan='3'>&nbsp;</td></tr>"
	strHTML += "<tr><td colspan='3' align='center'><a href='javascript:judgeInteraction()' ><div id='done'></div></a></td></tr></table>"
	document.write(strHTML);
}
function writebutton() {
	strHTML = ""
	if (triesUser == 0) {
//var didcorrect = false;)
		strHTML += "<td align='center'><a href='javascript:judgeInteraction()' >"
		strHTML += "<img src='" + donePath + "' alt='Done button' id='Done' name='Done' width='84' height='36' border='0' /></a>"
	} else {
		strHTML += "<td align='center'><a href='javascript:goRemediation()' >"
		strHTML += "<img src='" + reviewPath + "' alt='Review button' id='Review' name='Review' width='84' height='36' border='0' /></a>"
	}
	
	strHTML += "</td><td width='20%' valign='top'>&nbsp;</td></tr></table>"
	return strHTML
	
}
function showFeedback (fromfdbk) {
	//alert(fromfdbk)
	var strTemp = "";
	document.getElementById("done").style.visibility = "hidden";
	document.getElementById("q_next").style.visibility = "visible";
//	if (triesUser == triesLimit) {
//		//document.getElementById("review").style.visibility = "visible"
//		//document.getElementById("done").style.visibility = "hidden";
//		document.getElementById("done").innerHTML = "<img src='../../sysimages/done_3.jpg'>";
//		showNextButton();
//	} 

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

