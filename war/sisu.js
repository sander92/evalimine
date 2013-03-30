var loggedin = false;
var jada=new Array("","");
function sisu(nimi) {

	$("body").attr("class", nimi);

	if (nimi != "Kandidaadid") {
		$("#peasisu").load(nimi + ".html #sisu", function() {
			hidesees();
			isik(jada[1]);
			
		});
	}

	else {
		$("#peasisu").load(nimi + ".html #sisu", function() {
			otsimine();
			otsimine();
			autoasi();
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
	n = a.indexOf("+");
	if (n == -1) {
		if (a != "login" && a != "") {
			if (a != "") {
				sisu(a);
			} else {
				sisu("Evalimised");
			}
		}
	} else {
		jada = a.split("+");
		if(mainhashmuutus()){
			sisu(jada[0]);
		}
		isik(jada[1]);

	}
	mainhashmuutus();


}

var eelHash="#";
function mainhashmuutus() {
	praegu=location.hash.split("+")[0];
	if(eelHash!=praegu){
		eelHash=praegu;
		return true;
	}
	else{
		return false;
	}
}

/*
function navigOsa() {
	hidesees();
	a = location.hash;
	a = a.replace("#", "");
	n = a.indexOf("+");
	if (n == -1) {
		if (a != "login" && a != "") {
			if (a != "") {
				sisu(a);
			} else {
				sisu("Evalimised");
			}
		}
	} else {
		jada = a.split("+");
		//sisu(jada[0]);

		isik(jada[1]);

	}

}*/
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
		$("#sees").hide();
	}

	else if (loggedin == true) {
		$("#sees").show();
	}
}

function isik(nimi) {
	a = location.hash;
	a = a.replace("#", "");
	kas = a.indexOf("Vote");
	if (kas != -1) {
		uus = "<p>" + nimi + "</p> <br>";
		uus += "<p>Info selle kandidaadi kohta</p>"
		$("#right")[0].innerHTML = uus;
	}
	
}

window.onload = navig;
window.onhashchange = navig;
