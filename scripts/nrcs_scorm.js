// JavaScript Document for AFIT - SLIM
// This file needs to be included in the index file only
/************************************** Suspend Data Format *************************************************/
/* moduleStatus~lessonStatus~pagesViewed
/* moduleStatus and lessonStatus are  streams of 0, 1, and 2 separated by comma (,). 
/* 0=not started, 1=started but not completed, 2=completed
/* pagesViewed contains page file names (without .html) that have been viewed.
/* If NOT in LMS, cookie is used to store suspend data.
/************************************** SCORM and Navigation Functions **************************************/

//Store global variable here.
inLMS = false;
audioOn = true;
var strPagesViewed = "";
var strAllModuleStatus = "";
var strAllLessonStatus = "";
var bookmark = "";
/* number of modules and number of lessons for each module */
var nModules = 5;		//There are 7 modules
var nLessons_1 = 2;		//module 1 lessons
var nLessons_2 = 3;		//module 2 lessons
var nLessons_3 = 3;		//module 3 lessons
var nLessons_4 = 2;		//module 4 lessons
var nLessons_5 = 1;		//module 5 lessons

function gotoPage(direction, pgURL) {
	//window.location = getLesson() + "/" + pgURL;
	if (direction == "f") {
		if ( isPageViewed(getPage()) != true ) {
			strPagesViewed = strPagesViewed + "," + getPage();
			if (contentFrame.blnLastPage) toModuleMenu();
		}
	}
	if (contentFrame.blnFirstPage) updateLessonStatus('1');
	contentFrame.location.href = pgURL;
}

function toModuleMenu() {
	var iMod = getModule();
	mFile = "../m" + iMod + "_menu.html";
	if (contentFrame.blnLastPage) {
		updateLessonStatus('2');
		updateDatabase();
	} else {
		updateSuspendData()
	}
	contentFrame.location.href = mFile;
}

function getPage() {
	//return current page file name in lower case without file extension.
	arrTemp = new Array();
	arrTemp2 = new Array();
	arrTemp = contentFrame.location.href.split("/");
	arrTemp2 = arrTemp[arrTemp.length-1].split("?");
	var strTemp = arrTemp2[0];
	var intTemp = strTemp.indexOf(".htm");
	strTemp = strTemp.substring(0,intTemp);
	return strTemp.toLowerCase();
}

function getLesson() {
	//Returns an integer as lessonID
	var strTemp = getPage();
	if ( strTemp.indexOf("menu") > 0 ) return 0;
	else return parseInt(strTemp.substr(1,1));
}

function getModule() {
	//Returns an integer as moduleID
	var strTemp = getPage();
	if ( strTemp.indexOf("menu") > 0 ) return 0;
	else return parseInt(strTemp.substr(0,1));
}

//This function needs to be called from first page and last page of each lesson.
//in first page: updateLessonStatus('1'), in last page: updateLessonStatus('2')
function updateLessonStatus(cStatus) {
	var iMod = getModule();
	var iLes = getLesson();
	arrTemp = strAllLessonStatus.split(",");
	arrTemp[iMod-1] = arrTemp[iMod-1].substr(0, iLes-1) + cStatus + arrTemp[iMod-1].substr(iLes);
	strAllLessonStatus = arrTemp.join();
	//update module status if necessary
	var allDone = true;
	for (var i=0; i<arrTemp[iMod-1].length; i++) {
		if (arrTemp[iMod-1].substr(i,1) != "2") {
			allDone = false;
			break;
		}
	}
	if (allDone) {
		strAllModuleStatus = strAllModuleStatus.substr(0,iMod-1) + "2" + strAllModuleStatus.substr(iMod);
	} else {
		if ( strAllModuleStatus.substr(iMod-1, 1) != "2" )
			strAllModuleStatus = strAllModuleStatus.substr(0,iMod-1) + "1" + strAllModuleStatus.substr(iMod);
	}
	if (cStatus == "2") cleanSuspendData();
	else updateSuspendData();
}

function isPageViewed(pageFile) {
	pageFile = pageFile.toLowerCase()
	var intTemp = pageFile.indexOf(".htm")
	if (intTemp != -1) pageFile = pageFile.substring(0,intTemp)
	var iMod = getModule();
	var iLes = getLesson();
	if ( getSingleLessonStatus(iMod, iLes) > 1 ) return true
	if (typeof(strPagesViewed) == "undefined") return false
	if (strPagesViewed.indexOf(pageFile) >= 0) return true
	else return false
}

function getAllModuleStatus() {
	getSuspendData();
	return strAllModuleStatus;		// a stream of 7 numbers (combination of 0,1, and 2)
}

function getSingleModuleStatus(iMod) {
	return parseInt( getAllModuleStatus().substr(iMod-1,1) );	//returns an integer value
}

function getAllLessonStatus() {
	//getSuspendData();
	return strAllLessonStatus;		// a stream of 7 sections of numbers
}

function getLessonStatusByModule(iMod) {
	return getAllLessonStatus().split(",")[iMod-1];		// a stream of 2 or 3 numbers for ith module
}

function getSingleLessonStatus(iMod, iLes) {
	return parseInt( getLessonStatusByModule(iMod).substr(iLes-1,1) );		//returns an integer value
}

function checkCourseStatus() {
	var allDone = true;
	for (var i=0; i<nModules; i++) {
		if (getAllModuleStatus().substr(i,1) != "2") {
			allDone = false;
			break;
		}
	}
	return allDone;
}

