var loggedin = false;

function sisu(nimi) {

	$("body").attr("class", nimi);

	if (nimi != "Kandidaadid") {
		$("#peasisu").load(nimi + ".html #sisu", function() {
			hidesees();
		});
	} else {
		$("#peasisu").load(nimi + ".html #sisu", function() {
			hider();
			autoc();
		});

	}

	// $("#sisu").outerHTML=$("#sisu").innerHTML;
	// document.getElementById('sisu').outerHTML=document.getElementById('sisu').innerHTML;
	// }
	// $("body").load(nimi+".html");

}

function navig() {
	hidesees();
	a = location.hash;
	a = a.replace("#", "");
	if (a != "login" && a != "") {
		if (a != "") {
			sisu(a);
		} else {
			sisu("Evalimised");
		}
	}

}

function loginout() {
	loggedin = !loggedin;
	if (loggedin == false) {
		hidesees();
		document.getElementById("Login").innerHTML = "Sisene";
	}

	if (loggedin == true) {
		hidesees();
		document.getElementById("Login").innerHTML = "Välju";

	}
}

function hidesees() {
	if (loggedin == false) {
		// $("sees").hide();
		// $("nupp").hide();
		$("#sees").hide();
	}

	else if (loggedin == true) {
		$("#sees").show();
	}
}

function isik(nimi) {
	uus = "<p>" + nimi + "</p> <br>";
	uus += "<p>Info selle kandidaadi kohta</p>"
	$("#right")[0].innerHTML = "<p>" + uus + "</p>"

}


window.onload = navig;
window.onhashchange = navig;
