function sisu(nimi)
{
	
	$("body").attr("class",nimi);

	$("#peasisu").load(nimi+".html #sisu");

	//$("#sisu").outerHTML=$("#sisu").innerHTML;
	//document.getElementById('sisu').outerHTML=document.getElementById('sisu').innerHTML;
	//}
	//$("body").load(nimi+".html");
	
}