var loggedin = false;
var connected = false;
var voterID;
function sisu(nimi) {

	$("body").attr("class", nimi);

	if (nimi != "Kandidaadid") {
		$("#peasisu").load(nimi + ".html #sisu", function() {
			if(nimi=="Statistika"){
				tableSorter();
				if(!connected)
					initialize();
			}
			if (nimi == "Vote"){
				FB.getLoginStatus(function(response) {
					if (response.status === 'connected') {
						document.getElementById("kasutajainfo").innerHTML="Olete sisse logitud.<br>Kasutaja ID on: " + window.kasutajaID;
						$("#sees").show();
						voterID=window.kasutajaID;
						votaAndmed("Vote",voterID);
					}
					else{
						document.getElementById("kasutajainfo").innerHTML="Palun logige sisse.";
						$("#sees").hide();
						voterID=0;
						votaAndmed("Vote","0");
					}
				})
			}
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
	FB.getLoginStatus(function(response) {
		if (response.status === 'connected') {
			$("#sees").hide();
			voterID=0;
			votaAndmed("Vote","0");
		}

		else{
			$("#sees").show();
			voterID=window.kasutjaID;
			votaAndmed("Vote",voterID);
		}
	})
}

function isik(nimi) {
	uus = "<p>" + nimi + "</p> <br>";
	uus += "<p>Info selle kandidaadi kohta</p>"
	$("#right")[0].innerHTML = "<p>" + uus + "</p>"

}

window.onload = navig;
window.onhashchange = navig;