function startCourse() {
	initialStatus = "00000~00,000,000,00,0~";
	if (inLMS == true) {
		//loadPage() is in SCOFunctions2004.js
		//it initializes API, starts timer, and sets exitPageStatus to false
		loadPage();	
		var strTemp = doLMSGetValue( "cmi.suspend_data" );
		//if (strTemp == "" || typeof(strTemp) == "undefined") {
		if ( strTemp == "" || typeof(strTemp) == "undefined" ) {	//DataModelElementValueNotInitialized
			doLMSSetValue( "cmi.suspend_data", initialStatus );
			doLMSCommit();
			strAllModuleStatus = "00000";
			strAllLessonStatus = "00,000,000,00,0";
		} else {
			strCourseStatus = doLMSGetValue("cmi.core.lesson_status");
			if (strCourseStatus == "completed") {
				strAllModuleStatus = "22222";
				strAllLessonStatus = "22,222,222,22,2";
			} else getSuspendData();
		}
		
		var bookmark = doLMSGetValue("cmi.core.lesson_location")
		if (bookmark == "" || typeof(bookmark) == "undefined") bookmark = ""

	} else {
		if ( Get_Cookie("userData") ) {
			getSuspendData();
		} else {
			Set_Cookie("userData", initialStatus, 60, "/", "", "");
			strAllModuleStatus = "00000";
			strAllLessonStatus = "00,000,000,00,0";
		}
		if ( Get_Cookie("userBookmark") ) {
			bookmark = Get_Cookie("userBookmark");
			if ( bookmark.indexOf("mainmenu.html") >= 0 ) bookmark = "";
		}
	}

	if (bookmark != "") {
		if (confirm("Do you wish to resume where you left?")==true) contentFrame.location.href = bookmark;
	}
}

function exitCourse() {
	if ( exitPageStatus != true ) {
		updateDatabase();
		exitPageStatus = true;
		if ( inLMS == true ) {
			if (contentFrame.blnLastPage) {
				updateLessonStatus('2');
			}
			doLMSSetValue( "cmi.core.lesson_location", contentFrame.location.href );	//bookmarking
			//setSCORM2004time();
//			if ( checkCourseStatus() ) {
//				//the current learner session will NOT be available if the SCO is relaunched.
//				//doLMSSetValue( "cmi.exit", "normal" );
//				//doLMSSetValue( "adl.nav.request", "exit" );
//				//doLMSSetValue( "adl.nav.request", "exitAll" );
//			} else {
//				doLMSSetValue( "cmi.exit", "suspend" );
//				doLMSSetValue("adl.nav.request", "suspendAll");
//			}
//			doTerminate();
			unloadPage();
		} else {
			Set_Cookie("userBookmark", contentFrame.location.href, 60, "/", "", "");
		}
		window.close();
	}
}

function unloadCourse() {
	if (exitPageStatus != true) {
		exitCourse();
	}
}

////This function is for module test - test only
//function setCourseScore(uScore) {
//	doLMSSetValue("cmi.score.min", 0);
//	doLMSSetValue("cmi.score.max", 100);
//	doLMSSetValue("cmi.score.raw", uScore);
//	doLMSSetValue("cmi.score.scaled", uScore/100);
//}

function updateSuspendData() {
   	if ((strPagesViewed == "") || (typeof(strPagesViewed) == "undefined")) {
		strPagesViewed = ""
	}
	var iMod = getModule();
	var iLes = getLesson();
	if ( (iMod > 0) && (iLes > 0) ) { //NOT on the mainmenu or any lesson menu
		if ( (strPagesViewed.indexOf(getPage()) == -1) && (getSingleLessonStatus(iMod, iLes) < 2) ) {
			strPagesViewed = strPagesViewed + "," + getPage();
		}
	}
	strTemp = strAllModuleStatus + "~" + strAllLessonStatus + "~" + strPagesViewed;
	if (inLMS == true) {
		doLMSSetValue("cmi.suspend_data", strTemp);
		doLMSCommit();
	} else {
		Set_Cookie("userData", strTemp, 60, "/", "", "");
	}
}

function getSuspendData() {
	if (inLMS == true) {
		strTemp = doLMSGetValue( "cmi.suspend_data" );
	} else {
		strTemp = Get_Cookie("userData");
	}
	if ( (strTemp != "") && (typeof(strTemp) != "undefined") ) {
		arrTemp = new Array();
		arrTemp = strTemp.split("~");
		strAllModuleStatus = arrTemp[0];	// a stream of 7 numbers
		strAllLessonStatus = arrTemp[1];		// a stream of 7 sections, each section has 2 or 3 numbers
		strPagesViewed = arrTemp[2];
	}
}

function cleanSuspendData() {
	var re = /,,/g;
	var strTemp = strPagesViewed.toLowerCase();
	arrTemp = strTemp.split(",");
	for (var i=1; i<=nModules; i++) {
		iTemp = eval("nLessons_" + i);
		for (var j=1; j<=iTemp; j++) {
			if ( getSingleLessonStatus(i,j) > 1 ) {
				for (var k=0; k<arrTemp.length; k++) {
					if ( (parseInt(arrTemp[k].substr(0,1))==i) && (parseInt(arrTemp[k].substr(1,1))==j) ) arrTemp[k] = ""
				}
			}
		}
		strTemp = arrTemp.join();
		while (strTemp.indexOf(",,") != -1) {
			str2 = strTemp.replace(re,",");
			strTemp = str2;
		}
	}
	//after cleaned
	strPagesViewed = strTemp;
	updateSuspendData();
}

function updateDatabase() {
	//This function will be called when exit the course or when a lesson is completed
	updateSuspendData();
	if (inLMS == true) {
		if ( checkCourseStatus() ) {
			doLMSSetValue( "cmi.core.lesson_status", "completed" );
		} else {
			doLMSSetValue( "cmi.core.lesson_status", "incomplete" );
		}
		doLMSCommit();
	}
}
