/*$(document).ready(function(){
	//$("button").click(function(){
		var validator = $("#lisaKandidaadiks").validate({
		    rules: {
		        firstName: "required",
		        lastName: "required",
		    messages: {
		        firstName: "Enter your firstname",
		        lastName: "Enter your lastname",
		}
	//}
}); */
$(document).ready(function(){
    $("#lisaKandidaadiks").validate();
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

function validateForm() {
	resetValidationMessages();
	var fName = document.forms["lisaKandidaadiks"]["firstName"].value;
	var lName = document.forms["lisaKandidaadiks"]["lastName"].value;
	var area = document.forms["lisaKandidaadiks"]["area"].value;
	var party = document.forms["lisaKandidaadiks"]["party"].value;
	var valid = true;
	if (fName == null || fName == "") {
		document.getElementById("fNameValidate").innerHTML = "Eesnimi peab olema sisestatud!";
		valid = false;
	}
	if (lName == null || lName == "") {
		document.getElementById("lNameValidate").innerHTML = "Perekonnanimi peab olema sisestatud!";
		valid = false;
	}
	if (area == null || area == "") {
		document.getElementById("areaValidate").innerHTML = "Piirkond peab olema valitud!";
		valid = false;
	}
	if (party == null || party == "") {
		document.getElementById("partyValidate").innerHTML = "Erakond peab olema valitud!";
		valid = false;
	}

	return valid;
}

function resetValidationMessages() {
	document.getElementById("fNameValidate").innerHTML = "";
	document.getElementById("lNameValidate").innerHTML = "";
	document.getElementById("areaValidate").innerHTML = "";
	document.getElementById("partyValidate").innerHTML = "";
}