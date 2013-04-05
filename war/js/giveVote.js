function klikinime(a_name,a_region,a_party){
	document.getElementById("kandidaadivaade").style.visibility="visible";
	document.getElementById("personInfo").innerHTML=a_name;
	document.getElementById("regionInfo").innerHTML=a_region;
	document.getElementById("partyInfo").innerHTML=a_party;
}