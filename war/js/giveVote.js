function klikinime(a_name){

	createPopup('kinnitusleht.html');
	//$("#nimi")[0].text(a_name);
	nimi=this.a_name;
	//$(document).ready(function(){
//		document.getElementById("nimi").innerHTML=nimi;
		$("#nimi").text(nimi);
	//});
}

//document.getElementById("nimi").innerHTML=nimi;
//$("#nimi").text(nimi);
//
//function paneNimi()
//{
//	document.getElementById("nimi").innerHTML=nimi;
//}

function funtime()
{
	document.getElementById("nimi").innerHTML=nimi;
}