
$(document).ready(function(){
	hideWarnings();
	$("#submit").click(function() {
		voiblisada=validateForm();
		if (voiblisada){
			alert("Tere tulemast valimisnimekirja");
			window.close();
		}
	}); 

	function validateForm() {
		hideWarnings();
		var fName = $("#firstName").val();
		var lName = $("#lastName").val();
		var party = $("#partySelector").val();
	  	var region = $("#regionSelector").val();		
  		var valid = true;
		if (fName == null || fName == "") {
			$("#fNameValidate").show();
			$("#firstName").addClass("invalid");
			valid = false;
		}
		if (lName == null || lName == "") {
			$("#lNameValidate").show();
			$("#lastName").addClass("invalid");
			valid = false;
		}
		if (region == null || region == "") {
			$("#regionValidate").show();
			$("#regionSelector").addClass("invalid");
			valid = false;
		}
		if (party == null || party == "") {
			$("#partyValidate").show();
			$("#partySelector").addClass("invalid");
			valid = false;
		}
		return valid;
	}

	function hideWarnings() {
		$("#fNameValidate").hide();
		$("#lNameValidate").hide();
		$("#partyValidate").hide();
		$("#regionValidate").hide();
		$("#firstName").removeClass("invalid");
		$("#lastName").removeClass("invalid");
		$("#partySelector").removeClass("invalid");
		$("#regionSelector").removeClass("invalid");
	}

});

function createPopup(mylink, windowName) {
	//alert("Hello World")
	if (!window.focus)return true;
	var href;
	if (typeof(mylink) == 'string')
	   href=mylink;
	else
	   href=mylink.href;
	window.open(href, windowName, 'width=600,height=300,scrollbars=no');
	return false;
}
