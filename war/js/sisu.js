var loggedin = false;
var voterID;
function sisu(nimi) {

	$("body").attr("class", nimi);

	if (nimi != "Kandidaadid") {
		$("#peasisu").load(nimi + ".html #sisu", function() {
			if(nimi=="Statistika")
				tableSorter();
			hidesees();
		});
	} else {
		$("#peasisu").load(nimi + ".html #sisu", function() {
			tableSorter();
			//getLData();
			
			autoc();
			hidesees();
			$("#seeshaal").hide();
			$(".candidateClickable td").click(function(){
				alert('tfhg');
			});	
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
	if (a != "") {
		sisu(a);
	} else {
		sisu("Evalimised");
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
		document.getElementById("Login").innerHTML = "V&#228;lju";

	}
}

function hidesees() {
	if (loggedin == false) {
		// $("sees").hide();
		// $("nupp").hide();
		$("#sees").hide();
		voterID=0;
	}

	else if (loggedin == true) {
		$("#sees").show();
		voterID=38210032311;
	}
}

function isik(nimi) {
	uus = "<p>" + nimi + "</p> <br>";
	uus += "<p>Info selle kandidaadi kohta</p>"
	$("#right")[0].innerHTML = "<p>" + uus + "</p>"

}


window.onload = navig;
window.onhashchange = navig;
