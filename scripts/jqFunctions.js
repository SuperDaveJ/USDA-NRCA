// JavaScript Document
/***************************************************** jquery Functions ***************************************************/
isAssetsOpen = false;
isHelpOpen = false;
isTopicsOpen = false;
isMenuOpen = false;
$(document).ready( function() {
	if (blnFirstPage) $("#back").hide();
	if ( $("#dlink").find("a").length == 0 ) $("#dlink").hide();
	
	//check if there is narration or animation on the page						
	if ( $("#contentArea").find("#divAnimation").length > 0 ) {
		blnAnimation = true;	//control animation audio
		checkAudio();
	} else blnAnimation = false;
	if ( $("#contentArea").find("#divNarration").length > 0 ) checkAudio();
    if ( ($("#contentArea").find("#divAnimation").length > 0 ) && (!parent.isPageViewed(parent.getPage())) ) hideNextButton();
	
	$("#assets").click( function() {
	});

	//Assets sliding panel
	$(".assetsAction").click( function() {
		if (isAssetsOpen) {
			isAssetsOpen = false;
			$("#assets").animate( {marginLeft: "-77px"}, 500, toggleArrows('assets_out.png', 'open assets panel') );
		} else {
			isAssetsOpen = true;
			$("#assets").animate( {marginLeft: "0"}, 500, toggleArrows('assets_in.png', 'close assets panel') );
		}
	} ); 
	function toggleArrows(imgFile, altTag) {
		$("#assetsImage").html('<img src="../../sysimages/interface/' + imgFile + '" alt="' + altTag + '" />');
	}
	
	//Help sliding panel
	$(".helpAction").click( function() {
		if (isHelpOpen) {
			isHelpOpen = false;
			$("#help").animate( {marginLeft: "-77px"}, 500 );
			$("#helpImage").html('<img src="../../sysimages/interface/help_out.png" alt="open help panel" />');
		} else {
			isHelpOpen = true;
			$("#help").animate( {marginLeft: "0"}, 500 );
			$("#helpImage").html('<img src="../../sysimages/interface/help_in.png" alt="close help panel" />');
		}
	});

	//Topics sliding panel
	$(".topicsAction").click( function() {
		if (isTopicsOpen) {
			isTopicsOpen = false;
			$("#topics").animate( {marginLeft: "-10px"}, 200 );
			$("#topicsImage").html('<img src="../../sysimages/interface/topic_out.png" alt="open topics panel" />');
		} else {
			isTopicsOpen = true;
			$("#topics").animate( {marginLeft: "0"}, 200 );
			$("#topicsImage").html('<img src="../../sysimages/interface/topic_in.png" alt="close topics panel" />');
			showTopics();
		}
	});

	//Menu sliding panel
	$(".menuAction").click( function() {
		if (isMenuOpen) {
			isMenuOpen = false;
			$("#menu").animate( {marginLeft: "-10px"}, 200 );
			$("#menuImage").html('<img src="../../sysimages/interface/menu_out.png" alt="open menu panel" />');
		} else {
			isMenuOpen = true;
			$("#menu").animate( {marginLeft: "0"}, 200 );
			$("#menuImage").html('<img src="../../sysimages/interface/menu_in.png" alt="close menu panel" />');
			parent.toModuleMenu();
		}
	});

	//Shared functions
	$(".menuItem").hover (
		function() { 
			$(this).css({'background-color':'#60AFD6'});
		},
		function() { 
			$(this).css({'background-color':'#3398CC'}); 
		}
	);
	
	$("a img").hover ( 
		function() {
			this.src = this.src.replace( /_active/, '_rollover' );
		},
		function() {
			this.src = this.src.replace( /_rollover/, '_active' );
		}
	);
	//If file extention is known following statement can be used.
	//this.src = this.src.replace( /_active\.jpg$/, '_rollover.jpg' );

});

//This function needs to be called from Flash after an animation is completed
function showNextButton() {
	$("#next").show();
	//document.getElementById("next").style.visibility = "visible";
}

function hideNextButton() {
	$("#next").hide();
	//document.getElementById("next").style.visibility = "hidden";
}


